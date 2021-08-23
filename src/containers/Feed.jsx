import React from 'react';

import FilteredEvents from '../components/FilteredEvents/FilteredEvents';
import { getLastMinuteEvents, getNextWeekEvents } from '../services/feedService';

const Feed = (props) => {
  return (
    <div className="feed center">
      <FilteredEvents filterType={getLastMinuteEvents} altText="Nincsenek közelgő események">Közelgő események</FilteredEvents>
      <FilteredEvents filterType={getNextWeekEvents} altText="Nincsenek jövő heti események">Jövő heit események</FilteredEvents>
    </div>
  );
}

export default Feed;
