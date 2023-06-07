import {
  BankOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  FormOutlined,
  HighlightOutlined,
  LineChartOutlined,
  MedicineBoxOutlined,
  ProfileOutlined,
  SettingOutlined,
  TeamOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Segmented, Space, Table } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

export const RankTopic = [
  {
    icon: <ProfileOutlined />,
    content: "전체보기",
    value: "total",
  },
  {
    icon: <ExperimentOutlined />,
    content: "자연과학",
    value: "science",
  },
  {
    icon: <SettingOutlined />,
    content: "공학 및 기술",
    value: "Tech",
  },
  {
    icon: <DesktopOutlined />,
    content: "정보통신 및 SW",
    value: "SW",
  },
  {
    icon: <HighlightOutlined />,
    content: "예술 및 디자인",
    value: "Art",
  },
  {
    icon: <TeamOutlined />,
    content: "인문사회과학",
    value: "Social",
  },
  {
    icon: <TranslationOutlined />,
    content: "언어 및 문학",
    value: "Language",
  },
  {
    icon: <LineChartOutlined />,
    content: "경제 및 경학",
    value: "Economy",
  },
  {
    icon: <MedicineBoxOutlined />,
    content: "의학 및 보건",
    value: "Medical",
  },
  {
    icon: <MedicineBoxOutlined />,
    content: "의학 및 보건",
    value: "Medical",
  },
];
const RankSelector = () => {
  return (
    <Space
      direction="vertical"
      style={{ marginTop: "1rem", overflowX: "auto", whiteSpace: "nowrap" }}
    >
      <Segmented
        options={RankTopic.map((item) => ({
          label: (
            <div style={{ padding: 4 }}>
              <Avatar style={{ backgroundColor: "#8282ff" }} icon={item.icon} />
              <div>{item.content}</div>
            </div>
          ),
          value: item.value,
        }))}
      />
    </Space>
  );
};

export default RankSelector;
