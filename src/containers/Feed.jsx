import React from 'react';

import FilteredEvents from '../components/FilteredEvents/FilteredEvents';
import Text from '../components/UI/Text';
import { getLastMinuteEvents, getNextWeekEvents } from '../services/feedService';

const Feed = (props) => {
  return (
    <div className="feed">
      <div className="feed__section">
        <div className="feed__title">
          <Text htmlTag="h2">Közelgő események</Text>
          <a href="/events">Több esemény</a>
        </div>
        <FilteredEvents filterType={getLastMinuteEvents} altText="Nincsenek közelgő események" />
      </div>
      
      <div className="feed__section">
        <div className="feed__title">
          <Text htmlTag="h2">Jövő heti események</Text>
          <a href="/events">Több esemény</a>
        </div>
        <FilteredEvents filterType={getNextWeekEvents} altText="Nincsenek jövő heti események" />
      </div>
    </div>
  );
}

export default Feed;
