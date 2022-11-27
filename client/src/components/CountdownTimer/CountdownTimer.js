import { useState, useEffect } from 'react';
import './CountdownTimer.css';
import { getRemainingTimeUntilMsTimestamp } from './Utils/CountdownTimerUtils';

const defaultRemainingTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00',
};

const CountdownTimer = ({ countdownTimestampMs }) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  return (
    <div className='flex bg-white text-center w-18 h-8 rounded-r-3xl justify-center'>
      <div className='flex flex-col'>
        <div>
          <span>{remainingTime.days}</span>
          <span>:</span>
        </div>
        <span>d</span>
      </div>

      <div className='flex flex-col'>
        <div>
          <span>{remainingTime.hours}</span>
          <span>:</span>
        </div>
        <span>h</span>
      </div>

      <div className='flex flex-col'>
        <div>
          <span>{remainingTime.minutes}</span>
          <span>:</span>
        </div>
        <span>m</span>
      </div>

      <div className='flex flex-col'>
        <div>
          <span>{remainingTime.seconds}</span>
        </div>
        <span>s</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
