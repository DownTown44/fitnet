import React, { useRef } from 'react';

import { AiOutlinePlus } from 'react-icons/ai'

import Text from '../../UI/Text/Text';

const SportFieldPicture = (props) => {
  const fileInputRef = useRef();

  // Click event on image div
  const onPictureClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };  

  // Modifies the parents state!!!
  // When uploading image saves it and generates blob
  const handleImageUpload = (event) => {
    // Reading image object from the event
    const file = event.target.files[0];
    // Validating the file, and updating the state of the images
    if (file && file.type.substr(0, 5) === "image") {
      props.setPicture(file);
      readImage(file);
    };
  };

  // Modifies the parents state!!!
  // Sets the preview of the image
  const readImage = (image) => {
    const reader = new FileReader();
    // Reading images data
    reader.readAsDataURL(image);
    // Updating the state of the previews after reading finished
    reader.onloadend = () => {
      props.setPreview(String(reader.result));
    };
  };
  
  return (
    <>
      <div className="sportFieldCreate__picture"
        onClick={event => onPictureClick(event)}
      >
        <Text>Kép</Text>
        <AiOutlinePlus className="sportFieldCreate__plusIcon" />
      </div>
      <input 
      type="file"
      style={{display: "none"}}
      ref={fileInputRef}
      accept="image/*"
      onChange={event => handleImageUpload(event)}
      />
    </>
  );
}

export default SportFieldPicture;
