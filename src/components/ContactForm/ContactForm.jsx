import { useState } from "react";
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';


export const ContactForm =({addContact}) => {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onChangeInput = event => {
        const { name, value } = event.currentTarget;
        name === 'name' ? setName(value) : setNumber(value);
    };

    return (
        <form
            className={css.form}
            onSubmit={event => {
                event.preventDefault();
                addContact({name, number});
                setName('');
                setNumber('');
            }}
        >
            <label className={css.label}>
                Name
                <input
                    className={css.input}
                    onChange={onChangeInput}
                    value={name}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я\s]+$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label className={css.label}>
                Number
                <input
                    className={css.input}
                    onChange={onChangeInput}
                    value={number}
                    type="tel"
                    name="number"
                    pattern="\+?[0-9\s\-\(\)]+"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={css.button} type="submit">
                Add contact
            </button>
        </form>
    );    
}


ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
};