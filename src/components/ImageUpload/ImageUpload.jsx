import { useRef, useState, useEffect } from 'react';

import Button from '../UI/Button/Button';
import CancellableImage from './CancellableImage';

const ImageUpload = () => {
  // Store file objects
  const [images, setImages] = useState([]);
  // Stores image bytearray strings
  const [previews, setPreviews] = useState([]);
  // Reference for the file input
  const fileInputRef = useRef();

  useEffect(() => {
    if (images) {
      // Resetting the preview state, or it will duplicate files
      setPreviews([]);

      images.map(image => {
        const reader = new FileReader();
        // Reading images data
        reader.readAsDataURL(image);
        // Updating the state of the previews after reading finished
        reader.onloadend = () => {
          setPreviews(previews => [...previews, String(reader.result)]);
        };
      });
    };
  }, [images]);

  const handleImageUpload = (event) => {
    // Reading image object from the event
    const file = event.target.files[0];

    // Validating the file, and updating the state of the images
    if (file && file.type.substr(0, 5) === "image") {
      setImages(images => [...images, file]);
    } else {
      setImages(images => [...images]);
    };

    // Clearing event value so we can upload the same image twice
    // We use the onChange for the event so if we upload the same image twice 
    // the value doesn't 'change' and it will not upload the second time 
    event.target.value = "";
  };

  // Removing images by the key we gave to them
  const handleRemoveImage = (index) => {
    setImages(images.filter(item => images.indexOf(item) !== index))
  };

  // Loading image previews
  let loadedPreviews = null;
  if (previews.length) {
    loadedPreviews = previews.map((e, key) => (
      <CancellableImage key={key} src={e} onRemove={() => handleRemoveImage(key)}/>
    ));
  };

  return (
    <div className="imageUpload">
      <Button onClick={(event) => {
        // We prevent the websites reload when uploading, because we reload the components by state
        event.preventDefault();
        fileInputRef.current.click();
      }}>Kép hozzáadása</Button>

      <input 
        type="file" 
        multiple
        style={{display: "none"}} 
        ref={fileInputRef}
        accept="image/*"
        onChange={(event) => handleImageUpload(event)}
        />

      {loadedPreviews}
    </div>
  );
};

export default ImageUpload;
