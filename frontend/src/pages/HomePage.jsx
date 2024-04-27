import Banner from "../components/Home/Banner";
import BestAgent from "../components/Home/BestAgent";
import MostSaved from "../components/Home/MostSaved";
import MostViewed from "../components/Home/MostViewed";
import Divider from "../components/UI/Divider";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Divider size="small" />
      <MostViewed />
      <MostSaved />
      <BestAgent />
    </>
  );
};

export default HomePage;
