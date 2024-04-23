import Banner from "../components/Home/Banner";
import BestAgent from "../components/Home/BestAgent";
import HotLocation from "../components/Home/HotLocation";
import NewProject from "../components/Home/NewProject";
import Divider from "../components/UI/Divider";

const Home = () => {
  return (
    <>
      <Banner />
      <Divider size="small" />
      <NewProject />
      <HotLocation />
      <BestAgent />
    </>
  );
};

export default Home;
