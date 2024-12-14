import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSystemSummaryStart,
} from '../../redux/summarySlice';

const NumberCounter = () => {
  const { systemSummary } =
    useSelector((state) => state.summary);
    console.log(systemSummary);
    const dispatch = useDispatch();

     useEffect(() => {
        dispatch(fetchSystemSummaryStart());
      }, [dispatch]);

  return (
    <div className="bg-indigo-900 text-white py-12">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp
              start={0}
              end={systemSummary?.totalAdmins}
              separator=","
              suffix="+"
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p>Trainers</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp
              end={100}
              separator=","
              suffix="+"
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p>Hours content</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp
              end={systemSummary?.totalTraining}
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p>Trainings</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp
              end={systemSummary?.totalTrainees}
              separator=","
              suffix="+"
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p>Active trainees</p>
        </div>
      </div>
    </div>
  );
};

export default NumberCounter;
