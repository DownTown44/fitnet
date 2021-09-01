import React, { useEffect } from 'react';

const FacilityCards = () => {
  useEffect(() => {
    getEvents().then((result) => {
      setEvents(result);
    });
  }, []);
  return (
    <div>
      
    </div>
  );
}

export default FacilityCards;
