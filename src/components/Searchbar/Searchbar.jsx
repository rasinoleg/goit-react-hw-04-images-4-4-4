import React, { useState } from 'react';
import css from '../Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ autoComplete, autoFocus, placeholder, onSubmit }) => {
  
  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  const handleChange = evt => {
    setQuery(evt.target.value );
  };
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <input
            className={css.SearchFormInput}
            type="text"
            value={query}
            onChange={handleChange}
            name="query"
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            placeholder={placeholder}
          />
          <button type="submit" className={css.SearchFormButton}>
            Search
          </button>
        </form>
      </header>
    );
};

Searchbar.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;