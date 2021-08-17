import React, { useState } from 'react';
import axios from '../../axios';
import Cookies from 'js-cookie';

import Input from '../UI/Input';
import Button from '../UI/Button';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event, stateName) => {
    setLoginData((prevState) => {
      return {
        ...prevState,
        [stateName]: event.target.value
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    axios.post('/login', loginData)
    .then((res) => {
      console.log(res.data);
      Cookies.set("token", res.data.token);

    }).catch( (error) => {
      console.log(error.response);
    });
  };

  return (
    <form className="login-form">
      <Input 
        type="email" 
        onChange={event => handleChange(event, 'email')} 
        value={loginData.email} 
        label="E-mail"
        placeholder="E-mail"
      />

      <Input 
        type="password" 
        onChange={event => handleChange(event, 'password')} 
        value={loginData.password} 
        label="Password"
        placeholder="Password"
      />

      <Button onClick={(event) => onSubmit(event)}>Bejelentkezés</Button>
    </form>
  );
}

export default LoginForm;
