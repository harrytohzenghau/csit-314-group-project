import { useEffect, useState } from "react";
import SearchBar from "../Home/SearchBar";
import classes from "./Property.module.css";
import PropertyCard from "./PropertyCard";
import Divider from "../UI/Divider";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [saved, setSaved] = useState([]);
  const [liked, setLiked] = useState([]);

  const [searchParams] = useSearchParams();
  const propertyName = searchParams.get("property_name");
  const propertyType = searchParams.get("property_type");
  const propertyBedroom = searchParams.get("property_bedroom");
  const minPropertyPrice = searchParams.get("price_min");
  const maxPropertyPrice = searchParams.get("price_max");

  const [cookie] = useCookies();
  const id = cookie.id;
  const token = cookie.token;
  const user_type = cookie.user_type;

  useEffect(() => {
    const getSavedLikedProject = async () => {
      const response = await fetch(`http://localhost:3000/api/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        return toast.error("Something went wrong!");
      }

      const data = await response.json();
      setSaved(data.profile.user_favourites);
      setLiked(data.profile.user_likes);
    };

    if (user_type === "user") {
      getSavedLikedProject();
    }
  }, [user_type, id]);

  const likedHandler = async (id) => {
    if (!token) {
      return toast.error("Please login to perform this action.");
    }

    let likedProperty = {
      user_id: cookie.id,
      property_id: id,
    };

    if (liked.includes(id)) {
      likedProperty.like = false;
    } else {
      likedProperty.like = true;
    }

    const response = await fetch("http://localhost:3000/api/buy/like", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(likedProperty),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return toast.error("Something went wrong when liking property");
    }

    if (liked.includes(id)) {
      const newLiked = liked.filter((f) => f !== id);
      setLiked(newLiked);
      return toast.success("You unliked this property");
    } else {
      const newLiked = [...liked, id];
      setLiked(newLiked);
      return toast.success("You liked this property");
    }
  };

  const savedHandler = async (id) => {
    if (!token) {
      return toast.error("Please login to perform this action.");
    }

    let favouriteProperty = {
      user_id: cookie.id,
      property_id: id,
    };

    if (saved.includes(id)) {
      favouriteProperty.favourite = false;
    } else {
      favouriteProperty.favourite = true;
    }

    const response = await fetch("http://localhost:3000/api/buy/favourite", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(favouriteProperty),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return toast.error(
        "Something went wrong when adding property to saved listing"
      );
    }

    if (saved.includes(id)) {
      const newFavourites = saved.filter((f) => f !== id);
      setSaved(newFavourites);
      return toast.success("Property has been removed from favourite list");
    } else {
      const newFavourites = [...saved, id];
      setSaved(newFavourites);
      return toast.success("Property has been added to favourite list");
    }
  };

  useEffect(() => {
    const getAllProject = async () => {
      if (
        propertyName == "" &&
        propertyType == "" &&
        propertyBedroom == "" &&
        minPropertyPrice == "" &&
        maxPropertyPrice == ""
      ) {
        const response = await fetch("http://localhost:3000/api/buy", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setProperties(data.properties);
      } else if (
        propertyName ||
        propertyType ||
        propertyBedroom ||
        minPropertyPrice ||
        maxPropertyPrice
      ) {
        const response = await fetch(
          `http://localhost:3000/api/buy?property_name=${propertyName}&property_type=${propertyType}&property_bedroom=${propertyBedroom}&price_min=${minPropertyPrice}&price_max=${maxPropertyPrice}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        setProperties(data.properties);
      } else {
        const response = await fetch("http://localhost:3000/api/buy", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setProperties(data.properties);
      }
    };

    getAllProject();
  }, []);

  return (
    <>
      <SearchBar
        className={classes["search-bar-style"]}
        defaultText={propertyName}
      />
      <Divider size="small" />
      <div className={classes["property-card-wrapper"]}>
        {properties.map((p) => {
          let isSaved = saved.includes(p._id);
          let isLiked = liked.includes(p._id);
          return (
            <PropertyCard
              key={p._id}
              property={p}
              likeHandler={likedHandler}
              savedHandler={savedHandler}
              isLiked={isLiked}
              isSaved={isSaved}
            />
          );
        })}
      </div>
    </>
  );
};

export default Property;
