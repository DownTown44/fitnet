import React, { useState } from 'react';

import Input from '../UI/Input';
import Button from '../UI/Button';

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState(
    {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      repeatedPassword: '',

    }
  );

  const handleChange = (event, stateName) => {
    setSignUpData((prevState) => {
      return {
        ...prevState,
        [stateName]: event.target.value
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(signUpData);
  };

  return (
    <div>
      <form>
        <Input type="email" onChange={event => handleChange(event, 'email')} value={signUpData.email} />
        <Input type="text" onChange={event => handleChange(event, 'firstName')} value={signUpData.firstName} />
        <Input type="text" onChange={event => handleChange(event, 'lastName')} value={signUpData.lastName} />
        <Input type="text" onChange={event => handleChange(event, 'phoneNumber')} value={signUpData.phoneNumber} />
        <Input type="password" onChange={event => handleChange(event, 'password')} value={signUpData.password} />
        <Input type="password" onChange={event => handleChange(event, 'repeatedPassword')} value={signUpData.repeatedPassword} />
        <Button onClick={(event) => onSubmit(event)}>Submit</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
