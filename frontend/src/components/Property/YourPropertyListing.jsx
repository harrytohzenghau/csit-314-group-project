import DataTable from "react-data-table-component";
import Card from "../UI/Card";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import classes from "./PropertyListing.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const YourPropertyListing = () => {
  const [allProperties, setAllProperties] = useState([]);

  const navigate = useNavigate();

  const [cookie] = useCookies();
  const id = cookie.id;
  const token = cookie.token;
  const user_type = cookie.user_type;

  const viewPropertyHandler = (id) => {
    navigate(`/property/${id}`)
  }

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
      name: "Name",
      selector: (row) => row.property_name,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.property_propertySchema.property_location,
      sortable: true,
    },
    {
      name: "Property Type",
      selector: (row) => row.property_propertySchema.property_type,
      sortable: true,
    },
    {
      name: "Build Year",
      selector: (row) => row.property_propertySchema.property_build_year,
      sortable: true,
    },
    {
      name: "Total Views",
      selector: (row) => row.property_views,
      sortable: true,
    },
    {
      name: "Total Liked",
      selector: (row) => row.property_userLikes.length,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => {
        const date = new Date(row.property_date);

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
              style="primary"
              onClick={() => viewPropertyHandler(row._id)}
            >
              View Property
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    async function getAllProperties() {
      const response = await fetch(`http://localhost:3000/api/profile/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      setAllProperties(data.profile.user_agent_properties);
    }

    getAllProperties();
  }, [token, id]);

  return (
    <Card className={classes["user-list-wrapper"]}>
      <DataTable
        columns={columns}
        data={allProperties}
        customStyles={customStyles}
      ></DataTable>
    </Card>
  );
};

export default YourPropertyListing;
