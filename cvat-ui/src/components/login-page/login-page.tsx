// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { Row, Col } from 'antd/lib/grid';

import CVATLogo from '../../assets/deeplabel-logo_3.svg';
import DeepInspectionCI from '../../assets/deepinspection-ci.svg';
import LoginForm, { LoginData } from './login-form';
import CookieDrawer from './cookie-policy-drawer';

interface LoginPageComponentProps {
    fetching: boolean;
    renderResetPassword: boolean;
    onLogin: (username: string, password: string) => void;
}

function LoginPageComponent(props: LoginPageComponentProps & RouteComponentProps): JSX.Element {
    const sizes = {
        xs: { span: 14 },
        sm: { span: 14 },
        md: { span: 10 },
        lg: { span: 4 },
        xl: { span: 4 },
    };

    const { fetching, onLogin, renderResetPassword } = props;

    return (
        <>
            <Row justify='center' align='bottom'>
                <CVATLogo width={700} height={200} fill={"#1446c0"} />
            </Row>
            <Row justify='center' align='bottom' style={{height: "250px", margin: "10px"}}>
                <Col {...sizes}>
                    <Title level={2}> Login </Title>
                    <LoginForm
                        fetching={fetching}
                        onSubmit={(loginData: LoginData): void => {
                            onLogin(loginData.username, loginData.password);
                        }}
                    />
                </Col>
                <Col style={{padding: "10px" }}>
                    <Row justify='start' align='top'>
                        <Col>
                            <Text strong>
                                New to DeepLabel+? Create
                                <Link to='/auth/register' style={{color: "#1446c0"}}> an account</Link>
                            </Text>
                        </Col>
                    </Row>
                    {renderResetPassword && (
                        <Row justify='start' align='top'>
                            <Col>
                                <Text strong>
                                    <Link to='/auth/password/reset' style={{color: "#1446c0"}}>Forgot your password?</Link>
                                </Text>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
            <Row align='bottom' style={{margin: "10px"}}>
                <div style={{width: '100%', display: 'flex', justifyContent:'flex-end'}} className="divCI">
                    <DeepInspectionCI />
                </div>
            </Row>
            <CookieDrawer />
        </>
    );
}

export default withRouter(LoginPageComponent);
