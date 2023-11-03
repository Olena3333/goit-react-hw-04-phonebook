import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notificatio } from './Notificatio/Notificatio';
import { StyledWrapper } from './App.styled';
import { toast } from 'react-toastify';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    toast.success('Component was Mount');
    const contacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (contacts?.length) {
      setContacts(contacts);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

  const handelOnFilter = e => {
    setFilter(e.target.value);
  };

  const handleAddContact = newContact => {
    const same = contacts.find(contact => contact.name === newContact.name);

    same
      ? toast.success(`${newContact.name} is already in contacts.`)
      : setContacts([newContact, ...contacts]);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filterContact = getFilterContacts();
  return (
    <StyledWrapper>
      <h1>Phonebook</h1>

      <ContactForm
        onAddContact={handleAddContact}
        // contacts={this.state.contacts}
      />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handelOnFilter} />
      {contacts.length ? (
        <ContactList
          contacts={filterContact}
          deletedContact={handleDeleteContact}
        />
      ) : (
        <Notificatio message={'You have no contacts'} />
      )}
    </StyledWrapper>
  );
};
