import React, { useState } from 'react';
import SportField from './SportField';

import SportFieldCreate from './SportFieldCreate/SportFieldCreate';

const CreatedSportFields = () => {
  const [sportFields, setSportFields] = useState([]);

  const handleFieldRemove = (index) => {
    setSportFields(sportFields.filter(item => sportFields.indexOf(item) !== index))
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
    ));

  return (
    <div className="createdSportFields">
      <SportFieldCreate addField={setSportFields} sportFields={sportFields} />
      {sportFieldComponents}
    </div>
  );
}

export default CreatedSportFields;
