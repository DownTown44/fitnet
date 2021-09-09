import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { login } from '../../services/authenticationService';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Text from '../UI/Text';

const LoginForm = (props) => {
  const history = useHistory();

  const [loginFailMessage, setLoginFailMessage] = useState('');
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

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await login(loginData);
    const authorized = data.auth
    const userData = data.result
    
    if (authorized) {
      sessionStorage.setItem('userData', JSON.stringify(userData));
      history.push('/');
    } else {
      setLoginFailMessage("A jelszavad vagy az emailed hibás.");
    }

    props.onLoginAttempt(authorized);
  };

  return (
    <form className="form">
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
      <Text>{loginFailMessage}</Text>

      <Button onClick={(event) => onSubmit(event)}>Bejelentkezés</Button>
    </form>
  );
}

export default LoginForm;
