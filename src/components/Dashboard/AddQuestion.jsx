
import React, { useState } from 'react';
import EncodeSection from './EncodeSection';
import { useParams } from 'react-router-dom';

const AddQuestion = () => {
  const { chapterId } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center pt-12">

      {/* Conditionally Render the Question Component */}
      <div className="w-full">
        <EncodeSection chapterId={chapterId} />
      </div>
    </div>
  );
};

export default AddQuestion;



