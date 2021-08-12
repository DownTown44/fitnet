import React, { useState } from 'react';
import SportField from './SportField';

import SportFieldCreate from './SportFieldCreate/SportFieldCreate';

const SportFields = () => {
  const [sportFields, setSportFields] = useState([]);

  const handleFieldRemove = (index) => {
    setSportFields(sportFields.filter((item) => sportFields.indexOf(item) !== index))
  };

  const sportFieldComponents = sportFields.map(field => (
      <SportField
        key={sportFields.indexOf(field)}
        image={field.preview}
        title={field.title}
        description={field.description}
        price={field.price}
        onRemove={() => handleFieldRemove(sportFields.indexOf(field))}
      />
    )).reverse();

  return (
    <div className="sport-fields">
      <SportFieldCreate addField={setSportFields} sportFields={sportFields} />
      {sportFieldComponents}
    </div>
  );
}

export default SportFields;
