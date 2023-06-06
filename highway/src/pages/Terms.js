import React from "react";
import { items } from "../utils/Agree";
import { Anchor } from "antd";
import {
  BackToSign,
  TermGroup,
  TermWrapper,
  TermItem,
} from "../styles/TermsStyle";
import Service from "../components/Terms/Service";
import Private from "../components/Terms/Private";
import YoungPrivate from "../components/Terms/YoungPrivate";
import { Link } from "react-router-dom";

const Terms = () => {
  console.log(window.location.href);
  const text = window.location.href;
  const url = text.replace("/terms", "");
  return (
    <TermWrapper>
      <Anchor direction="horizontal" items={items} />
      <TermGroup>
        <TermItem id="service">
          <Service />
        </TermItem>
        <TermItem id="private">
          <Private />
        </TermItem>
        <TermItem id="youngprivate">
          <YoungPrivate />
        </TermItem>
      </TermGroup>
      <Link to={`${url}`}>
        <BackToSign>돌아가기</BackToSign>
      </Link>
    </TermWrapper>
  );
};

export default Terms;
