import PropTypes from 'prop-types';
import css from './ContactList.module.css';


export const ContactList = ({ contacts, deleteContact }) => {
    return (
        <ul className={css.contact__list}>
            {contacts.map(contact => {
                return (
                    <li className={css.contact__item} key={contact.id}>
                        <p className={css.contact__data}>
                            {contact.name}:<span>{contact.number}</span>
                        </p>
                        <button
                            className={css.contact__btn}
                            type='button'
                            onClick={() => {
                                deleteContact(contact.id);
                            }}>
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    deleteContact: PropTypes.func.isRequired,
};