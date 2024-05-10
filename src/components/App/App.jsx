import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Searchbox from "../Searchbox/Searchbox";

function App() {
 const [searchQuery, setSearchQuery] = useState('');
 const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      return JSON.parse(savedContacts);
    }
    return [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
];
 });

 const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
 );

 const addContact = (name, number) => {
    const contactObject = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, contactObject]);
 };

 const deleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
 };

 useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
 }, [contacts]);

 return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <Searchbox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
    </div>
 );
}

export default App;
