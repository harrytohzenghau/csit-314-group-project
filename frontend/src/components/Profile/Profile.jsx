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
      <div >
      <h1 className={classes["profile-header"]}>Profile</h1>
      <h2 className={classes["profile-header"]}>Username: </h2>
      <div className={classes["profile-details"]}>{profile.username}</div>

      <h2 className={classes["profile-header"]}>First Name:</h2>
      <div className={classes["profile-details"]}>{profile.fname}</div>

      <h2 className={classes["profile-header"]}>Last Name:</h2>
      <div className={classes["profile-details"]}>{profile.lname}</div>
        
      </div>
      </>
    )
}

export default Profile