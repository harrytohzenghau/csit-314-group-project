import { useState, useEffect } from "react";
import classes from "./Property.module.css";
import PropertyCard from "./PropertyCard";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

const SavedListing = () => {
  const [savedProperties, setSavedProperties] = useState([]);

  const [cookie] = useCookies();
  const token = cookie.token;

  const savedHandler = (id) => {
    if (!token) {
      return toast.error("Please login to perform this action.");
    }

    let newSavedPropertiese = [...savedProperties];
    const updatedSavedProperties = newSavedPropertiese.filter(
      (p) => p._id !== id
    );

    setSavedProperties(updatedSavedProperties);
    toast.success("Property has been removed from saved list successfully.");
  };

  useEffect(() => {
    const getSavedProject = async () => {
      const response = await fetch("http://localhost:3000/api/buy", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setSavedProperties(data.properties);
    };

    getSavedProject();
  }, []);

  return (
    <>
      <div className={classes["property-card-wrapper"]}>
        {savedProperties.map((p) => {
          return (
            <PropertyCard
              key={p._id}
              property={p}
              savedHandler={savedHandler}
              isSaved={true}
            />
          );
        })}
      </div>
    </>
  );
};

export default SavedListing;
