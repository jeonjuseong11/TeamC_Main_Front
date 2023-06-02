import { produce } from "immer";
import {
  ADD_REVIEW_FAILURE,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  LOAD_SCHOOL_INFO_FAILURE,
  LOAD_SCHOOL_INFO_REQUEST,
  LOAD_SCHOOL_INFO_SUCCESS,
  LOAD_SCHOOL_LIST_FAILURE,
  LOAD_SCHOOL_LIST_REQUEST,
  LOAD_SCHOOL_LIST_SUCCESS,
} from "../constants/actionTypes";
export const initialState = {
  addReviewLoading: false,
  addReviewDone: false,
  addReviewError: null,
  loadSchoolListLoading: false,
  loadSchoolListDone: false,
  loadSchoolListError: null,
  schools: [
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
      totalRate: {
        trafficRate: 5.0,
        facilityRate: 5.0,
        cafeteriaRate: 5.0,
        educationRate: 5.0,
        employmentRate: 5.0,
      },
      schoolWebsite: "https://000.000.com",
    },
  ],
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_SCHOOL_LIST_REQUEST:
        draft.loadSchoolListLoading = true;
        draft.loadSchoolListDone = false;
        draft.loadSchoolListError = null;
        break;
      case LOAD_SCHOOL_LIST_SUCCESS:
        draft.schools = action.data;
        draft.loadSchoolListLoading = false;
        draft.loadSchoolListDone = true;
        break;
      case LOAD_SCHOOL_LIST_FAILURE:
        draft.loadSchoolListLoading = false;
        draft.loadSchoolListError = action.error;
        break;
      case ADD_REVIEW_REQUEST:
        draft.addReviewLoading = true;
        draft.addReviewDone = false;
        draft.addReviewError = null;
        break;
      case ADD_REVIEW_SUCCESS:
        const school = draft.schools.find(
          (v) => v.id === parseInt(action.data.schoolId)
        );
        school.reviews.unshift(action.data.values);
        console.log(action.data);
        draft.addReviewLoading = false;
        draft.addReviewDone = true;
        break;
      case ADD_REVIEW_FAILURE:
        draft.addReviewLoading = false;
        draft.addReviewError = action.error;
        break;
      default:
        return state;
    }
  });

export default reducer;
