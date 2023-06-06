import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AdSlider.css";
import styled from "styled-components";
const SliderWrapper = styled.div`
  margin: 2px auto;
`;

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
    <SliderWrapper>
      <Slider {...settings}>
        <div>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "5px" }}
            src="https://picsum.photos/1200/320"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "5px" }}
            src="https://picsum.photos/120/320"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "5px" }}
            src="https://picsum.photos/100/320"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "5px" }}
            src="https://picsum.photos/101/320"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "5px" }}
            src="https://picsum.photos/111/320"
          />
        </div>
      </Slider>
    </SliderWrapper>
  );
}

export default AdSlider;
