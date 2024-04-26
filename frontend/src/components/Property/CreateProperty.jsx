import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateProperty = () => {
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

  const [type, setType] = useState("");
  const [newProject, setNewProject] = useState("");
  const [numberBedrooms, setNumberBedrooms] = useState(1);
  const [tenure, setTenure] = useState("");
  const [floorLevel, setFloorLevel] = useState("");
  const [furnishing, setFurnishing] = useState("");
  // const [liveTour, setLiveTour] = useState("");
  // const [virtualTour, setVirtualTour] = useState("");
  const [numberBathrooms, setNumberBathrooms] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [keyword, setKeyword] = useState([]);
  const [image, setImage] = useState([]);
  const [agent, setAgent] = useState([]);

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function getAgent() {
      const response = await fetch("http://localhost:3000/api/admin", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      const agentOnly = data.allUsers.filter((user) => user.user_agent);

      for (let i = 0; i < agentOnly.length; i++) {
        const agent = agentOnly[i];
        if (!agents.includes(agent.user_details.username)) {
          const newAgents = [...agents, agent.user_details.username];
          setAgents(newAgents);
        }
      }
    }

    if (user_type === "admin") {
      getAgent();
    }
  });

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

  // const handleLiveTourOption = (value) => {
  //   setLiveTour(value);
  // };

  // const handleVirtualTourOption = (value) => {
  //   setVirtualTour(value);
  // };

  const handleYearOption = (value) => {
    setSelectedYear(value);
  };

  const handleAgentOption = (value) => {
    setAgent(value);
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

  const addImageHandler = (encodedImage, removeEncodedImage) => {
    if (image.includes(encodedImage)) {
      return toast.error("This image has been added.");
    }

    const newImages = [...image, encodedImage];
    setImage(newImages);
    removeEncodedImage("");
    toast.success("Image has been uploaded successfully.");
  };

  const removeImageHandler = (encodedStr) => {
    const newImages = image.filter((encoded) => encoded !== encodedStr);
    setImage(newImages);
    toast.success("Image has been removed successfully.");
  };

  const propertyListPageNavigator = () => {
    if (user_type === "admin") {
      navigate("/property/list");
    } else {
      navigate("/agent/property-list");
    }
  };

  const createPropertySubmitHandler = async (e) => {
    e.preventDefault();

    const property = {
      property_propertySchema: {
        property_location: locationRef.current.value,
        property_type: type,
        property_new_project: newProject === "Yes" ? true : false,
        property_price: parseInt(priceRef.current.value),
        property_bedroom: parseInt(numberBedrooms),
        property_floor_size: parseInt(floorSizeRef.current.value),
        property_PSF: parseInt(PSFRef.current.value),
        property_bathroom: parseInt(numberBathrooms),
        property_tenure: tenure,
        property_build_year: parseInt(selectedYear),
        property_floor_level: floorLevel,
        property_furnishing: furnishing,
        property_keyword: keyword,
        // property_listing_live_tour: liveTour === "Yes" ? true : false,
        // property_listing_virtual_tour: virtualTour === "Yes" ? true : false,
      },
      property_name: nameRef.current.value,
      property_images: image,
    };

    console.log(property);
    try {
      const response = await fetch(
        `http://localhost:3000/api/agent/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(property),
        }
      );

      if (!response.ok) {
        return toast.error("Something went wrong while creating property");
      }

      toast.success("Property created successfully.");
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
      onSubmit={createPropertySubmitHandler}
    >
      <Card className={classes["card-style"]}>
        <h2>Create Property</h2>
        <div className={classes["create-property-input-wrapper"]}>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Dropdown
              title="Type of property"
              options={["Landed", "Condo", "HDB"]}
              selectedHandler={handleTypeOption}
            />
            <Dropdown
              title="New Project"
              options={["Yes", "No"]}
              selectedHandler={handleProjectOption}
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Dropdown
              title="Number of Bedrooms"
              options={[1, 2, 3, 4, 5]}
              selectedHandler={handleBedroomOption}
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
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Dropdown
              title="Floor Level"
              options={["Ground", "Low", "Mid", "High", "Penthouse"]}
              selectedHandler={handleFloorLevelOption}
            />
            <Dropdown
              title="Furnishing"
              options={[
                "Unfurnished",
                "Partially Furnished",
                "Fully Furnished",
              ]}
              selectedHandler={handleFurnishingOption}
            />
          </div>
          {/* <div className={classes["create-property-input-row-wrapper"]}>
            <Dropdown
              title="Live Tour"
              options={["Yes", "No"]}
              selectedHandler={handleLiveTourOption}
            />
            <Dropdown
              title="Virtual Tour"
              options={["Yes", "No"]}
              selectedHandler={handleVirtualTourOption}
            />
          </div> */}
          <div className={classes["create-property-input-row-wrapper"]}>
            <Dropdown
              title="Number of Bathrooms"
              options={[1, 2, 3, 4, 5]}
              selectedHandler={setNumberBathrooms}
            />
            <YearPicker
              selectedYear={selectedYear}
              selectedHandler={handleYearOption}
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            {user_type === "admin" && (
              <Dropdown
                title="Agent"
                options={agents}
                selectedHandler={handleAgentOption}
              />
            )}
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={nameRef}
              required={true}
              name="name"
              type="text"
              label="Property name"
              className={classes["input-style"]}
            />
            <Input
              ref={locationRef}
              required={true}
              name="location"
              type="text"
              label="Location"
              className={classes["input-style"]}
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
            />
            <Input
              ref={floorSizeRef}
              required={true}
              name="floorSize"
              type="number"
              label="Floor Size"
              min={1}
              className={classes["input-style"]}
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
            />

            <div></div>
          </div>
          <div>
            <ImageUploader imageUploadHandler={addImageHandler} />
            {image.length > 0 && (
              <div
                className={
                  classes["create-property-uploaded-image-preview-wrapper"]
                }
              >
                <h5>Uploaded image</h5>
                <div
                  className={classes["create-property-uploaded-image-preview"]}
                >
                  {image.map((img) => (
                    <div
                      key={img}
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
                        <img src={img} />
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
              Create
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

export default CreateProperty;
