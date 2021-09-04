import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const NumberInputGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
}) => {
  return (
    <div className="form-group mb-2">
      <input
        type={type}
        className={classnames("form-control", {
          "is-invalid": error,
        })}
        name={name}
        value={value}
        onChange={onChange}
        disable={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

NumberInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.number,
};

NumberInputGroup.defaultProps = {
  type: "string",
};

export default NumberInputGroup;
