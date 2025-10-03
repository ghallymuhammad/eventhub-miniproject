'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function Countdown({ targetDate, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Parse the date string (e.g., "Oct 15, 2025" or "2025-10-15")
      const target = new Date(targetDate);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
        isExpired: false
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className={`text-center ${className}`}>
        <div className="bg-gray-100 rounded-lg p-2">
          <span className="text-red-500 font-semibold text-sm">Event Started</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="text-xs font-medium mb-1 opacity-90">Starts In</div>
        <div className="flex justify-center space-x-2">
          {timeLeft.days > 0 && (
            <div className="text-center">
              <div className="text-lg font-bold leading-tight">{timeLeft.days}</div>
              <div className="text-xs opacity-80">
                {timeLeft.days === 1 ? 'Day' : 'Days'}
              </div>
            </div>
          )}
          {(timeLeft.days > 0 || timeLeft.hours > 0) && (
            <>
              {timeLeft.days > 0 && <div className="text-lg font-bold">:</div>}
              <div className="text-center">
                <div className="text-lg font-bold leading-tight">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-xs opacity-80">Hrs</div>
              </div>
            </>
          )}
          <div className="text-lg font-bold">:</div>
          <div className="text-center">
            <div className="text-lg font-bold leading-tight">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-xs opacity-80">Min</div>
          </div>
          <div className="text-lg font-bold">:</div>
          <div className="text-center">
            <div className="text-lg font-bold leading-tight">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs opacity-80">Sec</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact version for smaller spaces
export function CountdownCompact({ targetDate, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
        isExpired: false
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className={`inline-flex items-center px-2 py-1 bg-red-100 text-red-600 rounded-md text-xs font-medium ${className}`}>
        Event Started
      </div>
    );
  }

  const formatCompactTime = () => {
    if (timeLeft.days > 0) {
      return `${timeLeft.days}d ${timeLeft.hours}h`;
    } else if (timeLeft.hours > 0) {
      return `${timeLeft.hours}h ${timeLeft.minutes}m`;
    } else {
      return `${timeLeft.minutes}m ${timeLeft.seconds}s`;
    }
  };

  return (
    <div className={`inline-flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs font-medium ${className}`}>
      🕒 {formatCompactTime()}
    </div>
  );
}
