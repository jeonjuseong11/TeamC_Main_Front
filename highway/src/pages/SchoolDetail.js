import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import {
  SchoolDetailWrapper,
  SchoolImg,
  SchoolInfo,
  SchoolLogo,
} from "../components/SchoolDetail/SchoolDetailStyle";
import { SubWrapper, Wrapper } from "../styles/PageStyle";
import { MenuWrapper } from "../components/Menu/MenuList";

const SchoolDetail = () => {
  const location = useLocation();
  const { schoolId } = useParams();
  const [path, setPath] = useState("/review"); //선택 메뉴를 표시하기 위함
  useEffect(() => {
    switch (location.pathname) {
      case `/schooldetail/${schoolId}/info`:
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
    { key: `/info`, label: <NavLink to={`/schooldetail/${schoolId}/info`}>정보</NavLink> },
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
          이미지 칸<SchoolLogo>학교 로고</SchoolLogo>
        </SchoolImg>
        <SchoolInfo>
          <h2 style={{ margin: "0" }}>학교 이름</h2>
          <div>별점, 학교학과, 학교페이지</div>
        </SchoolInfo>
        <SubWrapper>
          <MenuWrapper>
            <Wrapper>
              <Menu mode="horizontal" items={subMenuLists} selectedKeys={path} />
            </Wrapper>
          </MenuWrapper>
          <main>
            <Outlet />
          </main>
        </SubWrapper>
      </SchoolDetailWrapper>
    </div>
  );
};

export default SchoolDetail;
