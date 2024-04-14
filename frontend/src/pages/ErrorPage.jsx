import Footer from "../components/Layout/Footer";
import MainNavigation from "../components/Layout/MainNavigation";
import Card from "../components/UI/Card";

function ErrorPage() {
  const style = {
    width: "50%",
    margin: "0 auto",
    textAlign: "center",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <>
      <MainNavigation />
      <main>
        <div style={style}>
          <Card>
            <h1>An error occurred!</h1>
            <h4>Could not find this page!</h4>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ErrorPage;
