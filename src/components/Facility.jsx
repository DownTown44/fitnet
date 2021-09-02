import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getFacilityById } from '../services/facilityService';

const Facility = () => {
  const [facilityData, setFacilityData] = useState({});
  const { id } = useParams();
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    getFacilityById(id).then((result) => {
      setFacilityData(result)
    });
  }, []);

  return (
    <div>
      DATA
    </div>
  );
}

export default Facility;
