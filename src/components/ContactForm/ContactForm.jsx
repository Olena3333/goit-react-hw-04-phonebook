import React, { useState } from 'react';
import propTypes from 'prop-types';
import { StyledInput, StyledForm } from './ContactForm.styled';
import { StyledButton } from '../App.styled';
import { nanoid } from 'nanoid';
export const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handelOnChange = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };
  const handelOnSubmit = e => {
    e.preventDefault();

    const newContact = {
      number: number.trim(),
      name: name.trim(),
      id: nanoid(),
    };

    if (!name.trim()) {
      return;
    }

    onAddContact(newContact);

    setName('');
    setNumber('');
  };
  return (
    <StyledForm onSubmit={handelOnSubmit}>
      <label>
        Name:
        <StyledInput
          type="text"
          placeholder="Enter the name "
          onChange={handelOnChange}
          value={name}
          name="name"
          required
        />
      </label>
      <label>
        Number:
        <StyledInput
          onChange={handelOnChange}
          value={number}
          placeholder="Enter the number"
          type="tel"
          name="number"
          required
        />
      </label>
      <StyledButton disabled={!name}>Add contact</StyledButton>
    </StyledForm>
  );
};
ContactForm.propTypes = {
  onAddContact: propTypes.func.isRequired,
};
