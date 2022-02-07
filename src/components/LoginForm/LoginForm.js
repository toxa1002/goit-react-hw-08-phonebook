import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../ContactForm/ContactForm.module.css';
import registerOperations from '../../redux/auth/register-operations';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function LoginForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const handleInputChangeEmail = useCallback(e => {
    const { value } = e.currentTarget;
    setEmail(value);
  }, []);

  const [password, setPassword] = useState('');

  const handleInputChangePassword = useCallback(e => {
    const { value } = e.currentTarget;
    setPassword(value);
  }, []);

  const handleSubmitForm = useCallback(
    e => {
      e.preventDefault();

      if (email !== '' && password !== '') {
        dispatch(
          registerOperations.login({ email, password }),
        );
      } else {
        toast.error(
          'Empty fields!!! Please fill oll the fields',
          {
            autoClose: 2000,
            hideProgressBar: true,
            pauseOnHover: false,
            position: 'top-right',
          },
        );
      }
      reset();
    },
    [dispatch, email, password],
  );
  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={handleSubmitForm}
      >
        <TextField
          label="email"
          className={styles.FormInput}
          type="email"
          name="email"
          value={email}
          onChange={handleInputChangeEmail}
        />
        <TextField
          className={styles.FormInput}
          margin="normal"
          label="password"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChangePassword}
        />

        <Button
          color="primary"
          variant="contained"
          className={styles.buttonForm}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

