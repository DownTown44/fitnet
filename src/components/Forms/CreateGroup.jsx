import React, { useState, useRef, useEffect } from 'react';
import FormData from 'form-data';

import { createGroup } from '../../services/groupService';
import { getAccessibilities } from '../../services/accessibilityService';
import Input from '../UI/Input';
import Select from '../UI/Select';
import Text from '../UI/Text';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';
import DiscardableImage from '../ImageUpload/DiscardableImage';

const CreateGroup = () => {
  // Stores image bytearray strings
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  // Reference for the file input
  const fileInputRef = useRef();
  /*
  Data:
    user_id

    name
    description
    accesibility_id
    picture (will be added later)
  */
  const [groupData, setGroupData] = useState({
    userId: JSON.parse(sessionStorage.getItem('userData')).userId,
    name: '',
    description: '',
    accessibilityId: 1
  });

  const [accessibilityOptions, setAccessibilityOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getAccessibilities();
      setAccessibilityOptions(result)
    })();
  }, []);

  // Reading image for preview
  useEffect(() => {
    if(image) {
      const reader = new FileReader();
      reader.readAsDataURL(image)
      reader.onloadend = () => {
        setPreview(String(reader.result));
      }
    }
  }, [image]);

  const handleChange = (event, stateName) => {
    setGroupData((prevState) => {
      return {
        ...prevState,
        [stateName]: event.target.value
      };
    });
  };

  const handleImageUpload = (event) => {
    // Reading image object from the event
    const file = event.target.files[0];

    // Validating the file, and updating the state of the images
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    }

    // Clearing event value so we can upload the same image twice
    // ex. upload it, remove it and then cant upload again
    event.target.value = "";
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreview(null);
  };

  const isValid = (obj) => {
    for (let key in obj) {
      if (obj[key] === '' || obj[key] === null) {
        return false;
      }
    }

    return true;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (isValid(groupData)) {
      let formData = new FormData();
      formData.append("data", JSON.stringify(groupData));
      formData.append("image", image);
  
      const result = await createGroup(formData);
      if (result) {
        console.log(result);
        // TODO: After creation redirect to /groups/:id
        // and send a requset and load the group
      } else {
        console.log(result);
      }
    }
  };

  return (
    <form className="form">
      <Input 
        type="text"
        onChange={(event) => handleChange(event, 'name')}
        value={groupData.name}
        label="Csoport neve"
        placeholder="Csoport neve"
      />
      <Text>Csoport leírása</Text>
      <Textarea
        onChange={(event) => handleChange(event, 'description')}
        value={groupData.description}
        placeholder="Csoport leírása"
        rows="4" 
        cols="60"
        maxLength="2048"
      />      

      <Button onClick={(event) => {
        event.preventDefault();
        fileInputRef.current.click();
      }}>Borítókép hozzáadása</Button>

      <input 
        type="file" 
        multiple
        style={{display: "none"}} 
        ref={fileInputRef}
        accept="image/*"
        onChange={(event) => handleImageUpload(event)}
      />
      {preview && <DiscardableImage src={preview} onRemove={() => handleImageRemove()}/>}
      <Select optionList={accessibilityOptions} onChange={(event) => handleChange(event, 'accesibilityId')}>A csoport láthatósága:</Select>
      <Button onClick={(event) => onSubmit(event)}>Csoport létrehozása</Button>
    </form>
  );
}

export default CreateGroup;
