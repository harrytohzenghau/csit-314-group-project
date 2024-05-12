import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./CreateProperty.module.css";
import { toast } from "react-hot-toast";
import Dropdown from "../UI/Dropdown";
import YearPicker from "../UI/YearPicker";
import { RiCloseCircleFill } from "react-icons/ri";
import ImageUploader from "../UI/ImageUploader";
import { useCookies } from "react-cookie";
import SpecialDropdown from "../UI/SpecialDropdown";

const EditProperty = () => {
  const { id } = useParams();
  const nameRef = useRef();
  const locationRef = useRef();
  const priceRef = useRef();
  const floorSizeRef = useRef();
  const PSFRef = useRef();
  const keywordRef = useRef();

  const [cookie] = useCookies();

  const token = cookie.token;
  const userId = cookie.id;

  const navigate = useNavigate();
  const user_type = cookie.user_type;

  const [property, setProperty] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    async function getProperty() {
      const response = await fetch(`http://localhost:3000/api/buy/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      setProperty(data.property);
      let imagesData = [];

      if (Array.isArray(data.property.property_images)) {
        for (let i = 0; i < data.property.property_images.length; i++) {
          imagesData.push(data.property.property_images[i]);
        }
      } else {
        imagesData.push(data.property.property_images);
      }

      setImage(imagesData);
      if (data.property.property_propertySchema.property_keyword[0] !== "") {
        setKeyword(data.property.property_propertySchema.property_keyword);
      } else {
        setKeyword([]);
      }

      const agent_response = await fetch(
        `http://localhost:3000/api/agent/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const agent_data = await agent_response.json();
      const usersOnly = agent_data.allUsers.filter(
        (user) => !user.user_agent && !user.user_admin
      );

      for (let i = 0; i < usersOnly.length; i++) {
        const u = usersOnly[i];
        if (u._id === data.property.property_userSchema) {
          if (typeof u === "object") {
            setUser(u.user_details.username);
          }
        }
      }
    }

    getProperty();
  }, [id, userId, token]);

  const [type, setType] = useState("");
  const [newProject, setNewProject] = useState("");
  const [numberBedrooms, setNumberBedrooms] = useState(1);
  const [tenure, setTenure] = useState("");
  const [floorLevel, setFloorLevel] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [numberBathrooms, setNumberBathrooms] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [keyword, setKeyword] = useState([]);
  const [image, setImage] = useState([]);
  const [newImage, setNewImage] = useState([]);

  const handleTypeOption = (value) => {
    setType(value);
  };

  const handleProjectOption = (value) => {
    setNewProject(value);
  };

  const handleBedroomOption = (value) => {
    setNumberBedrooms(value);
  };

  const handleTenureOption = (value) => {
    setTenure(value);
  };

  const handleFloorLevelOption = (value) => {
    setFloorLevel(value);
  };

  const handleFurnishingOption = (value) => {
    setFurnishing(value);
  };

  const handleYearOption = (value) => {
    setSelectedYear(value);
  };

  const handleUserOption = (value) => {
    // setUser(value);
  };

  const addKeywordHandler = () => {
    if (!keywordRef.current.value) {
      return toast.error("Please enter a keyword.");
    }

    if (keyword.includes(keywordRef.current.value)) {
      return toast.error("This keyword has been added.");
    }

    const newKeywords = [...keyword, keywordRef.current.value];
    setKeyword(newKeywords);
    keywordRef.current.value = "";
    toast.success("Keyword has been added successfully.");
  };

  const removeKeywordHandler = (k) => {
    const newKeywords = keyword.filter((key) => key !== k);
    setKeyword(newKeywords);
    toast.success("Keyword has been removed successfully.");
  };

  const addImageHandler = (imageFile, previewUrl, removeImage) => {
    const existingImage = image.find((img) => img.previewUrl === previewUrl);

    if (existingImage) {
      return toast.error("This image has already been added.");
    }

    const imageData = {
      imageFile,
      previewUrl,
    };

    const newImages = [...newImage, imageData];
    setNewImage(newImages);
    removeImage("");
    toast.success("Image has been uploaded successfully.");
  };

  const removeImageHandler = (encodedStr) => {
    const newImages = image.filter((encoded) => encoded !== encodedStr);
    setImage(newImages);
    toast.success("Image has been removed successfully.");
  };

  const removeNewImageHandler = (index) => {
    const newUploadImage = [...newImage];
    newUploadImage.splice(index, 1);
    setNewImage(newUploadImage);
    toast.success("Image has been removed successfully.");
  };

  const propertyListPageNavigator = () => {
    if (user_type === "admin") {
      navigate("/property/list");
    } else {
      navigate("/agent/property-list");
    }
  };

  const updatePropertySubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append form fields
    formData.append("property_location", locationRef.current.value);
    formData.append("property_type", type);
    formData.append(
      "property_new_project",
      newProject === "Yes" ? true : false
    );
    formData.append("property_price", parseInt(priceRef.current.value));
    formData.append("property_bedroom", parseInt(numberBedrooms));
    formData.append(
      "property_floor_size",
      parseInt(floorSizeRef.current.value)
    );
    formData.append("property_PSF", parseInt(PSFRef.current.value));
    formData.append("property_bathroom", parseInt(numberBathrooms));
    formData.append("property_tenure", tenure);
    formData.append("property_build_year", parseInt(selectedYear));
    formData.append("property_floor_level", floorLevel);
    formData.append("property_furnishing", furnishing);
    formData.append("property_name", nameRef.current.value);
    formData.append("property_existing_images", [...image]);

    for (let i = 0; i < keyword.length; i++) {
      formData.append("property_keyword", keyword[i]);
    }

    for (let i = 0; i < newImage.length; i++) {
      const imgFile = newImage[i].imageFile;
      formData.append("property_images", imgFile); // Append each file object
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/agent/${property._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        return toast.error("Something went wrong when updating property");
      }

      toast.success("Property has been updated successfully!");

      if (user_type === "admin") {
        navigate("/property/list");
      } else {
        navigate("/agent/property-list");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={classes["create-property-card-wrapper"]}
      onSubmit={updatePropertySubmitHandler}
    >
      <Card className={classes["card-style"]}>
        <h2>Edit Property</h2>
        <div className={classes["create-property-input-wrapper"]}>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Dropdown
              title="Type of property"
              options={["Landed", "Condo", "HDB"]}
              selectedHandler={handleTypeOption}
              defaultValue={
                property && property.property_propertySchema.property_type
              }
            />
            <Dropdown
              title="New Project"
              options={["Yes", "No"]}
              selectedHandler={handleProjectOption}
              defaultValue={
                property &&
                property.property_propertySchema.property_new_project
                  ? "Yes"
                  : "No"
              }
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Dropdown
              title="Number of Bedrooms"
              options={[1, 2, 3, 4, 5]}
              selectedHandler={handleBedroomOption}
              defaultValue={
                property && property.property_propertySchema.property_bedroom
              }
            />
            <Dropdown
              title="Tenure"
              options={[
                "Freehold",
                "99-year LeaseHold",
                "103-year LeaseHold",
                "110-year LeaseHold",
                "999-year LeaseHold",
                "9999-year LeaseHold",
                "Unkown Tenure",
              ]}
              selectedHandler={handleTenureOption}
              defaultValue={
                property && property.property_propertySchema.property_tenure
              }
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Dropdown
              title="Floor Level"
              options={["Ground", "Low", "Mid", "High", "Penthouse"]}
              selectedHandler={handleFloorLevelOption}
              defaultValue={
                property &&
                property.property_propertySchema.property_floor_level
              }
            />
            <Dropdown
              title="Furnishing"
              options={[
                "Unfurnished",
                "Partially Furnished",
                "Fully Furnished",
              ]}
              selectedHandler={handleFurnishingOption}
              defaultValue={
                property && property.property_propertySchema.property_furnishing
              }
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Dropdown
              title="Number of Bathrooms"
              options={[1, 2, 3, 4, 5]}
              selectedHandler={setNumberBathrooms}
              defaultValue={
                property && property.property_propertySchema.property_bathroom
              }
            />
            <YearPicker
              selectedYear={
                selectedYear ||
                (property &&
                  property.property_propertySchema.property_build_year)
              }
              selectedHandler={handleYearOption}
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <SpecialDropdown
              title="Customer"
              value={[user]}
              options={[user]}
              selectedHandler={handleUserOption}
              disabled
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={nameRef}
              required={true}
              name="name"
              type="text"
              label="Property name"
              className={classes["input-style"]}
              defaultValue={property && property.property_name}
            />
            <Input
              ref={locationRef}
              required={true}
              name="location"
              type="text"
              label="Location"
              className={classes["input-style"]}
              defaultValue={
                property && property.property_propertySchema.property_location
              }
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={priceRef}
              required={true}
              name="price"
              type="number"
              label="Price"
              className={classes["input-style"]}
              defaultValue={
                property && property.property_propertySchema.property_price
              }
            />
            <Input
              ref={floorSizeRef}
              required={true}
              name="floorSize"
              type="number"
              label="Floor Size"
              min={1}
              className={classes["input-style"]}
              defaultValue={
                property && property.property_propertySchema.property_floor_size
              }
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={PSFRef}
              required={true}
              name="PSF"
              type="number"
              label="PSF"
              min={1}
              className={classes["input-style"]}
              defaultValue={
                property && property.property_propertySchema.property_PSF
              }
            />
            <div></div>
          </div>
          <div>
            <ImageUploader imageUploadHandler={addImageHandler} />
            {(image.length > 0 || newImage.length > 0) && (
              <div
                className={
                  classes["create-property-uploaded-image-preview-wrapper"]
                }
              >
                <h5>Uploaded image</h5>
                <div
                  className={classes["create-property-uploaded-image-preview"]}
                >
                  {image.map((img, index) => (
                    <div
                      key={index}
                      className={
                        classes["create-property-uploaded-image-preview-button"]
                      }
                    >
                      <Button
                        type="button"
                        onClick={() => removeImageHandler(img)}
                        className={classes["create-property-keyword-button"]}
                      >
                        <RiCloseCircleFill
                          className={classes["create-property-close-button"]}
                        />
                        <img src={`http://localhost:3000/${img}`} />
                      </Button>
                    </div>
                  ))}
                  {newImage.length > 0 &&
                    newImage.map((img, index) => (
                      <div
                        key={index}
                        className={
                          classes[
                            "create-property-uploaded-image-preview-button"
                          ]
                        }
                      >
                        <Button
                          type="button"
                          onClick={() => removeNewImageHandler(index)}
                          className={classes["create-property-keyword-button"]}
                        >
                          <RiCloseCircleFill
                            className={classes["create-property-close-button"]}
                          />
                          <img src={img.previewUrl} />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className={classes["create-property-keyword-input-wrapper"]}>
              <Input
                ref={keywordRef}
                name="keyword"
                type="text"
                label="Keyword"
                className={classes["input-style"]}
              />
              <Button
                type="button"
                style="primary"
                onClick={addKeywordHandler}
                className={classes["create-property-keyword-input-button"]}
              >
                Add
              </Button>
            </div>
          </div>
          <div className={classes["create-property-keyword-wrapper"]}>
            {keyword &&
              keyword.map((k) => (
                <Button
                  type="button"
                  key={k}
                  onClick={() => removeKeywordHandler(k)}
                  className={classes["create-property-keyword-button"]}
                >
                  <RiCloseCircleFill /> {k}
                </Button>
              ))}
          </div>

          {/* <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={usernameRef}
              required={true}
              name="username"
              type="text"
              label="Username"
              className={classes["input-style"]}
            />
            <Input
              ref={emailRef}
              required={true}
              name="email"
              type="email"
              label="Email"
              className={classes["input-style"]}
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={mobileNumberRef}
              required={true}
              name="mobile"
              type="tel"
              label="Mobile number"
              className={classes["input-style"]}
            />
            <div></div>
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={passwordRef}
              required={true}
              name="password"
              type="password"
              label="Password"
              className={classes["input-style"]}
            />
            <Input
              ref={repeatPasswordRef}
              type="password"
              label="Repeat Password"
              className={classes["input-style"]}
            />
          </div>*/}
        </div>
        <div className={classes["create-property-button-wrapper"]}>
          <div className={classes["create-property-action-button"]}>
            <Button style="primary" type="submit">
              Update
            </Button>
            <Button
              style="secondary"
              type="button"
              onClick={propertyListPageNavigator}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default EditProperty;
