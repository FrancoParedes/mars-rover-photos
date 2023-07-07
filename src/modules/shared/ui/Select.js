import { string, bool, arrayOf, shape, object } from 'prop-types';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
  OutlinedInput,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import React from 'react';

const Select = ({ control, name, label, defaultValue, error, options, className }) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ field }) => (
        <FormControl fullWidth error={!!error} className={className}>
          <InputLabel id={name}>{label}</InputLabel>
          <NativeSelect input={<OutlinedInput label={label} />} {...field}>
            {options.map(({ value, displayName }) => (
              <option key={value} value={value}>
                {displayName}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )}
  />
);

Select.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  label:string.isRequired,
  error: bool,
  defaultValue: string,
  options: arrayOf(
    shape({
      value: string.isRequired,
      displayName: string.isRequired,
    })
  ).isRequired,
  className: string,
};

Select.defaultProps = {
  defaultValue: '',
  error: false,
  className: '',
};

export default Select;
