import React, { useState, useEffect } from 'react';
import axios from 'axios';

import validator from 'validator';

import Input from '../UI/Input';
import Button from '../UI/Button';

const SignUpForm = () => {
  const [currentField, setCurrentField] = useState(null);

  // The initial state is true, because empty fields are invalid (true = has error)
  const [emailError, setEmailError] = useState(true);
  const [firstNameError, setFirstNameError] = useState(true);
  const [lastNameError, setLastNameError] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [repeatError, setRepeatError] = useState(true);

  const [signUpData, setSignUpData] = useState({
    roleId: 1,
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    repeatedPassword: ''
  });
  
  // Validating when a field has been changed
  useEffect(() => {
    if(currentField === 'email') {
      if(validator.isEmail(signUpData[currentField])) {
        setEmailError(false);
      } else {
        setEmailError('Hibás e-mail cím');
      }
    } else if(currentField === 'firstName') {
      if(validator.isAlpha(signUpData[currentField], 'hu-HU')) {
        setFirstNameError(false);
      } else {
        setFirstNameError('A neved csak betűkből állhat.');
      }
    } else if(currentField === 'lastName') {
      if(validator.isAlpha(signUpData[currentField], 'hu-HU')) {
        setLastNameError(false);
      } else {
        setLastNameError('A neved csak betűkből állhat.');
      }
    } else if(currentField === 'phoneNumber') {
      if(validator.isMobilePhone(signUpData[currentField], 'ro-RO')) {
        setPhoneNumberError(false);
      } else {
        setPhoneNumberError('Hibás telefonszám');
      }
    } else if(currentField === 'password') {
      if(validator.isStrongPassword(signUpData[currentField], {minSymbols: 0})) {
        setPasswordError(false);
      } else {
        setPasswordError('Hibás jelszó, tartalmaznia kell nagy és kisbetűt és egy számot');
      }
    } else if(currentField === 'repeatedPassword') {
      if(validator.equals(signUpData[currentField], signUpData.password)) {
        setRepeatError(false);
      } else {
        setRepeatError('A két jelszó nem egyezik meg');
      }
    }
  }, [signUpData]);

  const handleChange = (event, stateName) => {
    setCurrentField(stateName);
    setSignUpData((prevState) => {
      return {
        ...prevState,
        [stateName]: event.target.value
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // We check if all the fields are false (false = no error)
    // We set an error message in the variables 
    // so when it contains an error message (string) it is considered as true
    // that's why it is reversed
    if(!emailError && !firstNameError && !lastNameError && !phoneNumberError && !passwordError && !repeatError) {
      axios.post('http://localhost:8080/signup', signUpData)
        .then( (res) => {
          console.log(res);
        }).catch( (error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <div>
      <form>
        <Input 
          type="email" 
          onChange={event => handleChange(event, 'email')} 
          value={signUpData.email} 
          label="Email"
          validationLabel={emailError}
        />

        <Input 
          type="text" 
          onChange={event => handleChange(event, 'firstName')} 
          value={signUpData.firstName}
          label="First name"
          validationLabel={firstNameError}
        />

        <Input 
          type="text" 
          onChange={event => handleChange(event, 'lastName')} 
          value={signUpData.lastName}
          label="Last name" 
          validationLabel={lastNameError}
        />

        <Input 
          type="text" 
          onChange={event => handleChange(event, 'phoneNumber')} 
          value={signUpData.phoneNumber}
          label="Phone number"
          validationLabel={phoneNumberError}
        />

        <Input 
          type="password" 
          onChange={event => handleChange(event, 'password')} 
          value={signUpData.password}
          label="Password" 
          validationLabel={passwordError}
        />

        <Input 
          type="password" 
          onChange={event => handleChange(event, 'repeatedPassword')} 
          value={signUpData.repeatedPassword}
          label="Repeat password"
          validationLabel={repeatError}
        />

        <Button onClick={(event) => onSubmit(event)}>Submit</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
