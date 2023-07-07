import { Button, Col, Empty, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import {
  SchoolDetailWrapper,
  SchoolImg,
  SchoolInfo,
  SchoolLogo,
} from "../components/SchoolDetail/SchoolDetailStyle";
import { SubWrapper } from "../styles/PageStyle";
import { useDispatch, useSelector } from "react-redux";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import DepartsTags from "../components/DepartsTags";
import SchoolDetailInfo from "../components/SchoolDetail/SchoolDetailInfo";
import { LOAD_SCHOOL_INFO_REQUEST, LOAD_SCHOOL_REVIEWS_REQUEST } from "../constants/actionTypes";
import axios from "axios";

const SchoolDetail = () => {
  const { schoolId } = useParams();
  const accessToken = localStorage.getItem("ACCESSTOKEN");
  const { schools, schoolReviews } = useSelector((state) => state.school);
  // console.log(school[schoolId - 1]);
  const dispatch = useDispatch();
  const loadSchoolReviews = () => {
    axios.defaults.headers.common["ACCESS_TOKEN"] = accessToken;
    dispatch({
      type: LOAD_SCHOOL_REVIEWS_REQUEST,
      data: {
        schoolId: schoolId,
      },
    });
  };

  useEffect(() => {
    loadSchoolReviews();
  }, []);

  useEffect(() => {
    const filteredReviews = schoolReviews.filter((item) => !item.deleted);
    const reviewCount = filteredReviews.length;
    setReviewCount(reviewCount);

    const rateSums = {
      traffic: 0,
      facility: 0,
      cafeteria: 0,
      education: 0,
      employment: 0,
    };

    for (let i = 0; i < reviewCount; i++) {
      const { trafficRate, facilityRate, cafeteriaRate, educationRate, employmentRate } =
        schoolReviews[i];

      rateSums.traffic += trafficRate;
      rateSums.facility += facilityRate;
      rateSums.cafeteria += cafeteriaRate;
      rateSums.education += educationRate;
      rateSums.employment += employmentRate;
    }

    const rateAverages = {
      traffic: rateSums.traffic / reviewCount,
      facility: rateSums.facility / reviewCount,
      cafeteria: rateSums.cafeteria / reviewCount,
      education: rateSums.education / reviewCount,
      employment: rateSums.employment / reviewCount,
    };

    const totalRate =
      (rateAverages.traffic +
        rateAverages.facility +
        rateAverages.cafeteria +
        rateAverages.education +
        rateAverages.employment) /
      5;

    const roundedTotalRate = Math.round(totalRate * 2) / 2;

    // Update the average rating in the component's state
    setAverageRating(roundedTotalRate);
    setRateAverages(rateAverages);
  }, [schoolReviews]);

  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [rateAverages, setRateAverages] = useState({
    traffic: 0,
    facility: 0,
    cafeteria: 0,
    education: 0,
    employment: 0,
  });

  const school = schools[schoolId - 1];

  return (
    <div>
      <SchoolDetailWrapper>
        <SchoolImg>
          {/* <Empty
            imageStyle={{
              height: 60,
            }}
            description={<span>학교 배경이미지를 설정해주세요</span>}
          >
            <Button type="primary">배경 이미지 추가하기</Button>
          </Empty> */}
          {school.logoURL !== null ? (
            <SchoolLogo>
              <img
                src={school.logoURL}
                alt="학교로고"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </SchoolLogo>
          ) : (
            <SchoolLogo>
              <p>Logo</p>
            </SchoolLogo>
          )}
        </SchoolImg>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={22} md={15}>
            <SchoolInfo>
              <h2 style={{ margin: "0" }}>{school.schul_NM}</h2>
              <div>
                {averageRating == 0 ? (
                  <StarOutlined />
                ) : (
                  <>
                    <StarFilled style={{ color: "#FFDC82" }} />
                    <span style={{ marginRight: "10px" }}>{averageRating}</span>
                  </>
                )}

                <DepartsTags schoolInfo={school} />
                <a style={{ color: "black", textDecoration: "none" }} href={school.hmpg_ADRES}>
                  {school.hmpg_ADRES}
                </a>
              </div>
            </SchoolInfo>
          </Col>
        </Row>

        <SubWrapper>
          <SchoolDetailInfo
            reviewCount={reviewCount}
            rateAverages={rateAverages}
            roundedTotalRate={averageRating}
          />
        </SubWrapper>
      </SchoolDetailWrapper>
    </div>
  );
};

export default SchoolDetail;
