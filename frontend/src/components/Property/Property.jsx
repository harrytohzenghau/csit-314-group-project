import { useEffect, useState } from "react";
import SearchBar from "../Home/SearchBar";
import classes from "./Property.module.css";
import PropertyCard from "./PropertyCard";
import Divider from "../UI/Divider";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [saved, setSaved] = useState([]);

  const [cookie] = useCookies();
  const token = cookie.token;

  const savedHandler = (id) => {
    if (!token) {
      return toast.error("Please login to perform this action.");
    }
    if (saved.includes(id)) {
      const newFavourites = saved.filter((f) => f !== id);
      setSaved(newFavourites);
      return toast.success("Property has been removed from favourite list");
    } else {
      const newFavourites = [...saved, id];
      setSaved(newFavourites);
      return toast.success("Property has been added from favourite list");
    }
  };

  useEffect(() => {
    const getAllProject = async () => {
      const response = await fetch("http://localhost:3000/api/buy", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setProperties(data.properties);
    };

    getAllProject();
  }, []);

  return (
    <>
      <SearchBar className={classes["search-bar-style"]} />
      <Divider size="small" />
      <div className={classes["property-card-wrapper"]}>
        {properties.map((p) => {
          let isSaved = saved.includes(p._id);
          return (
            <PropertyCard
              key={p._id}
              property={p}
              savedHandler={savedHandler}
              isSaved={isSaved}
            />
          );
        })}
      </div>
    </>
  );
};

export default Property;
