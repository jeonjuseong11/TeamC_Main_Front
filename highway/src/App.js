import { ConfigProvider, message } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_REQUEST, REFRESH_TOKEN_REQUEST } from "./constants/actionTypes";

import TopMenu from "./components/Menu/TopMenu";
import SchoolDetail from "./pages/SchoolDetail";

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
import axios from "axios";
import SchoolBoard from "./pages/SchoolBoard";
import SchoolBoardDetail from "./pages/Board/SchoolBoardDetail";

import moment from "moment";
import PromotionHome from "./components/Promotion/PromotionHome";
import PromotionVideoDetail from "./components/Promotion/PromotionVideoDetail";
import UserInfo from "./components/Profile/UserInfo";
import ProfileRecentRecord from "./components/Profile/ProfileRecentRecord";
import BoardMain from "./pages/Board/BoardMain";
import BoardPostForm from "./components/Board/BoardPostForm";
import { info } from "./utils/Message";

function App() {
  const dispatch = useDispatch();
  const access = localStorage.getItem("ACCESSTOKEN");
  const expire = localStorage.getItem("EXPIRES");
  const navigate = useNavigate();
  const { me } = useSelector((state) => state.user);
  const reissueToken = () => {
    // Token 재발행
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
  };

  const loadUser = () => {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
  };

  const setupTokenRefresh = (expire) => {
    const expireTime = moment(expire);
    const nowTime = moment();
    //    console.log(moment(expireTime).diff(nowTime.format()) > 0);
    if (moment(expireTime).diff(nowTime.format()) < 0) {
      localStorage.removeItem("ACCESSTOKEN");
      localStorage.removeItem("REFRESHTOKEN");
      localStorage.removeItem("EXPIRES");
      info("로그인 만료됨");
      navigate("/login");
      return;
    }
    const refreshInterval = expireTime.diff(nowTime);
    // console.log(refreshInterval);
    setInterval(reissueToken, refreshInterval - 10);
  };

  useEffect(() => {
    if (access) {
      axios.defaults.headers.common["ACCESS_TOKEN"] = access;
    }
    if (expire) {
      setupTokenRefresh(expire);
      loadUser();
    }
  }, [access, expire]);
  useEffect(() => {
    if (me) {
      info(`${me.userName}님 환영합니다.`);
      localStorage.setItem("USERINFO", JSON.stringify(me));
    }
  }, [me]);
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#8282ff" } }}>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/terms" element={<Terms />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signup/student" element={<StudentSignUp />} />
          <Route exact path="/signup/other" element={<OtherSignUp />} />
          <Route exact path="/signup/student/terms" element={<Terms />} />
          <Route exact path="/signup/other/terms" element={<Terms />} />

          <Route element={<TopMenu />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route element={<UserProfile />}>
              <Route exact path="/profile/" element={<UserInfo />} />
              <Route exact path="/profile/recentrecord" element={<ProfileRecentRecord />} />
            </Route>
            <Route element={<SchoolBoard />}>
              <Route exact path="/schoolboard/" element={<BoardMain />} />
              <Route exact path="/schoolboard/:category" element={<BoardMain />} />
              <Route exact path="/schoolboard/:category/:postId" element={<SchoolBoardDetail />} />
            </Route>
            <Route exact path="/schoolboard/post" element={<BoardPostForm />} />
            <Route exact path="/promotion" element={<Promotion />}>
              <Route exact path="/promotion" element={<PromotionHome />} />
              <Route exact path="/promotion/news" element={<PromotionNews />} />
              <Route exact path="/promotion/videos" element={<PromotionVideos />} />
            </Route>
            <Route exact path="/promotion/news/:newsId" element={<PromotionNewsDetail />} />
            <Route exact path="/promotion/videos/:videoId" element={<PromotionVideoDetail />} />
            <Route exact path="/schoolranking" element={<SchoolRanking />} />
            <Route exact path="/schooldetail/:schoolId" element={<SchoolDetail />} />
          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
