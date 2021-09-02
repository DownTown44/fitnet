import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getFacilityById } from '../services/facilityService';
import ImageSlider from './Carousel/ImageSlider';
import SportField from './SportFields/SportField';
import Text from './UI/Text';

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
    <div className="center">
      <div>
        <ImageSlider slides={facilityData.pictures}/>
      </div>
      <div>
        <Text htmlTag="h2">{facilityData.name}</Text>
        <Text htmlTag="p">{facilityData.address}</Text>
        <Text htmlTag="p">{facilityData.phone_number}</Text>
        <Text htmlTag="p">{facilityData.email}</Text>
        <Text htmlTag="p">{facilityData.description}</Text>
        <Text htmlTag="p">{facilityData.avg_rating}</Text>
      </div>
      <div>
        {facilityData.fields && 
          facilityData.fields.map(field => (
            <SportField
              key={field.field_id}
              image={field.picture}
              title={field.name}
              description={field.description}
              price={field.price}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Facility;
