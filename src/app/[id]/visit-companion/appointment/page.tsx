"use client";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface FormData {
  title: string;
  name: string;
  attendees: string[]; // Assuming attendees is an array of strings (names or emails)
}

const Appointment = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    name: "",
    attendees: []
  })

  const [attendeeName, setAttendeeName] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();

  // Navigate backward
  const handleBack = () => {
    router.back();
  };

  const handleAttendeeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAttendeeName(e.target.value);
  };

  const handleAddAttendee = () => {
    if (attendeeName.trim() !== "") {
      setFormData(prevData => ({
        ...prevData,
        attendees: [...prevData.attendees, attendeeName]
      }));
      setAttendeeName(""); // Clear the input field
    }
  };

  const handleRemoveAttendee = (index: number) => {
    setFormData(prevData => ({
      ...prevData,
      attendees: prevData.attendees.filter((_, i) => i !== index)
    }));
  };

  const formDataChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleAddAttendee();
    }
  };

    // Check if all required fields are filled to enable the "Continue" button
    const isFormComplete = formData.title && formData.name && formData.attendees.length > 0;

  return (
    <div className="relative w-full max-w-[600px] mx-auto h-[100vh] h-[100dvh] bg-[#F7F7F7] text-[#273046] flex flex-col justify-between">
      <div className="w-full flex items-center gap-5 p-4 bg-[#F7F7F7] text-inherit">
        <button
          className="absolute top-4 left-4 w-[40px] h-[40px] cursor-pointer bg-white rounded-[10px] flex items-center justify-center"
          onClick={handleBack}
        >
          <img src="/images/left-arrow.svg" alt="icon" />
        </button>
        <h1 className="text-center leading-10 font-semibold text-base mx-auto">
          Visit Companion
        </h1>
      </div>

      <div className="p-4 mt-2 flex flex-1 flex-col gap-5 h-auto overflow-y-scroll overflow-x-hidden scrollbar-none">
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="block text-md font-medium leading-6 text-[#606F90]" 
          >
            Appointment title
          </label>
          <div className="mt-2 rounded-xl flex  shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => formDataChange(e)}
                    type="text"
                    required
                    placeholder="Title"
                    className="outline-none block flex-1 border-0 bg-transparent rounded-xl 
                    p-4 text-[#273046] placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
          </div>
          <label
            htmlFor="name"
            className="mt-6 block text-md font-medium leading-6 text-[#606F90]" 
          >
            Professional name
          </label>
          <div className="mt-2 rounded-xl flex  shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => formDataChange(e)}
                    type="text"
                    required
                    placeholder="Name"
                    autoComplete="Name"
                    className="outline-none block flex-1 border-0 bg-transparent rounded-xl 
                    p-4 text-[#273046] placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
          </div>
          <label
            htmlFor="Attendees"
            className="mt-6 block text-md font-medium leading-6 text-[#606F90]" 
          >
            Attendees (optional)
          </label>
          <div className="mt-2 rounded-xl flex  shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="Attendees"
                    name="Attendees"
                    type="text"
                    placeholder="Participant"
                    autoComplete="off"
                    value={attendeeName}
                    onKeyDown={handleKeyDown} 
                    onChange={handleAttendeeNameChange}
                    className="outline-none block flex-1 border-0 bg-transparent rounded-xl 
                    p-4 text-[#273046] placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
          </div>
          {/* List of Attendees */}
        <ul className="flex flex-col gap-3 my-4">
        {formData.attendees.map((attendee, index) => (
            <li key={index} className="flex items-center justify-between rounded-xl shadow-sm p-4 bg-white">
              <span>{attendee}</span>
              <button
                type="button"
                onClick={() => handleRemoveAttendee(index)}
                className="ml-4 cursor-pointer"
              >
                <img src="/images/cross-icon.svg" alt="crossIcon" />
              </button>
            </li>
          ))}
        </ul>
          <button onClick={handleAddAttendee} type="button" className="my-4 text-center mx-auto text-[#8870E6] cursor-pointer">+ Add a participant</button>
        </div>
      </div>

      <div className="w-full z-10 p-4 flex flex-col gap-6  text-[#273046] shadow-[0_-14px_49px_35px_#F7F7F7]">
        <Link href={`${pathname}/recording`}>
          <button
            disabled={!isFormComplete}  // Enable or disable based on form completion
            className="w-full py-4 bg-[#273046] text-white font-bold rounded-[16px] cursor-pointer hover:bg-[#25314e] transition duration-200 disabled:bg-[#C9C9CA]  disabled:cursor-not-allowed "
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Appointment;
