import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-ninja mr-1"></i> Edit Profile
      </Link>
      <Link to="add-injection" className="btn btn-light">
        <i className="fas fa-syringe mr-1"></i>
        Add Injection
      </Link>
    </div>
  );
};

export default ProfileActions;
