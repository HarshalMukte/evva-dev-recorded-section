"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

const askNExplain = [
  "Respect provider’s recording policy",
  "Designed to document only key updates and care instructions.",
  "Use only to record your own visit."
]

const benefitsOfRecording = [
  "Summarizes visit interaction and care instructions.",
  "Allows efficient and accurate sharing of professional’s instructions.",
  "Streamlines communication integrity amongst care team."
]

const VisitCompanion = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Navigate backward
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="relative w-full max-w-[600px] mx-auto h-[100dvh] bg-[#F7F7F7] text-[#273046] flex flex-col justify-between gap-5">
      <div className="w-full flex items-center gap-5 p-4 bg-[#F7F7F7] text-inherit">
        <button className="absolute top-4 left-4 w-[40px] h-[40px] cursor-pointer bg-white rounded-[10px] flex items-center justify-center" onClick={handleBack}>
          <img src="/images/left-arrow.svg" alt="icon" />
        </button>
        <h1 className="text-center leading-10 font-semibold text-base mx-auto">Visit Companion</h1>
      </div>
      <div className="p-4 flex flex-1 flex-col gap-5 h-auto overflow-y-scroll overflow-x-hidden scrollbar-none">
        <div className="w-full relative" style={{ width: 'calc(100% + 2 * var(--padding))', marginLeft: 'calc(var(--padding) * -1)' }}>
          <img src="/images/visistCompanionMain.svg" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold">Ask and explain</h2>
          <p className="text-sm font-light text-[#606F90]">Audio file and transcript is not retained</p>
        </div>
        <ul className="flex flex-col gap-5 mt-2">
          {askNExplain.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span className="bg-[#E3E0FF] w-6 h-6 rounded-full flex items-center justify-center text-xs">{index + 1}</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="text-center">
          <h2 className="text-lg font-bold">Benefits of recording</h2>
        </div>
        <ul className="flex flex-col gap-5 mt-2">
          {benefitsOfRecording.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span className="bg-[#E3E0FF] w-6 h-6 rounded-full flex items-center justify-center text-xs">{index + 1}</span>
              {item}
            </li>
          ))}
        </ul>
        <p className='text-sm text-center text-[#606F90];
'>
        Please review and edit summary, if needed. Anonymous data may be used to enhance algorithm for everyone’s benefit.
        </p>
      </div>
      <div className="w-full z-10 p-4 flex flex-col gap-6  text-[#273046] shadow-[0_-14px_49px_35px_#F7F7F7]">
        <Link href={'/'} className="text-center text-[#7265E3] text-base">View previous visits</Link>
        <Link href={`${pathname}/appointment`}>
          <button className="w-full py-4 bg-[#273046] text-white font-bold rounded-[16px] cursor-pointer hover:bg-[#25314e] transition duration-200">
            Accept and start new visit
          </button>
        </Link>
      </div>
    </div>
  );
};


export default VisitCompanion