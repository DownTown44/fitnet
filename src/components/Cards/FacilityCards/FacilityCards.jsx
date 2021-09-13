import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getFacilities } from '../../../services/facilityService';
import FacilityCard from './FacilityCard';
import Text from '../../UI/Text';

const FacilityCards = () => {
  const [facilities, setFacilities] = useState([]);
  const history = useHistory();

  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    getFacilities().then((result) => {
      setFacilities(result);
    });
  }, []);

  return (
    <div className="center">
      {facilities.length !== 0 ? facilities.map((facility) => {
        if (facility.active || (userData && userData.userId === facility.userId)) {
          return (
            <FacilityCard
              key={facility.facilityId}
              src="noImage"
              title={facility.name}
              address={facility.address}
              onOpen={() => history.push(`/facilities/${facility.facilityId}`)}
            />
          );
        }
      }) : <Text>Nincsenek sportlétesítmények</Text>}
    </div>
  );
}

export default FacilityCards;
