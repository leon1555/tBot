import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import logoName from "../../img/tbotlogo.png";
import tbotlogobrand from "../../img/tbotlogobrand.png";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="page">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div>
                  <img src={tbotlogobrand} alt="" style={{ width: "600px" }} />
                </div>
                <p className="lead lead-landing">
                  For transmen, non-binary folk, and cismen who self-inject
                  testosterone
                </p>
                {/* <hr /> */}
                {/* <Link to="register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="login" className="btn btn-lg btn-light">
                  Login
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
