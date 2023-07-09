import { Button, Col, Empty, Menu, Row, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  SchoolDetailWrapper,
  SchoolImg,
  SchoolInfo,
  SchoolLogo,
} from "../components/SchoolDetail/SchoolDetailStyle";
import { SubWrapper } from "../styles/PageStyle";
import { useDispatch, useSelector } from "react-redux";
import { StarFilled, StarOutlined, TagsOutlined } from "@ant-design/icons";
import DepartsTags from "../components/DepartsTags";
import SchoolDetailInfo from "../components/SchoolDetail/SchoolDetailInfo";
import {
  ADD_SAVED_SCHOOL_REQUEST,
  LOAD_SAVED_SCHOOL_REQUEST,
  LOAD_SCHOOL_INFO_REQUEST,
  LOAD_SCHOOL_REVIEWS_REQUEST,
  REMOVE_SAVED_SCHOOL_REQUEST,
} from "../constants/actionTypes";
import axios from "axios";
import { needLoginError } from "../utils/Message";

const SchoolDetail = () => {
  const { schoolId } = useParams();
  const accessToken = localStorage.getItem("ACCESSTOKEN");
  const me = JSON.parse(localStorage.getItem("USERINFO"));
  const navigate = useNavigate();
  const {
    singleSchool,
    schoolReviews,
    followList,
    addSavedSchoolLoading,
    removeSaveSchoolLoading,
  } = useSelector((state) => state.school);
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    const followedSchool = followList.find((followed) => followed.schoolId === parseInt(schoolId));
    setIsFollowed(!!followedSchool);
  }, [followList]);
  useEffect(() => {
    if (!me) {
      setIsFollowed(false);
    }
  }, [me]);
  const loadSchoolReviews = () => {
    axios.defaults.headers.common["ACCESS_TOKEN"] = accessToken;
    dispatch({
      type: LOAD_SCHOOL_REVIEWS_REQUEST,
      data: {
        schoolId: schoolId,
      },
    });
  };
  const loadSchoolInfo = () => {
    const followedSchool = followList.find((followed) => followed.schoolId === parseInt(schoolId));
    setIsFollowed(!!followedSchool);
    dispatch({
      type: LOAD_SCHOOL_INFO_REQUEST,
      data: { schoolId: schoolId },
    });
  };

  const loadSavedSchool = () => {
    dispatch({
      type: LOAD_SAVED_SCHOOL_REQUEST,
    });
  };
  const addSavedSchool = () => {
    if (me) {
      dispatch({
        type: ADD_SAVED_SCHOOL_REQUEST,
        data: { schoolId: parseInt(schoolId) },
      });
    } else {
      needLoginError("로그인이 필요합니다", navigate);
    }
    setIsFollowed(true);
  };
  const removeSavedSchool = () => {
    dispatch({
      type: REMOVE_SAVED_SCHOOL_REQUEST,
      data: { heartId: heartId },
    });
    setIsFollowed(false);
  };

  const [heartId, setHeartId] = useState(); //학교 찜하기 시 id

  useEffect(() => {
    const followedSchool = followList.find((followed) => followed.schoolId === parseInt(schoolId)); //기존에 찜하기 했나 확인
    setHeartId(followedSchool ? followedSchool.heartId : null);
  }, [followList, heartId, schoolId]);

  useEffect(() => {
    loadSchoolInfo();
    loadSchoolReviews();
    loadSavedSchool();
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
          {singleSchool?.sch?.logoURL !== null ? (
            <SchoolLogo>
              <img
                src={singleSchool?.sch?.logoURL}
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
              {isFollowed ? (
                <Button
                  type="primary"
                  style={{ float: "right", height: "2.5rem" }}
                  onClick={removeSavedSchool}
                  loading={addSavedSchoolLoading}
                >
                  <TagsOutlined /> 찜하기 취소
                </Button>
              ) : (
                <Button
                  type="primary"
                  ghost
                  style={{ float: "right", height: "2.5rem" }}
                  onClick={addSavedSchool}
                  loading={removeSaveSchoolLoading}
                >
                  <TagsOutlined /> 학교 찜하기
                </Button>
              )}

              <h2 style={{ margin: "0" }}>{singleSchool.sch?.schoolName}</h2>

              <div>
                {averageRating == 0 ? (
                  <StarOutlined />
                ) : (
                  <>
                    <StarFilled style={{ color: "#FFDC82" }} />
                    <span style={{ marginRight: "10px" }}>{averageRating}</span>
                  </>
                )}

                <DepartsTags schoolInfo={singleSchool.tag} />
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href={singleSchool?.sch?.hmpg_ADRES}
                >
                  {singleSchool?.sch?.hmpg_ADRES}
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
