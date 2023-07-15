import { AutoComplete, Button, Form, Radio, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CHECK_DUPLICATE_ID_REQUEST,
  LOAD_SCHOOL_LIST_REQUEST,
  RESET_DUPLICATE_ID_REQUEST,
  SIGNUP_REQUEST,
} from "../constants/actionTypes";
import {
  ButtonWrapper,
  CancelBtn,
  StudentSignUpBtn,
  SignUpForm,
  SignUpInput,
  SignUpInputPassword,
  SignUpWrapper,
  SchoolSelector,
} from "../styles/SignUpStyle";
import {
  idRegExp,
  roleValidate,
  schoolValidate,
  validateAge,
  validateEmail,
  validateId,
  validateNickname,
  validatePassword,
} from "../utils/signUpValidator";
import { error, info } from "../utils/Message";
import { CSSTransition } from "react-transition-group";

const SignUp = () => {
  const { schools, idValid, checkIdLoading, checkIdDone, me } = useSelector((state) => ({
    schools: state.school.schools,
    idValid: state.user.idValid,
    checkIdLoading: state.user.checkIdLoading,
    checkIdDone: state.user.checkIdDone,
    me: state.user.me,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (me) {
      navigate("/");
    }
  }, [me, navigate]);

  useEffect(() => {
    if (checkIdDone) {
      setIsIdValid(idValid);
    }
  }, [checkIdDone, idValid]);

  useEffect(() => {
    onCancel();
    loadSchoolsInfo();
  }, []);

  const onCancel = () => {
    dispatch({
      type: RESET_DUPLICATE_ID_REQUEST,
    });
    setIsIdValid(null);
  };

  const onFinish = (values) => {
    dispatch({
      type: SIGNUP_REQUEST,
      data: values,
    });
    info("회원가입 성공! 로그인창으로 이동합니다");
    navigate("/login");
  };

  const onCheckUserId = () => {
    const userIdValue = form.getFieldValue("uid");
    if (!userIdValue) {
      error("아이디를 입력해주세요");
    } else if (!idRegExp.test(userIdValue)) {
      error("아이디는 1~20자이며 영어와 숫자 조합으로 입력해주세요");
    } else {
      setIsIdValid(null);
      dispatch({
        type: CHECK_DUPLICATE_ID_REQUEST,
        data: userIdValue,
      });
    }
  };

  const loadSchoolsInfo = () => {
    dispatch({
      type: LOAD_SCHOOL_LIST_REQUEST,
    });
  };
  const schoolsInfo = schools
    ?.filter((it) => it.schoolId !== 0)
    .map((it) => ({
      value: it.schoolId,
      label: it.schoolName,
    }));
  useEffect(() => {
    // console.log(schoolsInfo);
  }, [schoolsInfo]);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onEmailChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ["@gmail.com", "@naver.com", "@hanmail.net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const emailOptions = autoCompleteResult.map((email) => ({
    label: email,
    value: email,
  }));

  const isCheckingId = checkIdLoading;
  const [isIdValid, setIsIdValid] = useState(null);

  const handlePopstate = () => {
    onCancel();
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showSchoolOptions, setShowSchoolOptions] = useState(false); //true이면 학교 옵션을 보여주고, false이면 숨깁

  const handleSchoolSelect = (value, option) => {
    console.log(value);
    if (value === "school") {
      setShowSchoolOptions(true);
      setSelectedSchool(null);
    } else {
      setShowSchoolOptions(false);
      const selectedSchool = schools.find((school) => school.schoolId === value);
      // console.log(selectedSchool);
      setSelectedSchool(selectedSchool?.label);
      form.setFieldsValue({ schoolId: value });
    }
  };

  return (
    <SignUpWrapper>
      <SignUpForm
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
        scrollToFirstError
      >
        <h2>재학생 회원가입</h2>
        <label>아이디</label>
        <Form.Item
          name="uid"
          tooltip="아이디는 영어로 시작하여 숫자와 조합으로 작성해주세요"
          rules={[{ validator: validateId }]}
          hasFeedback
          validateStatus={isIdValid === null ? "error" : isIdValid ? "success" : "error"}
        >
          <Space.Compact style={{ width: "100%" }}>
            <SignUpInput allowClear placeholder="아이디를 입력해주세요" disabled={isIdValid} />
            <Button
              loading={isCheckingId}
              onClick={onCheckUserId}
              disabled={isIdValid || isCheckingId}
              style={{ height: "3rem", borderColor: "#f2f2f2" }}
            >
              중복확인
            </Button>
          </Space.Compact>
        </Form.Item>
        {isIdValid === true && (
          <p
            style={{
              color: "green",
              marginTop: "-1.5rem",
              marginBottom: "0rem",
            }}
          >
            사용 가능한 아이디입니다
          </p>
        )}
        {isIdValid === false && (
          <p
            style={{
              color: "red",
              marginTop: "-1.5rem",
              marginBottom: "0rem",
            }}
          >
            이미 사용 중인 아이디입니다
          </p>
        )}
        <label>비밀번호</label>
        <Form.Item
          name="pwd"
          rules={[
            {
              validator: validatePassword,
            },
          ]}
          hasFeedback
        >
          <SignUpInputPassword allowClear placeholder="비밀번호를 입력해주세요(8~50)" />
        </Form.Item>
        <label>비밀번호 확인</label>
        <Form.Item
          name="confirm"
          dependencies={["pwd"]}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error("비밀번호를 확인해주세요."));
                }
                if (getFieldValue("pwd") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
              },
            }),
          ]}
        >
          <SignUpInputPassword allowClear placeholder="비밀번호를 입력해주세요" />
        </Form.Item>
        <label>닉네임</label>
        <Form.Item name="name" rules={[{ validator: validateNickname }]}>
          <SignUpInput allowClear placeholder="닉네임을 입력해주세요" />
        </Form.Item>
        <label>이메일</label>
        <Form.Item name="email" rules={[{ validator: validateEmail }]}>
          <AutoComplete options={emailOptions} onChange={onEmailChange}>
            <SignUpInput placeholder="이메일을 입력해주세요" />
          </AutoComplete>
        </Form.Item>
        <label>나이</label>
        <Form.Item name="age" rules={[{ validator: validateAge }]}>
          <SignUpInput type="number" placeholder="나이를 입력해주세요" />
        </Form.Item>
        <label>성별</label>
        <div style={{ display: "flex", height: "3rem", alignItems: "center" }}>
          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: "성별를 선택해주세요",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="male">남성</Radio>
              <Radio value="female">여성</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <label>역할</label>
        <Form.Item name="role" rules={[{ validator: roleValidate }]}>
          <Select
            onSelect={(value) => {
              if (value === 1) {
                setRole(1);
              } else if (value === 2) {
                setRole(2);
              } else if (value === 3) {
                setRole(3);
              } else if (value === 4) {
                setRole("예비 재학생");
              }
            }}
            placeholder="선택해주세요"
            options={[
              {
                value: 1,
                label: "학생",
              },
              {
                value: 2,
                label: "선생님",
              },
              {
                value: 3,
                label: "부모님",
              },
              {
                value: 4,
                label: "예비 재학생",
              },
            ]}
          />
        </Form.Item>
        <CSSTransition
          in={role === 1 || role === 2}
          timeout={500}
          classNames="loading"
          unmountOnExit
        >
          <>
            <label>학교</label>
            <Form.Item name="schoolId" rules={[{ validator: schoolValidate }]}>
              <SchoolSelector
                showSearch
                placeholder="학교를 선택해주세요"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={schoolsInfo}
                onSelect={handleSchoolSelect}
                value={selectedSchool}
              />
            </Form.Item>
          </>
        </CSSTransition>
        <Form.Item>
          <ButtonWrapper>
            <StudentSignUpBtn type="primary" htmlType="submit">
              가입하기
            </StudentSignUpBtn>
            <CancelBtn
              onClick={() => {
                navigate(`/login`);
                onCancel();
              }}
            >
              취소하기
            </CancelBtn>
          </ButtonWrapper>
        </Form.Item>
      </SignUpForm>
    </SignUpWrapper>
  );
};

export default SignUp;
