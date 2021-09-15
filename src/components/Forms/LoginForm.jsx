import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

import { login } from '../../services/authenticationService';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Text from '../UI/Text';
import Logo from '../Logo';
import ToggleSwitch from '../UI/ToggleSwitch';

import FitnetLogo from '../../assets/logo/logo.svg';

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
    <div className="form login-form">
      <div className="nav-back">
        <div onClick={() => {history.push('/')}} className="nav-back__button">
          <Icon>arrow_back</Icon>
        </div>
      </div>
      <Logo className="login-form__logo" src={FitnetLogo} />
      <Text htmlTag="h1">Bejelentkezés</Text>
      <Input 
        type="email" 
        onChange={event => handleChange(event, 'email')} 
        value={loginData.email} 
        iconName="person"
        placeholder="E-mail"
      />

      <Input 
        type="password" 
        onChange={event => handleChange(event, 'password')} 
        value={loginData.password} 
        iconName="lock"
        placeholder="Jelszó"
      />
      <Text className="login-form__warning-message">{loginFailMessage}</Text>

      <div className="auth-options">
        <div>
          <ToggleSwitch />
          <Text htmlTag="p">Emlékezz rám</Text>
        </div>
        <Text htmlTag="p"><a>Elfelejtett jelszó?</a></Text>
      </div>
      
      <Button additionalClass="button-normal--iconed" onClick={(event) => onSubmit(event)}>
        BEJELNTKEZÉS
        <Icon>login</Icon>
      </Button>
      <Text htmlTag="p">...vagy <a href="/">folytasd vendégként.</a></Text>
      <Text htmlTag="p">Nincs még felhasználód? <a href="/signup">Regisztráció</a></Text>
    </div>
  );
}

export default LoginForm;
