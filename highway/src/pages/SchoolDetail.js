import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { MenuWrapper } from "../components/Menu/MenuList";
import { Wrapper } from "../styles/PageStyle";
const SchoolDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: auto;
`;
const SchoolImg = styled.div`
  width: 60%;
  background-color: gray;
  height: 10rem;
  text-align: center;
  justify-content: center;
`;
const SchoolDetail = () => {
  const location = useLocation();
  const { schoolId } = useParams();

  const [path, setPath] = useState("/review"); //선택 메뉴를 표시하기 위함
  useEffect(() => {
    switch (location.pathname) {
      case `/schooldetail/${schoolId}/`:
        setPath("/info");
        break;
      case `/schooldetail/${schoolId}/review`:
        setPath("/review");
        break;
      case `/schooldetail/${schoolId}/job`:
        setPath("/job");
        break;
      case `/schooldetail/${schoolId}/question`:
        setPath("/question");
        break;
    }
  }, [location]);

  const subMenuLists = [
    { key: `/info`, label: <NavLink to={`/schooldetail/${schoolId}/`}>정보</NavLink> },
    {
      key: `/review`,
      label: <NavLink to={`/schooldetail/${schoolId}/review`}>리뷰</NavLink>,
    },
    {
      key: `/job`,
      label: <NavLink to={`/schooldetail/${schoolId}/job`}>진학/취업</NavLink>,
    },
    {
      key: `/question`,
      label: <NavLink to={`/schooldetail/${schoolId}/question`}>Q&A</NavLink>,
    },
  ];
  return (
    <div>
      <SchoolDetailWrapper>
        <SchoolImg>
          이미지 칸
          <div
            style={{
              backgroundColor: "white",
              display: "inline-block",
              border: "1px solid #C2C2C2",
              justifyContent: "center",
              alignItems: "center",
              height: "5rem",
              width: "4rem",
              borderRadius: "5px",
              position: "relative",
              top: "6.5rem",
              right: "25vw",
            }}
          >
            학교 로고
          </div>
        </SchoolImg>
        <div style={{ width: "60%", textAlign: "left", paddingLeft: "10vw" }}>
          <h2 style={{ paddingTop: "2rem", margin: "0" }}>학교 이름</h2>
          <div>별점, 학교학과, 학교페이지</div>
        </div>
        <Wrapper>
          <MenuWrapper>
            <Menu mode="horizontal" items={subMenuLists} selectedKeys={path} />
          </MenuWrapper>

          <main>
            <Outlet />
          </main>
        </Wrapper>
      </SchoolDetailWrapper>
    </div>
  );
};

export default SchoolDetail;
