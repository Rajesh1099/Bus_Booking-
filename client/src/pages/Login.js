import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axois from "axios"

import styles from "../resources/login.module.css"



function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await axois.post("/api/users/login", values)
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                navigate("/");

            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message)
        }
    };



    const [form] = Form.useForm()

    return (
        <>
            <div className='container'>
                <div className={styles.loginbox}>
                    <div className={styles.login}>
                        <div className={styles.logo}>
                            <img src={require("../images/BUSLOGO.png")} alt="logo" />
                        </div>
                        <h1 className='text-lg'> Login</h1>
                        <hr />
                        <Form layout="vertical" onFinish={onFinish} form={form}>
                            <Form.Item label="Email" name="email">
                                <Input type="text" required />
                            </Form.Item>
                            <Form.Item label="Password" name="password">
                                <Input type="password" required />
                            </Form.Item>
                            <br />

                            <hr/>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link to="/register" >Click here to Register</Link>
                                <button className='secondary-btn' type='submit'>Login</button>
                            </div>


                        </Form>
                    </div>
                </div>
            </div></>
    )
}

export default Login
