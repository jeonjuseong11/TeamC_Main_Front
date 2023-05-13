import { produce } from "immer";
export const initialState = {
  token: localStorage.getItem("token"), //jwt 토큰
  school: [
    {
      id: 1,
      name: "학교 이름1",
      descript: "학교 랭킹1",
      tags: ["IT", "미디어"],
      comments: [
        {
          id: 1,
          content: "hello",
        },
        {
          id: 2,
          content: "hello",
        },
        {
          id: 1,
          content: "hello",
        },
        {
          id: 2,
          content: "hello",
        },
      ],
      good: 10,
      followList: ["1", "2"],
      rate: {
        trafficRate: 5.0,
        facilityRate: 5.0,
        cafeteriaRate: 5.0,
        educationRate: 5.0,
        employmentRate: 5.0,
      },
      schoolWebsite: "https://000.000.com",
    },
    {
      id: 2,
      name: "학교 이름2",
      descript: "학교 랭킹2",
      tags: ["IT", "체육"],
      comments: [],
      good: 9,
      followList: ["1", "2"],
      rate: {
        trafficRate: 3.0,
        facilityRate: 3.0,
        cafeteriaRate: 3.0,
        educationRate: 3.0,
        employmentRate: 3.0,
      },
      schoolWebsite: "https://000.000.com",
    },
    {
      id: 3,
      name: "학교 이름3",
      descript: "학교 랭킹3",
      tags: ["전자", "디자인"],
      comments: [],
      good: 1,
      followList: ["1", "2"],
      rate: {
        trafficRate: 4.5,
        facilityRate: 4.5,
        cafeteriaRate: 4.5,
        educationRate: 4.5,
        employmentRate: 4.5,
      },
      schoolWebsite: "https://000.000.com",
    },
    {
      id: 4,
      name: "학교 이름4",
      descript: "학교 랭킹4",
      tags: ["경영", "회계"],
      comments: [
        {
          id: 1,
          content: "hello",
        },
        {
          id: 2,
          content: "hello",
        },
        {
          id: 4,
          content: "hello",
        },
        {
          id: 1,
          content: "hello",
        },
      ],
      good: 5,
      followList: ["1", "2"],
      rate: {
        trafficRate: 4.0,
        facilityRate: 4.0,
        cafeteriaRate: 4.0,
        educationRate: 4.0,
        employmentRate: 4.0,
      },
      schoolWebsite: "https://000.000.com",
    },
    {
      id: 5,
      name: "학교 이름5",
      descript: "학교 랭킹5",
      tags: ["회계", "경영"],
      comments: [
        {
          id: 1,
          content: "hello",
        },
        {
          id: 2,
          content: "hello",
        },
      ],
      good: 15,
      followList: ["1", "2"],
      rate: {
        trafficRate: 2.0,
        facilityRate: 2.0,
        cafeteriaRate: 2.0,
        educationRate: 2.0,
        employmentRate: 2.0,
      },
      schoolWebsite: "https://000.000.com",
    },
  ],
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      default:
        return state;
    }
  });

export default reducer;
