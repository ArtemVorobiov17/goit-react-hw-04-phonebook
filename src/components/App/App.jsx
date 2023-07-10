import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from './App.module.css';

const contactsLocal = 'contacts';

const contactsArr = [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];
    


export const App= ()=> {

  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem(contactsLocal)) ?? contactsArr
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(contactsLocal, JSON.stringify(contacts));
  }, [contacts]);

  const onChangeInput = event => {
    setFilter(event.currentTarget.value);
  };

  const addContact = ({ name, number }) => {
    if (
      contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`)
    } else {
      setContacts(prev => {
        const list = [...prev];
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        return list
      });
    }
  };

  const filterContact = () => {
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filterContacts;
  };

  const deleteContact = id => {
    const filtred = contacts.filter(item => item.id !== id);
    setContacts(filtred);
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>

      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>{' '}

      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} onChangeInput={onChangeInput} />

          <ContactList deleteContact={deleteContact} contacts={filterContact()} /> 
        </>
      ) : (
          <p>No contacts yet.</p>
      )}
      
      </div>
    );
};

