import React, { Component } from 'react';
import shortid from 'shortid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/Contactform';
import Filter from './Filter/Filter';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const storage = localStorage.getItem('contacts');
    if (storage !== null) {
      this.setState({ contacts: JSON.parse(storage) });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  filterContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  setFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  

  addItem = item => {
    if (
      this.state.contacts.every(
        contact =>
          contact.name.toLocaleLowerCase() !== item.name.toLocaleLowerCase(),
      )
    ) {
      const itemToAdd = { ...item, id: shortid() };
      this.setState(state => ({
        contacts: [...state.contacts, itemToAdd],
      }));
    } else {
      alert(`${item.name} is already in contacts!`);
    }
  };

  deleteItem = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filtratedContacts = this.filterContacts(contacts, filter);
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onAddItem={this.addItem} />
        <h2>Contacts</h2>
        <Filter onSetFilter={this.setFilter} value={this.state.filter} />
        <ContactList items={filtratedContacts} onDelete={this.deleteItem} />
      </div>
    );
  }
}

export default App;