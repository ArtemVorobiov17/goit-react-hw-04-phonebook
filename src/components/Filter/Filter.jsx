import PropTypes from 'prop-types';
import css from './Filter.module.css';


export const Filter = ({ filter, onChangeInput }) => {
    return (
        <div className={css.filter__container}>
            <label className={css.filter__label}>
                Find contacts by name
                <input
                    className={css.filter__input}
                    onChange={onChangeInput}
                    value={filter}
                    type='text'
                    name='filter'
                />
            </label>
        </div>
    );
} 



Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChangeInput: PropTypes.func.isRequired,
};