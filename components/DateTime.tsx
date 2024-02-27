import React, { useEffect, useState } from 'react';

const DateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfWeek = daysOfWeek[currentDateTime.getDay()];

  return (
    <>
      <h3 className='text-center text-gray-900 sm:text-base mt-3'>
      {currentDateTime.toLocaleDateString().replace(/\//g, '.')} - {dayOfWeek}

      </h3>
    </>
  );
};

export default DateTimeComponent;
