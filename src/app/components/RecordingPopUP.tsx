// Popup component interface and component
interface RecordingPopUPProps {
    title: string;
    yesEvent: () => void;
    noEvent: () => void;
  }
  
const RecordingPopUP: React.FC<RecordingPopUPProps> = ({
    title,
    yesEvent,
    noEvent,
  }) => {
    return (
      <div className="text-center font-bold p-4 text-[#273046] fixed bottom-12 w-[80%] left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-md">
        <h2 className="text-center font-bold text-[#273046] mb-4">{title}</h2>
        <div className="flex items-center justify-between gap-2">
          <button
            className="p-4 flex-1 text-[#8870E6] bg-[#fff] rounded-xl hover:shadow-md"
            onClick={noEvent}
          >
            No
          </button>
          <button
            className="p-4 flex-1 text-white bg-[#273046] rounded-xl hover:shadow-md"
            onClick={yesEvent}
          >
            Yes
          </button>
        </div>
      </div>
    );
  };
  
  export default RecordingPopUP