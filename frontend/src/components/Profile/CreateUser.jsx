import React, { useState } from 'react';
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "../Auth/Register.module.css";
import { useNavigate } from 'react-router-dom';


const CreateUser = () =>{
    const navigate = useNavigate()

    function createUser(formData){
        const details = formData.get("")
    }

    function profileListPageNavigation(){
        navigate("/profile-list")
    }

    return(
        <form action={createUser}>
            <Card className={classes["card-style"]}>
        <h2>Create new user</h2>
        
        <div className={classes["register-user-type-wrapper"]}>
          <Input type="checkbox" htmlFor="buyer" name="user-type" label="Buyer" />
          <h5>Is this an Agent account?: </h5>
        </div>
        <div className={classes["register-input-wrapper"]}>
          <div className={classes["register-input-row-wrapper"]}>
            <Input
              type="text"
              label="First Name"
              className={classes["input-style"]}
              name="fname"
            />
            <Input
              type="text"
              label="Last Name"
              className={classes["input-style"]}
              name="lname"
            />
          </div>
          <div className={classes["register-input-row-wrapper"]}>
            <Input
              type="text"
              label="Username"
              className={classes["input-style"]}
              name="username"
            />
            <Input
              type="email"
              label="Email"
              className={classes["input-style"]}
              name="email"
            />
          </div>
          <div className={classes["register-input-row-wrapper"]}>
            <Input
              type="password"
              label="Password"
              className={classes["input-style"]}
            />
            <Input
              type="password"
              label="Repeat Password"
              className={classes["input-style"]}
            />
          </div>
        </div>
        <div className={classes["register-button-wrapper"]}>

          <div className={classes["register-action-button"]}>
            <Button style="primary" type="submit">
              Register
            </Button>
            <Button style="secondary" type="button" onClick={profileListPageNavigation}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>


        </form>
    )
}

export default CreateUser
