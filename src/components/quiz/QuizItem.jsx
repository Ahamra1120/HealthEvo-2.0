// src/components/quiz/QuizItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';

const QuizItem = ({ quiz, onStart }) => {
  return (
    <div className="quiz-card bg-white rounded-xl shadow-md overflow-hidden">
      <div className={`h-32 bg-${quiz.color}-600 flex items-center justify-center`}>
        <FontAwesomeIcon icon={quiz.icon} className="text-white text-5xl" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-3">
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-1" /> {quiz.questionCount} Soal
            </span>
            <span>
              <FontAwesomeIcon icon={faClock} className="mr-1" /> {quiz.timeMinutes} Menit
            </span>
          </div>
          <Link 
            to={`/quiz-page-new?title=${encodeURIComponent(quiz.title)}`} 
            className="text-purple-600 font-medium hover:text-purple-700 text-sm"
            onClick={() => onStart(quiz)}
          >
            Mulai Kuis <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizItem;