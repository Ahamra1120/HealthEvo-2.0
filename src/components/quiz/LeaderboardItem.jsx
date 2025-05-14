// src/components/quiz/LeaderboardItem.jsx
import React from 'react';

const LeaderboardItem = ({ rank, user, quizType, score, highlight = false }) => {
  return (
    <div className={`grid grid-cols-12 p-4 items-center ${highlight ? `bg-${highlight}-50` : ''}`}>
      <div className="col-span-1 font-bold">{rank}</div>
      <div className="col-span-5 flex items-center">
        <div className={`w-8 h-8 ${highlight ? `bg-${highlight}-500` : 'bg-gray-300'} rounded-full flex items-center justify-center text-white font-bold mr-3`}>
          {user.charAt(0)}
        </div>
        <span>{user}</span>
      </div>
      <div className="col-span-3 text-center">{quizType}</div>
      <div className="col-span-3 text-center font-bold">{score}</div>
    </div>
  );
};

export default LeaderboardItem;