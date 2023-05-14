import React from 'react';
import {
    BackToSign,
    TermWrapper
} from '../../styles/TermsStyle';
import { Divider, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Service = () => {
    const navigator = useNavigate();
    return (
        <TermWrapper>
          <h1>HiGHWAY 이용약관</h1>
            <p>
            내용
            </p>
            <Form.Item>
        </Form.Item>
        </TermWrapper>
    );
};

export default Service;