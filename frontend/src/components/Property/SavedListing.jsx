import { useState, useEffect, useCallback } from "react";
import classes from "./Property.module.css";
import PropertyCard from "./PropertyCard";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import Card from "../UI/Card";

const SavedListing = () => {
  const [liked, setLiked] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);

  const [cookie] = useCookies();
  const id = cookie.id;
  const token = cookie.token;

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
      favourite: false,
    };

    const response = await fetch("http://localhost:3000/api/buy/favourite", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(favouriteProperty),
    });

    const data = await response.json();

    if (!response.ok) {
      return toast.error(
        "Something went wrong when adding property to saved listing"
      );
    }

    const newSavedProperties = savedProperties.filter((p) => p._id !== id);
    setSavedProperties(newSavedProperties);

    return toast.success("Property has been removed from favourite list");
  };

  const getSavedPropertyId = useCallback(async () => {
    const response = await fetch(`http://localhost:3000/api/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    setLiked(data.profile.user_likes);
    const propertiesId = data.profile.user_favourites;

    let updatedSavedProperties = [];
    for (let i = 0; i < propertiesId.length; i++) {
      const response = await fetch(
        `http://localhost:3000/api/buy/${propertiesId[i]}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.property) {
        if (
          savedProperties.findIndex((p) => p._id === data.property._id) === -1
        ) {
          updatedSavedProperties.push(data.property);
        }
      }
    }
    setSavedProperties(updatedSavedProperties);
  }, [id]);

  useEffect(() => {
    getSavedPropertyId();
  }, [getSavedPropertyId]);

  return (
    <>
      <div className={classes["property-card-wrapper"]}>
        {savedProperties.length === 0 ? (
          <Card className={classes["card-style"]}>
            <h1>No properties saved</h1>
          </Card>
        ) : (
          savedProperties.map((p) => {
            const isLiked = liked.includes(p._id);
            return (
              <PropertyCard
                key={p._id}
                property={p}
                savedHandler={savedHandler}
                likeHandler={likedHandler}
                isSaved={true}
                isLiked={isLiked}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default SavedListing;
