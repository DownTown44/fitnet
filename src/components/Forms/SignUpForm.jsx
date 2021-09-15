import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

import validator from 'validator';

import { signup } from '../../services/authenticationService';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Text from '../UI/Text';
import NavButton from '../UI/NavButton';

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
    <form className="form sign-up-form">
      <div className="nav-back">
        <NavButton to="/" icon="arrow_back" />
      </div>

      <Text htmlTag="h1">Regisztráció</Text>
      <Input 
        type="email" 
        onChange={event => handleChange(event, 'email')} 
        value={signUpData.email} 
        placeholder="E-mail"
        validationLabel={errors.email}
        iconName="mail_outline"
        invalid={errors.email && "warning"}
      />

      <Input 
        type="text" 
        onChange={event => handleChange(event, 'firstName')} 
        value={signUpData.firstName}
        placeholder="Keresztnév"
        validationLabel={errors.firstName}
        iconName="face"
        invalid={errors.firstName && "warning"}
      />

      <Input 
        type="text" 
        onChange={event => handleChange(event, 'lastName')} 
        value={signUpData.lastName}
        placeholder="Családnév"
        validationLabel={errors.lastName}
        iconName="person"
        invalid={errors.lastName && "warning"}
      />

      <Input 
        type="text" 
        onChange={event => handleChange(event, 'phoneNumber')} 
        value={signUpData.phoneNumber}
        placeholder="Telefonszám"
        validationLabel={errors.phoneNumber}
        iconName="smartphone"
        invalid={errors.phoneNumber && "warning"}
      />

      <Input 
        type="password" 
        onChange={event => handleChange(event, 'password')} 
        value={signUpData.password}
        placeholder="Jelszó"
        validationLabel={errors.password}
        iconName="lock"
        invalid={errors.password && "warning"}
      />

      <Input 
        type="password" 
        onChange={event => handleChange(event, 'repeatedPassword')} 
        value={signUpData.repeatedPassword} 
        placeholder="Ismételt jelszó"
        validationLabel={errors.repeatedPassword}
        iconName="lock"
        invalid={errors.repeatedPassword && "error"}
      />

      <Button additionalClass="button-normal--iconed" onClick={(event) => onSubmit(event)}>
        REGISZTRÁCIÓ
        <Icon>login</Icon>
      </Button>
      <Text htmlTag="p">Már van fiókod? <a href="/login">Jelentkezz be</a></Text>
    </form>
  );
}

export default SignUpForm;
