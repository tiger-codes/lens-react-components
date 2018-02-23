import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const AddFilter = ({ data, onChange, value, placeholder }) => (
  <div>
    <Select
      name="form-field-name"
      placeholder={placeholder}
      onChange={onChange}
      placeHolder="Add filter"
      options={data}
      value={value}
      style={{ width: '110px'}}
      // multi
     />
  </div>
);

export default AddFilter;
