import React, { useState, } from 'react';
import PropTypes from 'prop-types';

import { AiOutlinePlus } from 'react-icons/ai'

import Text from '../../UI/Text/Text';
import SportFieldPicture from './SportFieldPicture';
import CancellableImage from '../../ImageUpload/CancellableImage';

const SportFieldCreate = () => {
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  
  const handlePictureRemove = () => {
    setPicture(null);
    setPreview('');
  }

  return (
    <div className="sportFieldCreate">
      {picture === null ? 
        <SportFieldPicture 
          setPicture={setPicture}
          setPreview={setPreview}
        />
      :
        <CancellableImage src={preview} onRemove={() => handlePictureRemove()}/>
      }

      <div className="sportFieldCreate__title">
        <Text>Pályanév</Text>
        <AiOutlinePlus className="sportFieldCreate__plusIcon" />        
      </div>

      <div className="sportFieldCreate__description">
        <Text>Leírás</Text>  
        <AiOutlinePlus className="sportFieldCreate__plusIcon" />      
      </div>

      <div className="sportFieldCreate__price">
        <Text>Ár</Text>  
        <AiOutlinePlus className="sportFieldCreate__plusIcon" />      
      </div>
    </div>
  );
};

SportFieldCreate.propTypes = {

};

export default SportFieldCreate;
