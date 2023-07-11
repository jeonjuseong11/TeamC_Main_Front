import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Col, Input, List } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { IconText } from "../../components/Card/CardStyle";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../../constants/actionTypes";

export const formatDate = (dateString) => {
  const currentTime = moment();
  const targetTime = moment(dateString);
  const duration = moment.duration(currentTime.diff(targetTime));

  if (duration.asSeconds() < 60) {
    return "방금 전";
  } else if (duration.asMinutes() < 60) {
    const minutes = Math.floor(duration.asMinutes());
    return `${minutes}분 전`;
  } else if (duration.asHours() < 24) {
    const hours = Math.floor(duration.asHours());
    return `${hours}시간 전`;
  } else if (duration.asDays() < 2) {
    return "어제";
  } else if (duration.asMonths() < 1) {
    const days = Math.floor(duration.asDays());
    return `${days}일 전`;
  } else {
    const months = Math.floor(duration.asMonths());
    return `${months}달 전`;
  }
};

export const changeCategory = (category) => {
  if (category == 0) {
    return "자유게시판";
  } else if (category == 1) {
    return "질문게시판";
  } else if (category == 2) {
    return "프로젝트 모집";
  } else if (category == 3) {
    return "IT";
  } else if (category == 4) {
    return "경영";
  }
};
const BoardMain = () => {
  const MAX_CONTENT_LENGTH = 30; //최대 글자수
  const { category } = useParams();
  const dispatch = useDispatch();
  const { schoolBoardPosts } = useSelector((state) => state.post);
  const me = JSON.parse(localStorage.getItem("USERINFO"));
  const [hoveredItem, setHoveredItem] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");
  const sortedData = [...schoolBoardPosts];
  const [searchText, setSearchText] = useState("");
  const loadPosts = (category) => {
    let schoolId = parseInt(category) === 10 ? 0 : me && me.schoolId ? me.schoolId : 0;

    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: { category, schoolId },
    });
  };

  useEffect(() => {
    if (category) {
      loadPosts(category);
    }
  }, [category]);
  // if (category=="all") {

  //   filteredData = sortedData.filter((item) => item.category.includes(category));
  // }
  if (sortOrder === "latest") {
    sortedData.sort((a, b) => {
      return new Date(b.createDate) - new Date(a.createDate);
    });
  } else if (sortOrder === "most-liked") {
    {
      /* 해당 기능은 2023js에 새로 나온 기능인 toSorted 메서드 활용 가능 */
    }
    sortedData.sort((a, b) => {
      return b.good - a.good;
    });
  }

  let filteredData = sortedData;
  if (searchText) {
    filteredData = sortedData.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const handleSortOrder = (order) => {
    setSortOrder((prevOrder) => (prevOrder === order ? "" : order));
  };
  const formatContent = (content, maxLength) => {
    if (!content) return null;
    if (content.length <= maxLength) {
      return content;
    }

    const truncatedContent = content.slice(0, maxLength);
    return truncatedContent.trim() + "...";
  };
  return (
    <Col xs={24} md={11}>
      <Input
        placeholder="궁금한 내용을 찾아보세요"
        style={{ borderRadius: "50px", padding: "1rem", marginBottom: "1rem" }}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setSearchText(e.target.value);
          }
        }}
      />
      <div style={{ textAlign: "left", marginBottom: "1rem" }}>
        <Button
          type="text"
          style={{
            borderRadius: "50px",
            background: sortOrder === "latest" ? "#8282ff" : "transparent",
            color: sortOrder === "latest" ? "white" : "black",
          }}
          onClick={() => handleSortOrder("latest")}
        >
          최신순
        </Button>
        {/* <Button
          type="text"
          style={{
            borderRadius: "50px",
            background: sortOrder === "most-liked" ? "#8282ff" : "transparent",
            color: sortOrder === "most-liked" ? "white" : "black",
          }}
          onClick={() => handleSortOrder("most-liked")}
        >
          좋아요 많은순
        </Button> */}
      </div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={filteredData}
        grid={{
          gutter: 0,
          column: 2,
        }}
        renderItem={(item, index) => (
          <div
            style={{
              borderTop: "1px solid #f2f2f2",
              padding: "1rem",
            }}
          >
            {/* <Link to={`/schoolboard/${item.category}/${item.id}`}> */}
            {/* 카테고리를 주소에 첨부할지 말지는 아직 고민중 */}
            <Link to={`/schoolboard/${item.category}/${item.id}`}>
              <List.Item
                key={item.title}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  textAlign: "left",
                  borderRadius: "10px",
                  padding: "1rem",
                  alignItems: "center",
                  background: hoveredItem === index ? "#f5f5f5" : "transparent",
                  transition: "background 0.3s",
                }}
                // actions={[
                //   <IconText icon={LikeOutlined} text={item.good} key="list-vertical-like-o" />,
                //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                // ]}
              >
                <span style={{ color: "gray" }}>{changeCategory(item.category)}</span>
                <List.Item.Meta
                  title={item.title}
                  description={
                    <div
                      style={{
                        height: "40px",
                        maxHeight: "40px", // 원하는 높이값으로 변경
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1, // 원하는 줄 수로 변경
                      }}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: formatContent(item?.content, MAX_CONTENT_LENGTH),
                        }}
                      ></span>
                    </div>
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    textAlign: "right",
                    color: "#a2a2a2",
                  }}
                >
                  {formatDate(item.createDate)}
                </div>
              </List.Item>
            </Link>
          </div>
        )}
      />
    </Col>
  );
};

export default BoardMain;
