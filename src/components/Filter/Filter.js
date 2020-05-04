import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Filter = ({ value, onSetFilter }) => {
  const loginInputId = shortid();

  return (
    <form>
      <h3>Find contact by name</h3>
      <input
        onChange={onSetFilter}
        type="text"
        name="filter"
        id={loginInputId}
        placeholder="Поиск контакта по имени"
        value={value}
      />
    </form>
  );
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onSetFilter: PropTypes.func.isRequired,
};

export default Filter;