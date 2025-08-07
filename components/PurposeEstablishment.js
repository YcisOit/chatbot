import { FaRegLightbulb } from 'react-icons/fa';

export default function PurposeEstablishment() {
  return (
    <section className="max-w-5xl mx-auto mt-6 mb-10">
      <div className="bg-gradient-to-r from-[#e0f7fa] to-[#f1f8e9] rounded-xl shadow p-6 flex items-start gap-4">
        <span className="text-3xl text-blue-500 mt-1">
          <FaRegLightbulb />
        </span>
        <div>
          <h3 className="text-xl font-bold text-[#04263b] mb-2">Purpose and Establishment</h3>
          <p className="text-gray-700 text-base mb-2">
            To provide good quality, standard-sized, and affordable materials to the branches, hostels, and staff of Rayat Shikshan Sanstha, and to bring uniformity and control in their purchasing process, Padmabhushan Dr. Karmaveer Bhaurao Patil started a cooperative society named <b>"Rayat Seva Co-operative Stores Ltd., Satara."</b>
          </p>
          <p className="text-gray-700 text-base">
            This helped all branches work together and keep track of their yearly purchases in an organized way. The society was officially registered on <b>2nd December 1942</b> with registration number <b>C 222</b> under the Co-operative Act.
          </p>
        </div>
      </div>
    </section>
  );
} 