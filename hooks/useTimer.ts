import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (initialTime: number = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const countRef = useRef<number | null>(null);

  const handleStart = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  }, []);

  const handlePause = useCallback(() => {
    if (countRef.current) {
      clearInterval(countRef.current);
    }
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  }, []);

  const handleReset = useCallback(() => {
    if (countRef.current) {
      clearInterval(countRef.current);
    }
    setIsActive(false);
    setIsPaused(true);
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (time <= 0 && isActive) {
      if (countRef.current) {
        clearInterval(countRef.current);
      }
      setIsActive(false);
    }
  }, [time, isActive]);
  
  useEffect(() => {
    return () => {
      if (countRef.current) {
        clearInterval(countRef.current);
      }
    };
  }, []);

  return {
    time,
    isActive,
    isPaused,
    start: handleStart,
    pause: handlePause,
    resume: handleResume,
    reset: handleReset,
  };
};
