import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AdSlider.css";

function AdSlider() {
  const settings = {
    centerMode: true,
    centerPadding: 0,
    arrows: false,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20%",
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Slider>
    </div>
  );
}

export default AdSlider;
