import React from 'react';

import FilteredEvents from '../components/FilteredEvents/FilteredEvents';
import { getLastMinuteEvents, getNextWeekEvents } from '../services/feedService';

const Feed = (props) => {
  return (
    <div className="feed">
      <FilteredEvents filterType={getLastMinuteEvents} altText="Nincsenek közelgő események">
        Közelgő események
        <a href="/events">Több esemény</a>
      </FilteredEvents>
      <FilteredEvents filterType={getNextWeekEvents} altText="Nincsenek jövő heti események">
        Jövő heti események
        <a href="/events">Több esemény</a>
      </FilteredEvents>
    </div>
  );
}

export default Feed;
