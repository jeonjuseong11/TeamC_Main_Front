import React from 'react';
import {
    BackToSign,
    TermWrapper
} from '../../styles/TermsStyle';
import { Divider, Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const YoungPrivate = () => {
    const navigator = useNavigate();
    return (
        <TermWrapper>
            <Divider />
            <h1>HIGHWAY 청소년 보호정책</h1>
            <p>
            내용
            </p>
            <Form.Item>
        </Form.Item>
        </TermWrapper>
    );
};

export default YoungPrivate;