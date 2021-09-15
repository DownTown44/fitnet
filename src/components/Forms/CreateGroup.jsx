import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormData from 'form-data';
import { useHistory, useParams } from 'react-router-dom';


import { createGroup, getGroupById, updateGroup } from '../../services/groupService';
import { getAccessibilities } from '../../services/accessibilityService';
import Input from '../UI/Input';
import Dropdown from '../UI/Dropdown/Dropdown';
import Text from '../UI/Text';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';
import DiscardableImage from '../ImageUpload/DiscardableImage';

const CreateGroup = (props) => {
  const history = useHistory();
  // Stores image bytearray strings
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  // Reference for the file input
  const fileInputRef = useRef();
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    accessibilityId: 1
  });

  const [accessibilityOptions, setAccessibilityOptions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAccessibilities().then((result) => {
      result.splice(3, 1);
      setAccessibilityOptions(result);
    });

    if (props.edit) {
      getGroupById(id).then((result) => {
        setGroupData(result);
        setPreview(`http://localhost:8080/${result.picture}`);
      });
    }
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
  }

  const handleChangeSelect = (value) => {
    setGroupData((prevState) => {
      return {
        ...prevState,
        accessibilityId: value,
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
  }

  const handleImageRemove = () => {
    setImage(null);
    setPreview(null);
  }

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
      if (result.created) {
        history.push(`/groups/${result.id}`)
      }
    }
  }

  const onModify = async (group) => {
    group.preventDefault();

    if (isValid(groupData)) {
      let formData = new FormData();
      formData.append("data", JSON.stringify(groupData));
      formData.append("image", image);

      const result = await updateGroup(id, formData);
      if (result.created) {
        history.push(`/groups/${result.id}`);
      }
    }
  }

  return (
    <div className="form create-group-form">
      <Text htmlTag="h1">Csoport létrehozása</Text>
      <form>
        <Input 
          type="text"
          onChange={(event) => handleChange(event, 'name')}
          value={groupData.name}
          placeholder="Csoport neve"
        />
        <Textarea
          onChange={(event) => handleChange(event, 'description')}
          value={groupData.description}
          placeholder="Csoport leírása"
          rows="4" 
          cols="60"
          maxLength="2048"
        />      

        <Button additionalClass="button-outlined" onClick={(event) => {
          event.preventDefault();
          fileInputRef.current.click();
        }}>
          Borítókép hozzáadása
        </Button>

        <input 
          type="file" 
          multiple
          style={{display: "none"}} 
          ref={fileInputRef}
          accept="image/*"
          onChange={(event) => handleImageUpload(event)}
        />
        {preview && <DiscardableImage src={preview} onRemove={() => handleImageRemove()}/>}
        <Dropdown optionList={accessibilityOptions} placeholder="Az csoport láthatósága" returnSelected={handleChangeSelect}/>
        {
          props.edit ?
          <Button additionalClass="button-normal--iconed" onClick={(event) => onModify(event)}>
            Csoport módosítása
          </Button> :
          <Button additionalClass="button-normal--iconed" onClick={(event) => onSubmit(event)}>
            Csoport létrehozása
          </Button>
        }
      </form>
    </div>
  );
}

CreateGroup.propTypes = {
  edit: PropTypes.bool
}

CreateGroup.defaultProps = {
  edit: false
}


export default CreateGroup;
