import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { GiSoccerBall } from 'react-icons/gi';

const Rating = (props) => {
  const [hoverRating, setHoverRating] = useState(0);

  const colorClass = {
    filled: 'rating__star--filled',
    unfilled: 'rating__star--unfilled'
  }

  const isFilled = index => {
    // Colors items at and before hovered star
    if (hoverRating >= index) {
      return colorClass.filled;
    // If not hovered then color only the rated ones
    } else if (!hoverRating && props.rating >= index) {
      return colorClass.filled;
    }

    return colorClass.unfilled;
  }

  const starRating = useMemo(() => {
    return Array(props.count)
      .fill(0)
      .map((_, i) => i + 1)
      .map(k => (
        <GiSoccerBall
          className={`rating__star ${isFilled(k)}`}
          key={k}
          onClick={() => props.onRating(k)}
          onMouseEnter={() => setHoverRating(k)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [props.count, props.rating, hoverRating]);

  return (
    <div>
      {starRating}
    </div>
  );
};

Rating.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number.isRequired,
  onRating: PropTypes.func.isRequired
};

Rating.defaultProps = {
  count: 5,
  rating: 0
};

export default Rating;


//======usage ex.=========
// const [rating, setRating] = useState(0);
// <Rating count={5} rating={rating} onRating={rate => setRating(rate)}/>
