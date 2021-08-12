import React, { useState, } from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';
import SportFieldPicture from './SportFieldPicture';
import DiscardableImage from '../../ImageUpload/DiscardableImage';
import SportFieldInput from '../SportFieldCreate/SportFieldInput'

const SportFieldCreate = (props) => {
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  
  const handlePictureRemove = () => {
    setPicture(null);
    setPreview('');
  }

  // Creating new sport field on submit, and passing it to the parents state
  const handleNewSportField = () => {
    if (picture && preview && title && description && price) {
      const newField = {
        picture: picture,
        preview: preview,
        title: title,
        description: description,
        price: price
      };

      props.addField(prevState => [...prevState, newField])
      
      // Resetting the state
      setPicture(null);
      setPreview('');
      setTitle('');
      setDescription('');
      setPrice('');
    }
  }

  return (
    <div>
      <div className="sportFieldCreate">
        {picture === null ? 
          <SportFieldPicture 
            setPicture={setPicture}
            setPreview={setPreview}
          />
        :
          <DiscardableImage src={preview} onRemove={() => handlePictureRemove()}/>
        }
        
        <SportFieldInput 
          divClass="sportFieldCreate__title"
          setTextState={setTitle}
          stateData={title}
          >
          Pályanév
        </SportFieldInput>

        <SportFieldInput 
          divClass="sportFieldCreate__description"
          setTextState={setDescription}
          stateData={description}
          >
          Leírás
        </SportFieldInput>

        <SportFieldInput 
          divClass="sportFieldCreate__price"
          setTextState={setPrice}
          stateData={price}
          >
          Ár
        </SportFieldInput>
      </div>

      <Button onClick={handleNewSportField}>Hozzáadás</Button>
    </div>
  );
};

SportFieldCreate.propTypes = {
  addField: PropTypes.func.isRequired
};

export default SportFieldCreate;
