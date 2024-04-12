import React, { useState } from 'react';
import classes from "./Profile.module.css";

const Profile = () => {

    const profile = {
        username: "sysadmin1",
        fname: "Admin1",
        lname: "System",
        email: "sysadmin1@gmail.com"
    }
  
    return (
      <>
      <div className={classes.profile}>
      <h1>Profile</h1>
        {Object.keys(profile).map(key=><h3>{key}: {profile[key]}</h3>)}
  
  
      </div>
      </>
    )
}

export default Profile