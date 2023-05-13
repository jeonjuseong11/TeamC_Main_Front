import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, List, Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { NoDecoLink } from "../../styles/PageStyle";
import { OneLineReviewWrapper } from "./SchoolDetailStyle";
const OneLineReviewTitle = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 1rem;
  text-align: left;
  border-bottom: 1px solid #c2c2c2;
`;
const OneLineReviewContent = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const OneLineReview = () => {
  const { me } = useSelector((state) => state.user);
  const { school } = useSelector((state) => state.school);
  const schoolId = useParams();
  const schoolComment = school[schoolId.schoolId - 1].comments;
  const items = me
    ? [
        {
          key: "edit",
          label: "수정하기",
        },
        {
          key: "delete",
          label: "삭제하기",
          danger: true,
        },
        {
          key: "declaration",
          label: "신고하기",
          danger: true,
        },
      ]
    : [
        {
          key: "declaration",
          label: "신고하기",
          danger: true,
        },
      ];

  return (
    <OneLineReviewWrapper>
      <OneLineReviewTitle>
        <span style={{ marginLeft: "1rem" }}>학교에 대한 한줄평</span>
        <NoDecoLink>
          <span style={{ fontSize: "0.7rem", marginRight: "0.5rem" }}>한줄평 작성</span>
        </NoDecoLink>
      </OneLineReviewTitle>
      <OneLineReviewContent>
        <List
          itemLayout="horizontal"
          dataSource={schoolComment}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Dropdown
                  placement="bottomLeft"
                  overlay={<Menu items={items} type={items.type} />}
                  trigger={["hover"]}
                >
                  <EllipsisOutlined />
                </Dropdown>,
              ]}
            >
              <List.Item.Meta
                description={
                  <p
                    style={{
                      textAlign: "left",
                      marginLeft: "1rem",
                    }}
                  >
                    {item.content}
                  </p>
                }
              />
            </List.Item>
          )}
        />
      </OneLineReviewContent>
    </OneLineReviewWrapper>
  );
};

export default OneLineReview;
