import { Component } from "react";
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';


export class ContactForm extends Component {

    state = {
        name: '',
        number: '',
    };

    resetForm = () => {
        this.setState({ name: '', number: '' });
    };

    onChangeInput = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <form
                className={css.form}
                onSubmit={event => {
                    event.preventDefault();
                    this.props.addContact(this.state);
                    this.resetForm();
                }}
            >
                <label className={css.label}>
                    Name
                    <input
                        className={css.input}
                        onChange={this.onChangeInput}
                        value={this.state.name}
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
                        onChange={this.onChangeInput}
                        value={this.state.number}
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
}


ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
};