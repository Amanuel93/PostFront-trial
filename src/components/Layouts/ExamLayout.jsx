import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import DashboardHeader from "../Dashboard/DashboardHeader";
import Result from "../TraineePage/Result";
import { saveTrainingAnswersStart} from "../../redux/trainingSlice";

import { useDispatch, useSelector } from 'react-redux';

const ExamLayout = () => {
  const dispatch = useDispatch();
  const { trainingName,progress } = useSelector((state) => state.startTraining);
  const { answers } = useSelector((state) => state.timer);
  // console.log(trainingName)
  console.log(answers)
  const { training, trainingSubmissionStatus, success } = useSelector((state) => state.training);
  const trainingId = training?.id;
  const { user } = useSelector((state) => state.auth);
  console.log(trainingSubmissionStatus);

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

  useEffect(()=>{
    if (timeUp) {
      dispatch(saveTrainingAnswersStart({ trainingId, answers }));
      console.log(answers);
    }
  },[timeUp, dispatch,trainingId,answers])

  useEffect(() => {
    let timer;
    const savedTimeLeft = localStorage.getItem("timeLeft");

    // Set initial timeLeft from local storage or training duration
    if (savedTimeLeft) {
      setTimeLefts(Number(savedTimeLeft));
    } else if (training?.duration) {
      const durationMs = convertDurationToMilliseconds(training?.duration);
      setTimeLefts(durationMs);
      localStorage.setItem("timeLeft", durationMs); // Save initial time
    }
  }, [training]);

  useEffect(() => {
    let timer;

    // Start the timer only if timeLeft is greater than 0
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
      }, 1000);
    } else if (timeLeft === 0) {
      setTimeUp(true);
      localStorage.removeItem("timeLeft");
    }

    // Cleanup interval timer when the component unmounts or timeLeft changes
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <div>
      {/* Dynamic Header Title */}
      <div className="px-3">
        <DashboardHeader header={trainingName} role={user?.name} time={formatTimeLeft(timeLeft)} timeUp = {timeUp}/>
      </div>
      <div className="h-screen flex-1 overflow-y-auto">
        {
          success || timeUp ?
        // <Outlet />
        <div>
          {/* {
            trainingSubmissionStatus?.pass ?
            <div className="h-screen flex items-center justify-center">
              <h1>You Finished the training successfully!</h1>
            </div>
              :
             <div className="h-screen flex items-center justify-center">
              <h1>We're sorry you failed taking the training!</h1>
             </div>
          } */}
             <Result trainingSubmissionStatus={trainingSubmissionStatus} trainingName={trainingName}/>
        </div>
        :

        <Outlet/>
        }
      </div>
    </div>
  );
};

export default ExamLayout;