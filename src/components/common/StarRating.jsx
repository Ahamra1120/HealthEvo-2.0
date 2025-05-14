import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ rating }) => {
  const ratingValue = parseFloat(rating);
  const fullStars = Math.floor(ratingValue);
  const halfStar = ratingValue % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={`full-${i}`} icon={solidStar} className="text-xs text-amber-500" />
      ))}
      
      {halfStar && (
        <FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-xs text-amber-500" />
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon key={`empty-${i}`} icon={regularStar} className="text-xs text-amber-500" />
      ))}
    </div>
  );
};

export default StarRating;