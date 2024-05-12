import DataTable from "react-data-table-component";
import Card from "../../UI/Card";
import { useEffect, useState } from "react";
import Button from "../../UI/Button";
import classes from "./UserList.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UserList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [cookie] = useCookies();
  const token = cookie.token;

  const navigate = useNavigate();

  const editUserHandler = async (id) => {
    navigate(`/admin/edit-user/${id}`);
  };

  const banUserHandler = async (id) => {
    const banUser = allUsers.find((user) => user._id === id);

    if (!banUser) {
      toast.error("Couldn't find the user. Please try again.");
      return;
    }

    const response = await fetch(`http://localhost:3000/api/admin`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_details: {
          username: banUser.user_details.username,
        },
        user_active: !banUser.user_active,
        user_admin: banUser.user_admin,
        user_agent: banUser.user_agent,
      }),
    });

    if (!response.ok) {
      toast.error("Something went wrong. Please try again");
      return;
    }

    if (banUser.user_active) {
      toast.success("User has been banned successfully");
    } else {
      toast.success("User has been activated successfully");
    }

    const banUserIndex = allUsers.findIndex((user) => user._id === id);

    const newBanUser = { ...banUser, user_active: !banUser.user_active };

    const newAllUsers = [...allUsers];

    newAllUsers[banUserIndex] = newBanUser;

    setAllUsers(newAllUsers);
  };

  const deleteUserHandler = async (id) => {
    const userData_response = await fetch(
      `http://localhost:3000/api/profile/${id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const userData = await userData_response.json();
    
    const response = await fetch(`http://localhost:3000/api/admin`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: userData.profile._id,
        "user_agent": userData.profile.user_agent,
      }),
    });

    if (!response.ok) {
      toast.error("Something went wrong. Please try again");
      return;
    }

    toast.success("User has been deleted successfully");

    const newAllUsers = [...allUsers];

    const filteredAllUsers = newAllUsers.filter((user) => user._id !== id);

    setAllUsers(filteredAllUsers);
  };

  const customStyles = {
    table: {
      style: {
        fontFamily: "Inter, sans-serif",
        fontSize: "1.2rem",
      },
    },
    headCells: {
      style: {
        padding: "0 0.8rem",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        padding: "0 0.8rem",
      },
    },
  };

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "7rem",
    },
    {
      name: "Username",
      selector: (row) => row.user_details.username,
      sortable: true,
      width: "15rem",
    },
    {
      name: "First Name",
      selector: (row) => row.user_details.first_name,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Last Name",
      selector: (row) => row.user_details.last_name,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Email",
      selector: (row) => row.user_details.email_address,
      sortable: true,
      width: "20rem",
    },
    // {
    //   name: "Account Type",
    //   selector: (row) => {
    //     if (row.user_admin) {
    //       return "Admin";
    //     } else if (row.user_agent) {
    //       return "Agent";
    //     } else {
    //       return "User";
    //     }
    //   },
    //   sortable: true,
    // },
    {
      name: "Status",
      selector: (row) => {
        if (row.user_active) {
          return "Active";
        } else {
          return "Inactive";
        }
      },
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => {
        const date = new Date(row.user_created);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      },
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className={classes["user-list-action-button"]}>
            <Button
              type="button"
              style="underline"
              onClick={() => editUserHandler(row._id)}
            >
              Edit
            </Button>
            <Button
              type="button"
              style="secondary"
              onClick={() => banUserHandler(row._id)}
            >
              {row.user_active ? "Ban" : "Activate"}
            </Button>
            <Button
              type="button"
              style="primary"
              onClick={() => deleteUserHandler(row._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
      width: "25rem",
    },
  ];

  useEffect(() => {
    async function getAllUser() {
      const response = await fetch("http://localhost:3000/api/admin", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();

      const userOnly = data.allUsers.filter(
        (user) => !user.user_admin && !user.user_agent
      );
      setAllUsers(userOnly);
    }

    getAllUser();
  }, [token]);

  return (
    <Card className={classes["user-list-wrapper"]}>
      <div>
        <Button
          style="primary"
          onClick={() => {
            navigate("/admin/create-user");
          }}
        >
          Create User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={allUsers}
        customStyles={customStyles}
      ></DataTable>
    </Card>
  );
};

export default UserList;
