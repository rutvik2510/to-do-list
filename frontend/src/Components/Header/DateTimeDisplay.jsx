import React, { useEffect, useState } from 'react';

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long' }; // Get the full weekday name
    const day = date.getDate().toString().padStart(2, '0'); // Day of the month
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month (0-indexed, so +1)
    const year = date.getFullYear(); // Full year
    const formattedDate = `${day}/${month}/${year}`; // Custom date format
    const weekday = date.toLocaleDateString('en-US', options); // Full weekday name

    return (
        <>
        <span className='text-#09090b'>{weekday}</span>
        <br />
        <span className='text-cyan-500'>{formattedDate}</span>
      </>
      ) ; // Final formatted string
  };

  return (
    <div className="flex items-center">
      <span>{formatDate(currentDateTime)}</span>
    </div>
  );
};

export default DateTimeDisplay;
