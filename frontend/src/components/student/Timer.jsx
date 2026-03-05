import React, { useEffect, useState } from 'react';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / (duration * 60)) * 100;
    if (percentage <= 10) return 'text-red-600';
    if (percentage <= 25) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Time Remaining</p>
        <p className={`text-4xl font-bold ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </p>
        {timeLeft <= 300 && (
          <p className="text-red-500 text-sm mt-2 font-semibold">
            ⚠️ Less than 5 minutes remaining!
          </p>
        )}
      </div>
    </div>
  );
};

export default Timer;
