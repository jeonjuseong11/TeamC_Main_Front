import { message, Modal } from "antd";

export const info = (props) => {
  message.info(props);
};
export const error = (props) => {
  Modal.error({
    title: "로그인 실패",
    content: props,
    style: { top: "40vh" },
  });
};
export const success = (props) => {
  Modal.success({
    content: props,
    style: { top: "40vh" },
  });
};
