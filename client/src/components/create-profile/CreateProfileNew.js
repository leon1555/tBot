import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import NumberInputGroup from "../common/NumberInputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

function CreateProfile(props) {
  // I eliminated the wrapping object for all of these variables. Seemed like it might make them slightly easier to deal with.

  // let MATH_HERE // placeholder
  const [handle, setHandle] = useState("");
  const [drugname, setDrugname] = useState("");
  const [expirydate, setExpirydate] = useState("");
  const [vialvolml, setVialvolml] = useState("");
  const [vialconcentrationmgml, setVialconcentrationalmgml] = useState("");
  const [dosecc, setDosecc] = useState("");
  // const [tdosemg, setTdosemg] = useState(MATH_HERE)
  // const [totaldosesvial, setTotaldosesvial] = useState(MATH_HERE)
  // const [dosesremainingvial, setDosesremainingvial] = useState(MATH_HERE)
  const [cyclelengthdays, setCyclelengthdays] = useState("");
  const [injectionsites, setInjectionsites] = useState([]);
  const [errors, setErrors] = useState({});

  // Is the componentWillReceiveProps lifecycle method actually still needed? I read somewhere that it can be translated into a useEffect hook, but I'm not sure if it's necessary in this context??

  const onSubmit = (e) => {
    e.preventDefault();

    // not sure what to put here. I'm updating the each variable that's set in the state with user input with in-line onChange functions for each input field. So I don't think onSubmit needs to do anything to further update the state. But I do need to invoke the imported createProfile function to upload the profile to the backend/database. And I probably need to use Redux here too, right? Do I need a useSelector hook? I'm still vague on modern Redux usage...
  };

  // Deleted the render wrapper.

  // Initiates the toggle for displaying the injection sites or not. It gets toggled with a button click.
  const [displayInjectionSites, setDisplayInjectionSites] = useState(false);

  let injectionSites;
  if (displayInjectionSites) {
    // LEON STILL NEEDS TO MAKE THIS
    injectionSites = <div>hello</div>;
  }
  // Select options for status
  const options = [
    { label: "* Select your testosterone", value: 0 },
    {
      label: "Depo-Testosterone (testosterone cypionate)",
      value: "Depo-Testosterone",
    },
    { label: "Delatestryl (testosterone enanthate)", value: "Delatestryl" },
    { label: "Aveed (testosterone undecanoate)", value: "Aveed" },
  ];
  return (
    <div className="create-profile page-light">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create a Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                error={errors.handle}
                info="A unique handle for your profile URL."
              />
              <SelectListGroup
                // placeholder="Drug name"
                name="drugname"
                value={drugname}
                onChange={(e) => setDrugname(e.target.value)}
                options={options}
                error={errors.drugname}
              />
              <TextFieldGroup
                type="date"
                name="expirydate"
                value={expirydate}
                onChange={(e) => setExpirydate(e.target.value)}
                error={errors.expirydate}
                info="The expiry date on your current vial."
              />
              <NumberInputGroup
                // placeholder="Total volume of vial"
                name="vialvolml"
                value={`${vialvolml}`}
                onChange={(e) => setVialvolml(e.target.value)}
                error={errors.vialvolml}
                info="The total volume of your vial in mL."
              />
              <NumberInputGroup
                // placeholder="Concentration of your vial"
                name="vialconcentrationmgml"
                value={`${vialconcentrationmgml}`}
                onChange={(e) => setVialconcentrationalmgml(e.target.value)}
                error={errors.vialconcentrationmgml}
                info="The concentration of hormone in your vial."
              />
              <NumberInputGroup
                // placeholder="* Your dosage"
                name="dosecc"
                value={`${dosecc}`}
                onChange={(e) => setDosecc(e.target.value)}
                error={errors.dosecc}
                info="Your dose in cc's."
              />
              <NumberInputGroup
                // placeholder="* How many days are there between your injections?"
                name="cyclelengthdays"
                value={`${cyclelengthdays}`}
                onChange={(e) => setCyclelengthdays(e.target.value)}
                error={errors.cyclelengthdays}
                info="Your cycle length in days."
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplayInjectionSites(!displayInjectionSites);
                  }}
                  className="btn btn-light col-6"
                >
                  Add Injection Sites
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {injectionSites}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info col-12 mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// I got rid of the propTypes/PropTypes. Is that okay?

// Ahh, do I need this?
const mapStateToProps = (state) => ({
  handle: state.handle,
  drugname: state.drugname,
  expirydate: state.expirydate,
  vialvolml: state.vialvolml,
  vialconcentrationmgml: state.vialconcentrationmgml,
  dosecc: state.dosecc,
  cyclelengthdays: state.cyclelengthdays,
  errors: state.errors,
});

// Is this modern?
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
