import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopMenu from "./components/Menu/TopMenu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OtherSignUp from "./pages/OtherSignUp";
import Promotion from "./pages/Promotion";
import SchoolRanking from "./pages/SchoolRanking";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import StudentSignUp from "./pages/StudentSignUp";
import UserProfile from "./pages/UserProfile";
import JoinPresenter from "./pages/JoinPresenter";
import SchoolDetail from "./pages/SchoolDetail";
import SchoolDetailInfo from "./components/SchoolDetailInfo";
import SchoolDetailJob from "./components/SchoolDetailJob";
import SchoolDetailReview from "./components/SchoolDetailReview";
import SchoolDetailQuestion from "./components/SchoolDetailQuestion";

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#8282ff" } }}>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/joinpresenter" element={<JoinPresenter />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/signup/student" element={<StudentSignUp />} />
          <Route exact path="/signup/other" element={<OtherSignUp />} />
          <Route element={<TopMenu />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/promotion" element={<Promotion />} />
            <Route exact path="/schoolranking" element={<SchoolRanking />} />
            <Route exact path="/schooldetail/:schoolId" element={<SchoolDetail />}>
              <Route>
                <Route exact path="/schooldetail/:schoolId/" element={<SchoolDetailInfo />} />
                <Route exact path="/schooldetail/:schoolId/job" element={<SchoolDetailJob />} />
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
