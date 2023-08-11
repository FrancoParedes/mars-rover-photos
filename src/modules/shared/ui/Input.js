import { FormControl, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { string, bool, object } from 'prop-types';

const Input = ({ control, name, label, className, defaultValue }) => (
  <FormControl fullWidth className={`!mb-4 ${className}`}>
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          label={label}
          variant="outlined"
          {...field}
          rows="3"
        />
      )}
    />
  </FormControl>
);

Input.propTypes = {
  control: object.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  className: string.isRequired,
  defaultValue: string.isRequired,
  error: bool.isRequired,
};

export default Input;
