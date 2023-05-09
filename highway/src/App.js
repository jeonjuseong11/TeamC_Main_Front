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
import Terms from "./pages/Terms";

function App() {
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
          <Route element={<TopMenu />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/promotion" element={<Promotion />} />
            <Route exact path="/schoolranking" element={<SchoolRanking />} />
          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
