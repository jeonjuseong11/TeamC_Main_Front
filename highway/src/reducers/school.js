import { produce } from "immer";
import {
  ADD_SCHOOL_REVIEW_FAILURE,
  ADD_SCHOOL_REVIEW_REQUEST,
  ADD_SCHOOL_REVIEW_SUCCESS,
  // LOAD_SCHOOL_INFO_FAILURE,
  // LOAD_SCHOOL_INFO_REQUEST,
  // LOAD_SCHOOL_INFO_SUCCESS,
  LOAD_SCHOOL_LIST_FAILURE,
  LOAD_SCHOOL_LIST_REQUEST,
  LOAD_SCHOOL_LIST_SUCCESS,
  LOAD_SCHOOL_REVIEWS_FAILURE,
  LOAD_SCHOOL_REVIEWS_REQUEST,
  LOAD_SCHOOL_REVIEWS_SUCCESS,
} from "../constants/actionTypes";
export const initialState = {
  addSchoolReviewLoading: false,
  addSchoolReviewDone: false,
  addSchoolReviewError: null,
  loadSchoolListLoading: false,
  loadSchoolListDone: false,
  loadSchoolListError: null,
  loadSchoolReviewsLoading: false,
  loadSchoolReviewsDone: false,
  loadSchoolReviewsError: null,
  schools: [
    {
      id: 1,
      logoURL: "/assets/schoolLogo1.png", //학교 심볼 이미지
      schul_NM: "근명고등학교", //학교이름
      descript: "학교 랭킹1", //학교 설명?
      schul_RDNMA: "경기도 안양시 만안구 삼덕로 49", //주소
      user_TELNO: "031-449-3567", //전화번호
      USER_TELNO_SW: "031-446-1201", //교무실 전화번호
      USER_TELNO_GA: "031-449-3567", //행정실 전화번호
      hmpg_ADRES: "http://www.kmh.hs.kr", //학교 홈페이지
      departs: [
        //학과 설명
        {
          depart: "전마케팅 마케팅 경영과",
          description:
            "금융·회계·마케팅 등 경영 관련 분야의 직무수행에 필요한 전문지식을 배우며. 경기도형 도제학교를 통해 산업현장과 교육과정을 연계하여 현장실무능력을 갖춘 기업 맞춤형 인재를 기른다.",
        },
        {
          depart: "베이커리카페과",
          description:
            "국내 최고의 명장, 기능장 등 26개 업체와 협약을 체결하여 직접 지도받고 있습니다. 제과 제빵, 식음료, 바리스타 교육 등 체계적이고 전문적인 교육과정에 따라 기본적인 제과제빵부터 고급 디저트 및 창작 레시피 개발까지 이어진다. 풍부한 실습 경험을 통해 베이커리 및 외식사업 분야의 전문가를 양성한다.",
        },
        {
          depart: "패션산업 디자인과",
          description:
            "의상, 기획, 제작, 브랜딩화 등 실습 위주의 체계적이고 수준 높은 교육과정과 해외 연수, 명인명장 수업 및 각종 프로젝트 수업으로 차별화된 교육을 실시한다. 또한 뷰티, 코스메틱 및 영상 콘텐츠 제작 교육을 통해 패션/뷰티 분야의 종합 역량을 가진 토탈 패션 전문가를 양성함",
        },
        {
          depart: "앱 서비스과",
          description:
            "4차 산업혁명 시대의 선두 주자로써 앱(App) 관련 문화콘텐츠 산업 활성화를 위해 모바일앱 개발 및 화면디자인, 미디어 콘텐츠 제작 등 스마트 기기에 적합한 콘텐츠를 기획, 제작할 수 있는 앱 서비스 분야 전문 인재를 양성한다.",
        },
      ],
      tags: ["전자", "IT", "디자인"], //해당 태그
      members: [
        //해당 학교로 가입한 사용자 -> 못하면 빼고
        { id: 1, userName: "student1" },
        { id: 2, userName: "student2" },
      ],
    },
    {
      id: 2,
      logoURL: null,
      schul_NM: "안양공업고등학교", //학교이름
      descript: "학교 랭킹2",
      schul_RDNMA: "경기도 안양시 만안구 양화로28번길 69", //주소
      user_TELNO: "031-463-0110", //전화번호
      USER_TELNO_SW: "031-463-0114", //교무실 전화번호
      USER_TELNO_GA: "031-463-0110", //행정실 전화번호
      hmpg_ADRES: "anyang-t.hs.kr", //학교 홈페이지
      departs: [
        {
          depart: "패션소재디자인과",
          description:
            "4차 산업에 맞는 패션 산업 분야와 디지털 섬유 기술을 융합한 과로 패션 의류 분야의 제품 개발에 핖요한 패션 소재 기술, 패션 3D캐드, 그래픽 디자인 교육(일러스트, 포토샵)을 통해 패션 소재 디자인 분야의 창의력 있는 전문인 양성에 힘쓴다.",
        },
        {
          depart: "화학공업과",
          description:
            "화학공업에 대한 전문지식과 기술을 교육하여 산업체의 현장에서 필요로 하는 기능 및 기술을 습득하게 함으로써 4차 산업의 핵심인 바이오제약, 신소재, 화장품, 에너지, 정밀화학 제품생산 분야에 종사 할 수 있는 창의적인 전문인 양성에 힘쓴다.",
        },
        {
          depart: "전기제어시스템과",
          description:
            "전기라는 최고의 클린에너지를 다루는 뿌리산업의 주요기술을 익히고, 새롭게 다가오는 4차 산업에 필요한 신지식과 신기술을 배우고 훈련하여 산업 현장에 필요한 전문인을 양성한다.",
        },
        {
          depart: "3D건축디자인과",
          description:
            "4차 산업혁명과 연계한 AI건축물의 3차원 모델 구축과 건축설게 BIM 분야, 3D프린팅 디자인을 융합하는 전문 기술 인력을 양성한다.",
        },
        {
          depart: "건설기술행정과",
          description:
            "4차 산업분야의 스마트 건설기술인 양성과 공무원·공기업·우수 대학을 진학시킨다.",
        },
        {
          depart: "스마트팩토리기계과",
          description:
            "기계, 전기, 전자, 정보기술에 관한 종합적인 기초지식과 응용기술을 학습하여 산업현장이나 일상생활에 활용되는 자동화 기기의 생산 및 설계 분야에 종사할 수 있는 창의력있는 전문인을 양성한다.",
        },
        {
          depart: "XR융합응용학과",
          description:
            "융합현실 XR(eXtended Reality)은 가상현실(VR), 증강현실(AR), 혼합현실(MR)의 기술을 모두 포함하는 포괄적인 개념으로, 게임, 엔터테인먼트, 의료, 건강, 문화, 예쑬, 재난, 안전교육, 건강, 제품개발 등에 융합현실(XR)을 이용한 콘텐츠 개발 전문기술 인력을 양성한다.",
        },
        {
          depart: "반도체CS엔지니어과",
          description:
            "4차 산업의 핵심기술인 반도체 제조에 필요한 장비 유지보수를 위한 반도체 Customer Service 엔지니어 양성을 교육목표로 반도체 제조공정, 반도체 소재, 반도체 장비기술 등을 배우며 반도체 산업을 이해하고 반도체 장비를 운용할 수 있는 전문인력을 양성한다.",
        },
        {
          depart: "드론부사관과",
          description:
            "무인항공기의 기술 및 ICT융합의 서비스 현황에 대해 이해9하고 다양한 사물에 대한 센서/통신 기능을 부과하여 지능적으로 정보를 수집하고 상호 전달하는 네트워크 기술을 실습하며 실무 전공 분야에 대한 전문지식과 더불어 관련 분야도 이해하고 융합할 수 있는 능력을 보유한 전문인력을 양성한다.",
        },
      ],
      tags: ["경영", "디자인"],
      members: ["1", "2"], //해당 학교로 가입한 학생들? 안되면 뺴도됨
    },
    {
      id: 3,
      logoURL: null,
      schul_NM: "안양문화고등학교", //학교이름
      descript: "학교 랭킹2",
      schul_RDNMA: "경기도 안양시 만안구 양화로37번길 36", //주소
      user_TELNO: "031-470-4100", //전화번호
      USER_TELNO_SW: "031-470-4100", //교무실 전화번호
      USER_TELNO_GA: "031-470-4100", //행정실 전화번호
      hmpg_ADRES: "https://anyangculture.hs.kr", //학교 홈페이지
      departs: [
        {
          depart: "관광비즈니스과",
          description:
            "글로벌 마인드와 국제 감각을 갖춘 승무원, 호텔리어,호텔경영 및 외 식, 여행서비스 등 호텔경영과 관광 산업의 리더를 육성하고 호텔 및 관광산업 기업체와의 MOU체결을 통해 전문화된 직무중심의 교육과 정을 바탕으로 지도하고 있다.",
        },
        {
          depart: "비즈니스과",
          description:
            "방송 및 영상콘텐츠 제작, 방송 연기 분야의 실무 능력과 방송 뷰티 분야의 실무 능력을 향상시키기 위한 과정을 이론과 실습 수업을 통해 종합 엔터테이너의 자질 함양과 트렌디한 전문가를 양성한다. 21세기 문화 콘텐츠 산업에 대한 이해를 바탕으로 방송 연기, 영상, 뷰티 분야의 전문인을 통해 한류 문화를 이끌어갈 인재 육성을 목표로 하는 학과이다.",
        },
        {
          depart: "보건간호과",
          description:
            "의료 현장에서 간호 및 보건 업무를 수행하는 간호사, 요양보호사, 보건 공무원 등 전문 보건 간호 의료인을 양성한다. 국민건강증진과 인간 삶의 질적 향상을 위하여 간호보조업무에 필요한 기초적인 지식과 기술을 겸비하고 생명을 존중하여 효과적인 의사소통을 통해 전인적인 간호 교육을 실시한다.",
        },
        {
          depart: "웹툰메이커스과",
          description:
            "전 세계로 확장되고 있는 K-콘텐츠의 중심, 웹툰 분야 및 글로벌 비즈니스 역량을 갖춘 웹툰 만화 시장의 전문가를 양성한다. 웹툰 스토리의 기초 이론부터 캐릭터 제작, 만화 콘텐츠 유통 산업 분야까지 디지털 시대의 융복합적인 콘텐츠 문화산업의 선도적인 역할을 할 수 있도록 지도하고 있다.",
        },
        {
          depart: "금융경영과",
          description:
            "금융전문인력 양성을 위해 특성화고 전략의 일환으로 경기도 최초로 설립한 학과로 금융 산업의 국제화에 따른 국내외 금융기관에 종사할 전문 실무 능력을 갖춘 유능한 전문 금융인을 양성하며 금융에 관한 지식과 실무를 교육 내용으로 실무 응용 학습을 통해 다양한 분야로의 진출 가능성을 갖도록 교육한다. 특히 우리은행, IBK 기업은행, 농협 등 금융기관과 한국주택금융공사, 안양시청, 고용노동부 등 공공기관과의 업무 협약체결로 현장실습 및 취업에 유리하다.",
        },
        {
          depart: "스마트팩토리기계과",
          description:
            "기계, 전기, 전자, 정보기술에 관한 종합적인 기초지식과 응용기술을 학습하여 산업현장이나 일상생활에 활용되는 자동화 기기의 생산 및 설계 분야에 종사할 수 있는 창의력있는 전문인을 양성한다.",
        },
      ],
      tags: ["경영", "디자인"],
      members: ["1", "2"], //해당 학교로 가입한 학생들? 안되면 뺴도됨
    },
    {
      id: 4,
      logoURL: null,
      schul_NM: "군포e비즈니스고등학교", //학교이름
      descript: "학교 랭킹2",
      schul_RDNMA: "경기도 군포시 수리산로 153", //주소
      user_TELNO: "031-390-5322", //전화번호
      USER_TELNO_SW: "031-390-5308", //교무실 전화번호
      USER_TELNO_GA: "031-390-5322", //행정실 전화번호
      hmpg_ADRES: "http://www.gunpo-ebiz.hs.kr", //학교 홈페이지
      departs: [
        {
          depart: "금융회계과",
          description:
            "NCS 경영·회계·금융 실무교육과 경영윤리에 대한 소양 교육으로 기업·공공기관이 원하는 인재상을 갖추 실무능력 중심의 미래 전문 경영 인재를 양성한다.",
        },
        {
          depart: "마케팅과",
          description:
            "고객 관리, 유통, 판매 등의 서비스 직종에 필요한 직업 기초능력과 현장 맞춤형 직무 능력을 길러 고객서비스 및 마케팅 전문 인력을 양성한다.",
        },
        {
          depart: "스마트소프트웨어과",
          description:
            "4차 산업혁명 시대에 필요한 인재를 양성하기 위해 정보소양 능력 함양과 다양한 프로그래밍 언어 교육과정을 갖추어 컴퓨팅 사고력과 문제해결력을 갖춘 소프트웨어 분야 전문인력을 양성한다.",
        },
        {
          depart: "IT융합과",
          description:
            "정보통신에 대한 기본 지식을 바탕으로 4차산업혁명 시대에 등장하는 다양한 신기술을 익혀 IT산업 전반에 기술 지원을 할 수 있는 IT융합 전문 인력을 양성한다.",
        },
        {
          depart: "그래픽디자인과",
          description:
            "시각디자인실무, 컴퓨터그래픽실무, 애니메이션 콘텐츠 제작 등에 대한 기본적인 지식을 바탕으로 디자인을 창작할 수 있는 역량을 기며 기술적, 사회적, 문화적 변화에 유연하게 대처하는 실무에 적합한 인재를 양성한다.",
        },
        {
          depart: "뷰티케어과",
          description:
            "피부미용, 헤어미용, 메이크업 분야에 대한 산업수요에 부합되는 글로벌한 뷰티아티스트 인력양성을 위하여 뷰티케어관련 지식, 직무능력 등 실무에 적합한 인재를 양성한다.",
        },
      ],
      tags: ["경영", "디자인"],
      members: ["1", "2"], //해당 학교로 가입한 학생들? 안되면 뺴도됨
    },
    {
      id: 5,
      logoURL: null,
      schul_NM: "경기폴리텍고등학교", //학교이름
      descript: "학교 랭킹2",
      schul_RDNMA: "경기도 군포시 고산로 524", //주소
      user_TELNO: "031-390-4514", //전화번호
      USER_TELNO_SW: "031-390-4587", //교무실 전화번호
      USER_TELNO_GA: "031-390-4501", //행정실 전화번호
      hmpg_ADRES: "www.g-polytech.hs.kr", //학교 홈페이지
      departs: [
        {
          depart: "자동차금형과(디자인모터스과)",
          description:
            "디자인이 세상을 바꾼느 시대, 미래지향적 디자인 감각을 익혀 스마트 모빌리티 시대의 창의적 기술인재를 양성한다.",
        },
        {
          depart: "신에너지전기과",
          description:
            "산업 현장에서 전기기술을 담당할 전문기술인 양성을 위해서 전기기초기술에서부터 전기 응용기술까지 이론과 실습을 겸비한 교육을 통해 전기분야의 전무기술자로 성장 할 수 있도록 한다. 또한, 첨단 산업사회의 변화와 미래성장 산업에 대비하여 전기기기, 내선공사, 자동화설비 등의 분야에 중점을 두고 교육하고 있으며 다양한 전기분야에서 유연하게 대처할 수 있는 실무형 미래기술인을 양성한다.",
        },
        {
          depart: "화장품과학과",
          description:
            "화장품에 대한 이론과 전문적인 실습교육을 통하여 뷰티 산업을 선도하는 기술 인재를 양성한다. 제약산업, 환경산업, 공기청정기술, 첨단 신소재 개발과 화학산업에 필요한 전문교육을 실시하고 이론과 현장 적응력을 갖춘 융합형 전문 기술인력을 양성한다.",
        },
        {
          depart: "친환경건축과",
          description:
            "쾌적한 환경과 편리한 공간을 재구성하여 디자인하고, 사용자 중심의 설계프로그램을 이용하여 21세기를 주도할 우수한 건축 전문가를 양성한다.",
        },
        {
          depart: "보건간호과",
          description:
            "체계화된 간호교육과 협력병원 임상실습 교육을 통해 생명존중을 실천하고 의료현장에서 필요한 실무능력을 겸비한 전문간호인재를 양성한다.",
        },
      ],
      tags: ["경영", "디자인"],
      members: ["1", "2"], //해당 학교로 가입한 학생들? 안되면 뺴도됨
    },
  ],
  school: [],
  schoolReviews: [
    // {
    //   id: 1,
    //   author: "student1",
    //   tags: "전기전자과",
    //   trafficRate: 5.0,
    //   facilityRate: 5.0,
    //   cafeteriaRate: 5.0,
    //   educationRate: 5.0,
    //   employmentRate: 5.0,
    //   content: "Review1 contents",
    // },
    // {
    //   id: 2,
    //   author: "student2",
    //   tags: "컴퓨터소프트웨어과",
    //   trafficRate: 5.0,
    //   facilityRate: 5.0,
    //   cafeteriaRate: 5.0,
    //   educationRate: 5.0,
    //   employmentRate: 5.0,
    //   content: "Review2 contents",
    // },
    // {
    //   id: 3,
    //   author: "student3",
    //   tags: "전기전자과",
    //   trafficRate: 5.0,
    //   facilityRate: 5.0,
    //   cafeteriaRate: 5.0,
    //   educationRate: 5.0,
    //   employmentRate: 5.0,
    //   content: "Review3 contents",
    // },
    // {
    //   id: 4,
    //   author: "student4",
    //   tags: "산업디자인과",
    //   trafficRate: 5.0,
    //   facilityRate: 5.0,
    //   cafeteriaRate: 5.0,
    //   educationRate: 5.0,
    //   employmentRate: 5.0,
    //   content: "Review4 contents",
    // },
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
        // draft.schools.push(action.data);
        draft.loadSchoolListLoading = false;
        draft.loadSchoolListDone = true;
        break;
      case LOAD_SCHOOL_LIST_FAILURE:
        draft.loadSchoolListLoading = false;
        draft.loadSchoolListError = action.error;
        break;
      case ADD_SCHOOL_REVIEW_REQUEST:
        draft.addSchoolReviewLoading = true;
        draft.addSchoolReviewDone = false;
        draft.addSchoolReviewError = null;
        break;
      case ADD_SCHOOL_REVIEW_SUCCESS:
        // const school = draft.schools.find((v) => v.id === parseInt(action.data.schoolId));
        draft.schoolReviews.unshift(action.data);
        // console.log(action.data);
        draft.addSchoolReviewLoading = false;
        draft.addSchoolReviewDone = true;
        break;
      case ADD_SCHOOL_REVIEW_FAILURE:
        draft.addSchoolReviewLoading = false;
        draft.addSchoolReviewError = action.error;
        break;
      case LOAD_SCHOOL_REVIEWS_REQUEST:
        draft.loadSchoolReviewsLoading = true;
        draft.loadSchoolReviewsDone = false;
        draft.loadSchoolReviewsError = null;
        break;
      case LOAD_SCHOOL_REVIEWS_SUCCESS:
        draft.schoolReviews = action.data;
        // draft.schools.find((v) => v.id === parseInt(action.data.schoolId)).reviews =
        //   draft.schoolReviews;
        draft.loadSchoolReviewsLoading = false;
        draft.loadSchoolReviewsDone = true;
        break;
      case LOAD_SCHOOL_REVIEWS_FAILURE:
        draft.loadSchoolReviewsLoading = false;
        draft.loadSchoolReviewsError = action.error;
        break;
      default:
        return state;
    }
  });

export default reducer;
