import { useEffect, useState } from "react"
import Button from "../components/UI/Button"
import Pagination from "../components/Home/Pagination"


const ProfilePage = () => {
  const[currentPage, setCurrentPage] = useState(1)
  const[usersPerPage, setUsersPerPage] = useState(1)

  const profile = {
    username: "sysadmin1",
    fname: "Admin1",
    lname: "System",
    email: "sysadmin1@gmail.com"
  }
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

  return (
    <>
    <div style={{paddingTop: "3rem"}}>
    <h1>Profile</h1>
      {Object.keys(profile).map(key=><h3>{key}: {profile[key]}</h3>)}


    </div>
      
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
          <td>{user.personal_first_name}</td>
          <td>{user.personal_last_name}</td>
          <td>{user.personal_mobile_number}</td>
          <td><Button className={"accordion"} style={"primary"}>Edit</Button></td>
          </tr>)}
        

        </tbody>
      </table>
      </div>
      
    </>
  )
}

export default ProfilePage