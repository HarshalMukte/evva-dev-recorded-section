"use client";

import RecordingPopUP from "@/app/components/RecordingPopUP";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Recording component
const Recording = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpData, setPopUpData] = useState({
    title: "",
    yesAction: () => {},
    noAction: () => {},
  });

  const [isRecording, setIsRecording] = useState(false); // Tracks recording state
  const [time, setTime] = useState(0); // Tracks time
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Reference to timer

  const router = useRouter();
  const pathname = usePathname();

  // Navigate backward
  const handleBack = () => {
    router.back();
  };

  // Start recording and timer
  const startRecording = () => {
    setIsRecording(true);
    setTimer(
      setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000)
    );
  };

  // Pause the recording and stop the timer
  const pauseRecording = () => {
    setPopUpData({
      title: "Do you want to interrupt the recording?",
      yesAction: () => {
        setShowPopUp(false);
        clearInterval(timer!); // Stop the timer
        setIsRecording(false);
      },
      noAction: () => setShowPopUp(false),
    });
    setShowPopUp(true);
  };

  // Restart the recording and timer
  const restartRecording = () => {
    setPopUpData({
      title: "You want to restart recording?",
      yesAction: () => {
        setShowPopUp(false);
        setTime(0); // Reset time
        startRecording();
      },
      noAction: () => setShowPopUp(false),
    });
    setShowPopUp(true);
  };

  // Complete the recording
  const handleComplete = () => {
    setPopUpData({
      title: "Do you want to finish recording and get a report?",
      yesAction: () => {
        setShowPopUp(false);
        clearInterval(timer!); // Stop the timer
        setIsRecording(false);
        // Logic to handle finishing the recording
        console.log("complete" + pathname);
        
        const newPath = pathname.replace("/recording", "/uploading");
        router.push(newPath); // Navigate to the uploading page  
      },
      noAction: () => setShowPopUp(false),
    });
    setShowPopUp(true);
  };

  // Reset timer on component unmount
  useEffect(() => {
    return () => {
      clearInterval(timer!);
    };
  }, [timer]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full max-w-[600px] mx-auto h-[100vh] h-[100dvh] text-[#ffffff] flex flex-col justify-between">
      {/* Gradient background */}
      <div className="fixed bg-[#0F0817] -z-10 inset-0 w-full h-[100%] overflow-hidden">
        <span className="absolute top-[-5%] right-[-6%] w-[45%] rounded-full aspect-square bg-[#7265E34D] blur-lg shadow-[0_0_100px_50px_#7265E34D]" />
        <span className="absolute bottom-[-5%] left-[-6%] w-[45%] rounded-full aspect-square bg-[#7265E34D] blur-lg shadow-[0_0_100px_50px_#7265E34D]" />
      </div>

      {/* Header */}
      <div className="relative z-10 w-full flex items-center gap-5 p-4 bg-transparent text-inherit">
        <button
          onClick={handleBack}
          className="w-[40px] h-[40px] cursor-pointer bg-[#ffffff64] rounded-[10px] flex items-center justify-center"
        >
          <img src="/images/leftArrowWhite.svg" alt="icon" />
        </button>
        <h1 className="text-center font-semibold text-base mx-auto">
          Visit with Dr.Smith
        </h1>
        <button
          onClick={handleBack}
          className="w-[40px] h-[40px] cursor-pointer bg-[#ffffff64] rounded-[10px] flex items-center justify-center"
        >
          <img src="/images/removeWhite.svg" alt="icon" />
        </button>
      </div>

      {/* Main recording section */}
      <div className="flex flex-1 h-auto flex-col items-center justify-around p-4 gap-2">
        <div className="text-center">
          <h2 className="text-white text-xl my-2 font-bold">Are you ready?</h2>
          <p className="text-sm text-[#606F90] ">
            {isRecording
              ? "Recording in progress"
              : "Press the button to start"}
          </p>
        </div>
        <div className="relative my-2 w-[65%] m-auto animate-[spin_2s_linear_infinite]">
          <img
            className="w-full animate-[spin_6s_linear_infinite] absolute "
            src="/images/recordBgVector.svg"
            alt="icon"
          />
          <img className="w-full" src="/images/recordBg.png" alt="bg" />
        </div>

        <div className="flex text-center items-center gap-2 justify-center w-full my-4 flex-col">
          <span className="text-sm text-white font-bold">Total Time</span>
          <h2 className="text-[2rem] font-bold text-white">
            {formatTime(time)}
          </h2>

          <div className="flex items-center gap-10 justify-center w-full">
            {/* Restart Button */}
            <button onClick={restartRecording}>
              <img src="/images/restartBtn.svg" alt="Restart" />
            </button>

            {/* Microphone/Play Button */}
            <button
              className="cursor-pointer bg-[#7265E3] w-[60px] h-[60px] rounded-full flex items-center justify-center"
              onClick={isRecording ? pauseRecording : startRecording}
            >
              <img
                src={
                  isRecording
                    ? "/images/playBtn.svg"
                    : "/images/microPhoneBtn.svg"
                }
                alt="icon"
              />
            </button>

            {/* Stop Button */}
            <button onClick={handleComplete}>
              <img src="/images/stopBtn.svg" alt="Stop" />
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopUp && (
        <RecordingPopUP
          title={popUpData.title}
          yesEvent={popUpData.yesAction}
          noEvent={popUpData.noAction}
        />
      )}
    </div>
  );
};

export default Recording;
