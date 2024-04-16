import React, { useState } from 'react';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../UI/Button';
import Pagination from '../UI/Pagination';
import Input from '../UI/Input'

const ProfileList = () =>{
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState()
    const [usersPerPage, setUsersPerPage] = useState()
    const [editClick, setEditClick] = useState(false)
  
      const userList = [
      {
        username: "user1",
        personal_first_name: "User1",
        personal_last_name: "Smith",
        personal_mobile_number: 123456
      },
      {
        username: "user2",
        personal_first_name: "User2",
        personal_last_name: "Lovelace",
        personal_mobile_number: 333555
      },
      {
        username: "user3",
        personal_first_name: "User3",
        personal_last_name: "Obama",
        personal_mobile_number: 909090
      }]
      const indexOfLastItem = currentPage + usersPerPage - 2
      const indexOfFirstItem = indexOfLastItem - usersPerPage + 1
      const currentUsers = userList.slice(indexOfFirstItem, indexOfLastItem)
    
      const paginate = pageNumber => setCurrentPage(pageNumber);

      function handleEditClick(index){
        
        setEditClick(!editClick)
      }

      function handleSaveClick(){
        //send post request
        setEditClick(!editClick)
      }
      

      function createUserNavigator(){
        navigate("/create-user")
      }

      return(<>
      
      <div >
      <h1 style={{paddingTop: "4rem"}}>User List</h1>
      <table style={{fontSize: "2rem"}}>
        <tbody>
        <tr>
          <th><h3>First Name</h3></th>
          <th><h3>Last Name</h3></th>
          <th><h3>Mobile Number</h3></th>
        </tr>
        {userList.map((user,i) => <tr>
          
          <td>{editClick?(<>
            <Input type="text" id={i.toString()} defaultValue={user.personal_first_name}></Input>
            <Input type="text" id={i.toString()} defaultValue={user.personal_last_name}></Input>
            <Input type="text" id={i.toString()} defaultValue={user.personal_mobile_number}></Input>
            <Button onClick={handleSaveClick}>Save</Button>
            <Button onClick={handleEditClick}>Cancel</Button>

          </>):(<>
            <td>{user.personal_first_name}</td>
            <td>{user.personal_last_name}</td>
            <td>{user.personal_mobile_number}</td>
            <Button className={"accordion"} style={"primary"} onClick={handleEditClick}>Edit</Button>
          </>)
            
            
            }</td>
          </tr>)}
        
        </tbody>
      </table>
      <Pagination itemsPerPage={1} totalItems={userList.length} paginate={paginate}></Pagination>
      
      </div>
      <Button onClick={createUserNavigator}>Create A New User</Button>
      
      
      </>)

}

export default ProfileList