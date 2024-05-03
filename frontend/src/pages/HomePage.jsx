import Banner from "../components/Home/Banner";
import BestAgent from "../components/Home/BestAgent";
import MostLiked from "../components/Home/MostLiked";
import MostViewed from "../components/Home/MostViewed";
import Divider from "../components/UI/Divider";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Divider size="small" />
      <MostViewed />
      <MostLiked />
      <BestAgent />
    </>
  );
};

export default HomePage;
