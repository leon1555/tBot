import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addInjection } from "../../actions/profileActions";

class AddInjection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      injectiondate: "",
      injectionsite: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const injectionData = {
      injectiondate: this.state.injectiondate,
      injectionsite: this.state.injectionsite,
    };
    this.props.addInjection(injectionData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-injection page-light">
        <div className="container">
          <div className="rows">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Injection</h1>
              <p className="lead text-center">
                Log a past or current injection
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="injectiondate"
                  type="date"
                  value={this.state.injectiondate}
                  onChange={this.onChange}
                  error={errors.injectiondate}
                />
                <TextFieldGroup
                  placeholder="* injection site"
                  name="injectionsite"
                  value={this.state.injectionsite}
                  onChange={this.onChange}
                  error={errors.injectionsite}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn submit-btn col-12 mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddInjection.propTypes = {
  addInjection: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addInjection })(
  withRouter(AddInjection)
);
