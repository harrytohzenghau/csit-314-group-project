import bannerImg from "../../assets/banner.jpeg";
import classes from "./Banner.module.css";
import SearchBar from "./SearchBar";

const Banner = () => {
  return (
    <div>
      <img src={bannerImg} className={classes.banner} alt="Hero Image" />
      <SearchBar />
    </div>
  );
};

export default Banner;
