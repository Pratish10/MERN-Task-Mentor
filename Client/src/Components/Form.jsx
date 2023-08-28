import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

const Form = ({ label, type, value, onChange }) => {
  return (
    <React.Fragment>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </FormControl>
    </React.Fragment>
  );
};

Form.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isError: PropTypes.string,
};

export default Form;
