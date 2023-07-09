import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from './App.module.css';


export class App extends Component {

  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onChangeInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    if (
      this.state.contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`)
    } else {
      this.setState(prevState => {
        const list = [...prevState.contacts];
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        return { contacts: list }
      });
    }
  };

  filter = () => {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filterContacts;
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const filtred = contacts.filter(item => item.id !== id);
    this.setState({ contacts: filtred });
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };

  componentDidUpdate(_, prevState) {          //перше значення можна не передовати(prevProps)
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>

        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>

        <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />

        <ContactList deleteContact={this.deleteContact} contacts={this.filter()} />
      </div>
    );
  };
}
