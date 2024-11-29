import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import DashboardHeader from "../Dashboard/DashboardHeader";
import {setTimeLeft} from '../../redux/timerSlice'
import { useDispatch, useSelector } from 'react-redux';

const ExamLayout = () => {
  const dispatch = useDispatch();
  const { trainingName,progress } = useSelector((state) => state.startTraining);
  // console.log(trainingName)
  // console.log(progress)
  const { training } = useSelector((state) => state.training);
  const { user } = useSelector((state) => state.auth);

  const [timeLeft, setTimeLefts] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  const convertDurationToMilliseconds = (duration) => {
    const [hours, minutes] = duration.split(":").map(Number);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
  };

  const formatTimeLeft = (time) => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Effect: Manage timer for training
  useEffect(() => {
    let timer;
    const savedTimeLeft = localStorage.getItem("timeLeft");

    // Set initial timeLeft from local storage or training duration
    if (savedTimeLeft) {
      setTimeLefts(Number(savedTimeLeft));
    } else if (training?.duration) {
      const durationMs = convertDurationToMilliseconds(training?.duration);
      setTimeLeft(durationMs);
      localStorage.setItem("timeLeft", durationMs); // Save initial time
    }

    // Start the timer only if timeLeft is set and greater than 0
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLefts((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(timer);
            setTimeUp(true); // Set time up flag
            localStorage.removeItem("timeLeft"); // Clear saved time
            return 0; // Timer ends
          }
          const newTime = prevTime - 1000;
          localStorage.setItem("timeLeft", newTime); // Save new time
          return newTime;
        });
      }, 1000); // Decrement the time every second
    }

    // Cleanup interval timer when the component unmounts or when timeLeft changes
    return () => {
      clearInterval(timer);
    };
  }, [training, timeLeft]); // Dependency array should contain `training` and `timeLeft`

  // useEffect(() => {
  //   if (timeLeft !== null) {
  //     dispatch(setTimeLeft(timeLeft)); // Dispatch the timeLeft value to Redux
  //   }
  // }, [timeLeft, dispatch]);

  return (
    <div>
      {/* Dynamic Header Title */}
      <div className="px-3">
        <DashboardHeader header={trainingName} role={user?.name} />
      </div>
      <div className="h-screen flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ExamLayout;