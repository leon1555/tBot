import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      drugname: "",
      expirydate: "",
      vialvolml: undefined,
      vialconcentrationmgml: undefined,
      dosecc: undefined,
      tdosemg: undefined,
      totaldosesvial: undefined,
      dosesremainingvial: undefined,
      cyclelengthdays: undefined,
      injectionsites: [],
      lastinjectionsite: "",
      nextinjectionsite: "",
      lastinjectiondate: "",
      nextinjectiondate: "",
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
    const profileData = {
      handle: this.state.handle,
      drugname: this.state.drugname,
      expirydate: this.state.expirydate,
      vialvolml: this.state.vialvolml,
      vialconcentrationmgml: this.state.vialconcentrationmgml,
      dosecc: this.state.dosecc,
      cyclelengthdays: this.state.cyclelengthdays,
      injectionsites: this.state.injectionsites,
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displayInjectionSites } = this.state;

    let injectionSites;
    if (displayInjectionSites) {
      injectionSites = <div>hello</div>;
    }
    // Select options for status
    const options = [
      { label: "* Select Drug Name", value: 0 },
      {
        label: "Depo-Testosterone (testosterone cypionate)",
        value: "Depo-Testosterone",
      },
      { label: "Delatestryl (testosterone enanthate)", value: "Delatestryl" },
      { label: "Aveed (testosterone undecanoate)", value: "Aveed" },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL."
                />
                <SelectListGroup
                  placeholder="Drug name"
                  name="drugname"
                  value={this.state.drugname}
                  onChange={this.onChange}
                  options={options}
                  error={errors.drugname}
                  info="Enter the name of the testosterone that you take."
                />
                <TextFieldGroup
                  placeholder="Expiry date on vial"
                  name="expirydate"
                  value={this.state.expirydate}
                  onChange={this.onChange}
                  error={errors.expirydate}
                  info="The expiry date on your current vial."
                />
                <TextFieldGroup
                  placeholder="Total volume of vial"
                  name="vialvolml"
                  value={this.state.vialvolml}
                  onChange={this.onChange}
                  error={errors.vialvolml}
                  info="The total volume of your vial in mL."
                />
                <TextFieldGroup
                  placeholder="Concentration of your vial"
                  name="vialconcentrationmgml"
                  value={this.state.vialconcentrationmgml}
                  onChange={this.onChange}
                  error={errors.vialconcentrationmgml}
                  info="The concentration of hormone in your vial."
                />
                <TextFieldGroup
                  placeholder="* Your dosage"
                  name="dosecc"
                  value={this.state.dosecc}
                  onChange={this.onChange}
                  error={errors.dosecc}
                  info="Your dose in cc's."
                />
                <TextFieldGroup
                  placeholder="* How many days are there between your injections?"
                  name="cyclelengthdays"
                  value={this.state.cyclelengthdays}
                  onChange={this.onChange}
                  error={errors.cyclelengthdays}
                  info="Your cycle length in days."
                />
                <TextFieldGroup
                  placeholder="Placeholder for injection sites"
                  name="injectionsites"
                  value={this.state.injectionsites}
                  onChange={this.onChange}
                  error={errors.injectionsites}
                  info="[To be changed to selection boxes]"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displayInjectionSites: !prevState.displayInjectionSites,
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Injection Sites
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {injectionSites}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);