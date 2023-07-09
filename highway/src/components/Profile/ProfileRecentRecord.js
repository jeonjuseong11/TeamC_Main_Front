import { Col, List, Row, Segmented, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_SAVED_SCHOOL_REQUEST } from "../../constants/actionTypes";
import SchoolList from "../../pages/SchoolList";

const ProfileRecentRecord = () => {
  const { followList } = useSelector((state) => state.school);
  const data = [1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const [selection, setSelection] = useState("학교");
  const dispatch = useDispatch();
  const loadSavedSchool = () => {
    dispatch({
      type: LOAD_SAVED_SCHOOL_REQUEST,
    });
  };
  useEffect(() => {
    loadSavedSchool();
  }, []);
  return (
    <>
      <Col xs={24} md={11}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            textAlign: "left",
            padding: "2rem",
          }}
        >
          <h3>찜한 학교들</h3>
          찜한 학교는 최대 10개까지 볼 수 있습니다.
          <div>
            <SchoolList schools={followList} />
          </div>
        </div>
      </Col>
      <Col xs={24} md={11} offset={4}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            textAlign: "left",
            padding: "2rem",
            marginBottom: "5vh",
          }}
        >
          <h3 style={{ margin: "0" }}>좋아요 누른 게시물</h3>
          <List
            dataSource={data}
            pagination={{
              align: "center",
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
            }}
            renderItem={(item) => (
              <List.Item>
                <Tag>ITEM</Tag> {item}
              </List.Item>
            )}
          />
        </div>
      </Col>
    </>
  );
};

export default ProfileRecentRecord;
