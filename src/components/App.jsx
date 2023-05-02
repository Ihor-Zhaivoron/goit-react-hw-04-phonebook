import { useState, useEffect } from 'react';
//========== components ==========
import { Phonebook } from './Phonebook/Phonebook';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
//========== styles ==========
import css from './App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const LS_KEY = 'local_storage_contacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(() => {
    if (localStorage.getItem(LS_KEY)) {
      return JSON.parse(localStorage.getItem(LS_KEY));
    }
    return initialContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // --------------------------------
  function addContact(id, name, number) {
    if (contacts.find(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }
    number = number.split('');
    number.splice(3, 0, '-');
    number.splice(6, 0, '-');
    number = number.join('');

    setContacts([...contacts, { id, name, number }]);
  }
  // ----------------------------------
  function onFilter(e) {
    setFilter(e.currentTarget.value);
  }
  function onDelete(id) {
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.phonebook}>
      <h1>Phonebook</h1>
      <Phonebook addContact={addContact} />
      <Filter onFilter={onFilter} />
      <ContactForm contacts={filteredContacts} handleDelete={onDelete} />
    </div>
  );
}
