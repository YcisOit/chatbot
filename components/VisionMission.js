import { FaRegLightbulb, FaBullseye, FaGlobe, FaUsers, FaHandshake, FaRegHeart, FaFlask } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import Image from 'next/image';

export default function VisionMission() {
  return (
    <section className="bg-white py-10 px-2 sm:px-6 md:px-10 rounded-2xl shadow-xl max-w-5xl mx-auto mt-10 mb-10">
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Vision */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="flex items-center gap-2 mb-2">
            <FaRegLightbulb className="text-3xl text-yellow-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-700">दृष्टी (Vision)</h2>
          </div>
          <p className="italic text-center text-gray-700 mb-6">"शिक्षण व संशोधनातील उत्कृष्टतेद्वारे जीवनात परिवर्तन घडवणे."</p>
          <div className="flex justify-center">
            <Image
              src="/uploads/1745572058892-img2.jpg"
              alt="Vision Illustration"
              width={220}
              height={120}
              className="rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
        {/* Mission */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="flex items-center gap-2 mb-2">
            <FaBullseye className="text-3xl text-red-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">ध्येय (Mission)</h2>
          </div>
          <ul className="mt-4 space-y-4 w-full max-w-md">
            <li className="flex items-start gap-3 text-gray-800">
              <FaGlobe className="mt-1 text-green-500" />
              <span><b>उत्कृष्ट शिक्षण:</b> शिक्षणात उत्कृष्टता साधणे.</span>
            </li>
            <li className="flex items-start gap-3 text-gray-800">
              <FaFlask className="mt-1 text-indigo-500" />
              <span><b>आधुनिक संशोधन:</b> नाविन्यपूर्ण संशोधनासाठी अनुकूल वातावरण.</span>
            </li>
            <li className="flex items-start gap-3 text-gray-800">
              <FaUsers className="mt-1 text-yellow-500" />
              <span><b>प्रभावी व्यक्तिमत्व:</b> जबाबदार, आनंदी व सहकार्यशील लोक घडवणे.</span>
            </li>
            <li className="flex items-start gap-3 text-gray-800">
              <FaHandshake className="mt-1 text-teal-500" />
              <span><b>सहकार्याची संधी:</b> सक्रिय सहकार्य व सामूहिक प्रगती.</span>
            </li>
            <li className="flex items-start gap-3 text-gray-800">
              <FaRegHeart className="mt-1 text-pink-500" />
              <span><b>समाजसेवा:</b> समाजाच्या सेवेसाठी कटिबद्धता.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
} 