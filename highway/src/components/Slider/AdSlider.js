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
    beforeChange: (current, next) => {
      const slides = document.querySelectorAll(".slick-slide");
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[next].classList.add("active");
    },
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="slide-item">
          <div className="content">Slide 1</div>
        </div>
        <div className="slide-item">
          <div className="content">Slide 2</div>
        </div>
        <div className="slide-item">
          <div className="content">Slide 3</div>
        </div>
        <div className="slide-item">
          <div className="content">Slide 4</div>
        </div>
        <div className="slide-item">
          <div className="content">Slide 5</div>
        </div>
      </Slider>
    </div>
  );
}

export default AdSlider;
