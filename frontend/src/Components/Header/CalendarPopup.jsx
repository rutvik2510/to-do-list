import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarPopup = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!isOpen) return null; // Return null if calendar is not open

  return (
    <div className="absolute top-16 right-0 bg-white shadow-md rounded-md p-4 z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Calendar</h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700"
          aria-label="Close Calendar"
        >
          ❌
        </button>
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
      />
    </div>
  );
};

export default CalendarPopup;
