import bannerImg from "../../assets/banner.jpg";
import classes from "./Banner.module.css";
import SearchBar from "./SearchBar";

const Banner = () => {
  return (
    <div className={classes.banner}>
      {/* <img src={bannerImg} className={classes.banner} alt="Hero Image" /> */}
      <SearchBar className="home"/>
    </div>
  );
};

export default Banner;
