import React from 'react';
import PropTypes from 'prop-types';
import './filter.scss';

function Filters({ value, handleChange, location }) {
  if (value === null) {
    value = undefined;
  }
  return (
    <div className="filter-container">
      <div className="input-filter">
        <input value={value} onChange={handleChange} name={location} placeholder="ma recherche" />
      </div>
    </div>
  );
}

Filters.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired
};
export default Filters;
