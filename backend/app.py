from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import re
from pdf_utils import extract_text_from_pdf

# Load environment variables
load_dotenv()

# ---------------- MongoDB Setup ----------------
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["chatty"]
collection = db["BCA"]

# ---------------- FastAPI Setup ----------------
app = FastAPI(title="Chatty Assistant Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint
@app.get("/")
async def root():
    return {"message": "Chatty backend is running!"}

# Upload PDF Endpoint
@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        file_path = f"./{file.filename}"
        
        # Save uploaded file temporarily
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        # Extract text from PDF
        content = extract_text_from_pdf(file_path)
        if not content.strip():
            raise HTTPException(status_code=400, detail="PDF is empty or unreadable.")

        # Insert into MongoDB
        collection.insert_one({
            "filename": file.filename,
            "content": content,
            "uploaded_at": datetime.utcnow()
        })

        return {"message": f"PDF '{file.filename}' uploaded and stored in MongoDB"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- Ask Question Endpoint ----------------
class Question(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(q: Question):
    try:
        query = q.question.lower().strip()
        query_keywords = query.split()
        
        for doc in collection.find():
            # ----- Case 1: Manual Q&A -----
            if "question" in doc and "answer" in doc:
                if query in doc["question"].lower():
                    return {
                        "answer": doc["answer"],
                        "source": "direct_db"
                    }

            # ----- Case 2: PDF Content -----
            content = doc.get("content")
            if content:
                lower_content = content.lower()

                if any(keyword in lower_content for keyword in query_keywords):
                    # Extract up to 3 relevant sentences
                    sentences = re.split(r'(?<=[.!?]) +', content)
                    matching_sentences = [
                        sentence.strip()
                        for sentence in sentences
                        if any(keyword in sentence.lower() for keyword in query_keywords)
                    ]
                    answer = " ".join(matching_sentences[:10])  # First 3 matches

                    return {
                        "answer": answer,
                        "source": doc.get("filename", "unknown")
                    }

        # If nothing matches
        return {"answer": "Oops! No info found for that question. Our model is still learning"}

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

