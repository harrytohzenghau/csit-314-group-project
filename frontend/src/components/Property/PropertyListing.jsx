import DataTable from "react-data-table-component";
import Card from "../UI/Card";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import classes from "./PropertyListing.module.css";
import { getToken } from "../../util/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const [allProperties, setAllProperties] = useState([]);

  const navigate = useNavigate();

  const editPropertyHandler = async (id) => {
    navigate(`/property/edit/${id}`);
  };

  const deletePropertyHandler = async (id) => {
    const response = await fetch("http://localhost:3000/api/property", {
      method: "DELETE",
      headers: {
        Authorization: getToken(),
        "Content-type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });

    if (!response.ok) {
      toast.error("Something went wrong. Please try again");
      return;
    }

    toast.success("Property has been deleted successfully");

    const newAllProperties = [...allProperties];

    const filteredAllProperties = newAllProperties.filter(
      (user) => user._id !== id
    );

    setAllProperties(filteredAllProperties);
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
      name: "Location",
      selector: (row) => row.listing_propertySchema.property_location,
      sortable: true,
    },
    {
      name: "Property Type",
      selector: (row) => row.listing_propertySchema.property_type,
      sortable: true,
    },
    {
      name: "Build Year",
      selector: (row) => row.listing_propertySchema.property_build_year,
      sortable: true,
    },
    {
      name: "Total Views",
      selector: (row) => row.listing_views,
      sortable: true,
    },
    {
      name: "Shortlist Count",
      selector: (row) => row.listing_shortlists,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => {
        const date = new Date(row.listing_date);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      },
      sortable: true,
    },
    // {
    //   name: "Email",
    //   selector: (row) => row.user_details.email_address,
    //   sortable: true,
    //   width: "20rem",
    // },
    // // {
    // //   name: "Account Type",
    // //   selector: (row) => {
    // //     if (row.user_admin) {
    // //       return "Admin";
    // //     } else if (row.user_agent) {
    // //       return "Agent";
    // //     } else {
    // //       return "User";
    // //     }
    // //   },
    // //   sortable: true,
    // // },
    // {
    //   name: "Status",
    //   selector: (row) => {
    //     if (row.user_active) {
    //       return "Active";
    //     } else {
    //       return "Inactive";
    //     }
    //   },
    //   sortable: true,
    // },
    // {
    //   name: "Created At",
    //   selector: (row) => {
    //     const date = new Date(row.user_created);

    //     const day = date.getDate();
    //     const month = date.getMonth() + 1;
    //     const year = date.getFullYear();

    //     return `${day}/${month}/${year}`;
    //   },
    //   sortable: true,
    // },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className={classes["user-list-action-button"]}>
            <Button
              type="button"
              style="underline"
              onClick={() => editPropertyHandler(row._id)}
            >
              Edit
            </Button>
            <Button
              type="button"
              style="primary"
              onClick={() => deletePropertyHandler(row._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
      width: "20rem",
    },
  ];

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getAllUser() {
      const response = await fetch("http://localhost:3000/api/property", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      console.log(data);
      setAllProperties(data.allProperties);
    }

    getAllUser();
  }, [token]);

  return (
    <Card className={classes["user-list-wrapper"]}>
      <div>
        <Button
          style="primary"
          onClick={() => {
            navigate("/property/create");
          }}
        >
          Create Property
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={allProperties}
        customStyles={customStyles}
      ></DataTable>
    </Card>
  );
};

export default PropertyList;
