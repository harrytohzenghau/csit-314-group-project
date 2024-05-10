import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ImageCarousel = ({ images }) => {
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />, // Custom previous arrow component
    nextArrow: <CustomNextArrow />, // Custom next arrow component
  };

  return (
    <div className="image-carousel-wrapper">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="image-carousel-image-wrapper">
            <img
              src={`http://localhost:3000/${image}`}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
