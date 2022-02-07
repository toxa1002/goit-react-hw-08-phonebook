import { useState, useCallback } from "react";
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from "./ContactForm.module.css";
import TextField from '@material-ui/core/TextField';
import сontactsOperations from '../../redux/contacts/contacts-operations'



export default function ContactForm({contacts}) {
  const dispatch = useDispatch();
  const [ name, setName ] = useState("");
  
  const  handleInputChangeName = useCallback((e) => {
    const { value } = e.currentTarget;
    setName(value)
  },[]);
  const [ number, setNumber ] = useState("");

  const  handleInputChangeNumber = useCallback((e) => {
    const { value } = e.currentTarget;
    setNumber(value)
  },[]);
  
  const handleSubmitForm =(e) => {
    e.preventDefault();
    // console.log('гребаный перерендер');
    const isValidForm = validateForm(name, number);
    if (isValidForm) {
      dispatch(сontactsOperations.addItem({name,number}));
    } else return;
     reset();
  };
 

  const handleUniceContact = (name) => {
      const isContactThere = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
      if (isContactThere) {
        toast.error('Contact is exist', {
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnHover: false,
          position: "top-right",
      })
        return;
      }
      return !isContactThere;
    };

  const validateForm = (name, number) => {
    if (!name || !number) {
      toast.warn('Empty fields! Please fill',{
        autoClose:2000,
        hideProgressBar: true,
        pauseOnHover: false,
        position: "top-right",
      });
      return false;
    }
    return handleUniceContact(name);
  };

  

  const reset = () => {
    setName('');
    setNumber('');
  };


  return (
    <form className={s.form} onSubmit={handleSubmitForm}>
    <TextField className={s.FormInput}
      label="Name"
      type="text"
      name="name"
      value={name}
      onChange={handleInputChangeName}
    />

    <TextField className={s.FormInput}
      margin="normal"
      label="Number 345-67-89"
      type="tel"
      name="number"
      pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
      value={number}
      onChange={handleInputChangeNumber}
    />
    <Button margin='normal' type="submit" className={s.buttonForm} color='primary' variant='contained'>
      Add contact
      </Button>
  </form>
  )
}
