import { Col, List, Row, Segmented, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_SAVED_SCHOOL_REQUEST, LOAD_USER_POSTS_REQUEST } from "../../constants/actionTypes";
import SchoolList from "../../pages/SchoolList";
import { changeCategory } from "../../pages/Board/BoardMain";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const ItemWrapper = styled.div`
  padding-left: 1rem;
  border-radius: 10px;
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const ProfileRecentRecord = () => {
  const { followList } = useSelector((state) => state.school);
  const { schoolBoardPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const listRef = useRef(null);

  const loadSavedSchool = () => {
    dispatch({
      type: LOAD_SAVED_SCHOOL_REQUEST,
    });
  };

  const loadUserPosts = () => {
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
    });
  };

  useEffect(() => {
    loadSavedSchool();
    loadUserPosts();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      const listHeight = listRef.current.offsetHeight;
      const parentHeight = listRef.current.parentNode.offsetHeight;
      if (listHeight > parentHeight) {
        listRef.current.parentNode.style.height = `${listHeight}px`;
      } else {
        listRef.current.parentNode.style.height = "auto";
      }
    }
  }, [schoolBoardPosts]);

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
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ margin: "0" }}>좋아요 누른 게시물</h3>
          <List
            dataSource={schoolBoardPosts}
            style={{ marginTop: "1rem" }}
            pagination={{
              align: "center",
              onChange: (page) => {
                // console.log(page);
              },
              pageSize: 5,
            }}
            renderItem={(item) => (
              <Link to={`/schoolboard/${item.category}/${item.id}`}>
                <ItemWrapper className="hover-item">
                  <List.Item>
                    <Tag>{changeCategory(item.category)}</Tag> {item.title}
                  </List.Item>
                </ItemWrapper>
              </Link>
            )}
            ref={listRef}
          />
        </div>
      </Col>
    </>
  );
};

export default ProfileRecentRecord;
