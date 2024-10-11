import React,{useState} from 'react';
import logo from './Dashboard.png'; // Adjust the path to your logo image
import Dayinfo from './DateTimeDisplay';
import CalendarPopup from './CalendarPopup';
const Header = () => {
  // Get the current date
  const [isCalendarOpen, setCalendarOpen] = useState(false);

// toggle calender visibility
const toggleCalendar=()=>{
  setCalendarOpen(!isCalendarOpen);
}
  return (
    <div className="bg-white shadow-md">
      <div className="flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-4" /> {/* Adjust the height as needed */}
         
        </div>
        <div className="flex items-center">

  {/* Search Input */}
  <input
    type="text"
    placeholder="Search your task here..."
    className=" w-100 border-gray-300 p-2 rounded-l-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button aria-label="Search" className="bg-red-500 text-white p-2 rounded-r-md flex items-center">
    🔍
  </button>
</div>

        {/* Action Buttons and Date */}
        <div className="flex items-center gap-4">
          
          <button className="bg-red-500 text-white p-2 rounded-full" aria-label="Notifications">🔔</button>
          <button
          onClick={toggleCalendar}
          className="bg-red-500 text-white p-2 rounded-full"
          aria-label="Calendar">📅</button>
          <span><Dayinfo/></span>
        </div>
      </div>
      {/* calerndar PopUp */}
      <CalendarPopup isOpen={isCalendarOpen} onClose={toggleCalendar}/>
    </div>
  );
};

export default Header;
