import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import TopMenu from "./components/Menu/TopMenu";
import SchoolDetail from "./pages/SchoolDetail";
import SchoolDetailInfo from "./components/SchoolDetail/SchoolDetailInfo";
import SchoolDetailJob from "./components/SchoolDetail/SchoolDetailJob";
import SchoolDetailReview from "./components/SchoolDetail/SchoolDetailReview";
import SchoolDetailQuestion from "./components/SchoolDetail/SchoolDetailQuestion";

import Home from "./pages/Home";
import Login from "./pages/Login";
import OtherSignUp from "./pages/OtherSignUp";
import Promotion from "./pages/Promotion";
import SchoolRanking from "./pages/SchoolRanking";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import StudentSignUp from "./pages/StudentSignUp";
import UserProfile from "./pages/UserProfile";
import Terms from "./pages/Terms";
import PromotionNews from "./components/Promotion/PromotionNews";
import PromotionVideos from "./components/Promotion/PromotionVideos";
import PromotionNewsDetail from "./components/Promotion/PromotionNewsDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  LOAD_USER_REQUEST,
  REFRESH_TOKEN_REQUEST,
} from "./constants/actionTypes";
import axios from "axios";
import SchoolBoard from "./pages/Board/SchoolBoard";
import SchoolBoardList from "./pages/Board/SchoolBoardList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(userInfo.userNo);
    const access = localStorage.getItem("ACCESSTOKEN");
    const expire = localStorage.getItem("EXPIRE");
    if (access) {
      axios.defaults.headers.common["ACCESS_TOKEN"] = `${access}`;
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
    if (expire) {
      console.log(expire);
      function reissueToken() {
        //Token 재발행
        dispatch({
          type: REFRESH_TOKEN_REQUEST,
        });
      }
      setInterval(
        reissueToken,
        new Date(expire).setSeconds(new Date(expire).getSeconds() - 10)
      );
    }
  }, []);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#8282ff" } }}>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/signup/student" element={<StudentSignUp />} />
          <Route exact path="/signup/other" element={<OtherSignUp />} />
          <Route exact path="/signup/student/terms" element={<Terms />} />
          <Route exact path="/signup/other/terms" element={<Terms />} />
          <Route
            exact
            path="/schoolboard/:schoolId"
            element={<SchoolBoard />}
          />
          <Route
            exact
            path="/schoolboard/:schoolId/list"
            element={<SchoolBoardList />}
          />
          <Route
            exact
            path="/schoolboard/:schoolId/list/:itemid"
            element={<SchoolBoardList />}
          />
          <Route element={<TopMenu />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/promotion" element={<Promotion />}>
              <Route
                exact
                path="/promotion/news"
                element={<PromotionNews />}
              ></Route>
              <Route
                exact
                path="/promotion/videos"
                element={<PromotionVideos />}
              />
            </Route>
            <Route
              exact
              path="/promotion/news/:newsId"
              element={<PromotionNewsDetail />}
            />
            <Route exact path="/schoolranking" element={<SchoolRanking />} />
            <Route
              exact
              path="/schooldetail/:schoolId"
              element={<SchoolDetail />}
            >
              <Route>
                <Route
                  exact
                  path="/schooldetail/:schoolId/info"
                  element={<SchoolDetailInfo />}
                />
                <Route
                  exact
                  path="/schooldetail/:schoolId/job"
                  element={<SchoolDetailJob />}
                />
                <Route
                  exact
                  path="/schooldetail/:schoolId/review"
                  element={<SchoolDetailReview />}
                />
                <Route
                  exact
                  path="/schooldetail/:schoolId/question"
                  element={<SchoolDetailQuestion />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
