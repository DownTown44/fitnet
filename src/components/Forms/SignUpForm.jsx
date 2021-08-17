import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import validator from 'validator';

import { signup } from '../../services/authenticationService';
import Input from '../UI/Input';
import Button from '../UI/Button';

const SignUpForm = () => {
  const history = useHistory();
  const [signUpData, setSignUpData] = useState({
    roleId: 1,
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    repeatedPassword: ''
  });
  
  const [currentField, setCurrentField] = useState(null);
  const [errors, setErrors] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    repeatedPassword: '',
  });

  // Validates when state changes
  useEffect(() => {
    validation();
  }, [signUpData]);

  // Updates form data on input field change
  const handleChange = (event, stateName) => {
    setCurrentField(stateName);
    setSignUpData((prevState) => {
      return {
        ...prevState,
        [stateName]: event.target.value
      };
    });
  };

  // Updates error data on input field change
  const errorUpdate = (errorField, errorMessage) => {
    setErrors((prevState) => {
      return {
        ...prevState,
        [errorField]: errorMessage
      };
    });
  };

  const validation = () => {
    switch (currentField) {
      case 'email': {
        validator.isEmail(signUpData.email) ?
          errorUpdate('email', '') :
          errorUpdate('email', 'Hibás e-mail cím');
        
        break;
      }
        
      case 'firstName': {
        validator.isAlpha(signUpData.firstName, 'hu-HU') ? 
          errorUpdate('firstName', '') : 
          errorUpdate('firstName', 'A név csak betűkből állhat');

        break;
      }

      case 'lastName': {
        validator.isAlpha(signUpData.lastName, 'hu-HU') ? 
          errorUpdate('lastName', '') : 
          errorUpdate('lastName', 'A név csak betűkből állhat');
        
        break;
      }

      case 'phoneNumber': {
        validator.isMobilePhone(signUpData.phoneNumber, 'ro-RO') ? 
          errorUpdate('phoneNumber', '') : 
          errorUpdate('phoneNumber', 'Hibás telefonszám');
        
        break;
      }

      case 'password': {
        validator.isStrongPassword(signUpData.password, {minSymbols: 0}) ? 
          errorUpdate('password', '') : 
          errorUpdate('password', 'Hibás jelszó, tartalmaznia kell nagy és kisbetűt és egy számot');
        
        break;
      }

      case 'repeatedPassword': {
        validator.equals(signUpData.repeatedPassword, signUpData.password) ? 
          errorUpdate('repeatedPassword', '') : 
          errorUpdate('repeatedPassword', 'A két jelszó nem egyezik meg');

        break;
      }
    }
  }

  // Checks if we store any error in state, returns true of none found
  const isValid = (obj) => {
    for (let key in obj) {
      if (obj[key] !== '')
        return false;
    }

    return true;
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(isValid(errors)) {
      signup(signUpData);
      history.push('/login');
    }
  };

  return (
    <form className="sign-up-form">
      <Input 
        type="email" 
        onChange={event => handleChange(event, 'email')} 
        value={signUpData.email} 
        label="E-mail"
        placeholder="E-mail"
        validationLabel={errors.email}
      />

      <Input 
        type="text" 
        onChange={event => handleChange(event, 'firstName')} 
        value={signUpData.firstName}
        label="Keresztnév"
        placeholder="Keresztnév"
        validationLabel={errors.firstName}
      />

      <Input 
        type="text" 
        onChange={event => handleChange(event, 'lastName')} 
        value={signUpData.lastName}
        label="Családnév" 
        placeholder="Családnév"
        validationLabel={errors.lastName}
      />

      <Input 
        type="text" 
        onChange={event => handleChange(event, 'phoneNumber')} 
        value={signUpData.phoneNumber}
        label="Telefonszám"
        placeholder="Telefonszám"
        validationLabel={errors.phoneNumber}
      />

      <Input 
        type="password" 
        onChange={event => handleChange(event, 'password')} 
        value={signUpData.password}
        label="Jelszó" 
        placeholder="Jelszó"
        validationLabel={errors.password}
      />

      <Input 
        type="password" 
        onChange={event => handleChange(event, 'repeatedPassword')} 
        value={signUpData.repeatedPassword}
        label="Ismételje meg a jelszavát" 
        placeholder="Jelszó"
        validationLabel={errors.repeatedPassword}
      />

      <Button onClick={(event) => onSubmit(event)}>Regisztráció</Button>
    </form>
  );
}

export default SignUpForm;
