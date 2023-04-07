import React from 'react'
import { Form, Input,message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axois from "axios"

function Register() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await axois.post("/api/users/register",values)
            if(response.data.success){
                message.success(response.data.message);
                navigate("/login");
                
            }else{
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message)
        }
    };

    const validateName = (_, value) => {
        if (!/^[a-zA-Z ]{3,}$/.test(value)) {
            return Promise.reject('Name should have minimum 3 alphabets')
        }
        return Promise.resolve()
    }

    const validatePhone = (_, value) => {
        if (!/^\d{10}$/.test(value)) {
            return Promise.reject('Phone Number should be exactly 10 digits')
        }
        return Promise.resolve()
    }

    const validateEmail = (_, value) => {
        if (!/\S+@\S+\.\S+/.test(value)) {
            return Promise.reject('Invalid email')
        }
        return Promise.resolve()
    }

    const validatePassword = (_, value) => {
        if (!/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}/.test(value)) {
            return Promise.reject('Password should be minimum 8 characters with at least 1 capital letter, 1 special character, and 1 number')
        }
        return Promise.resolve()
    }

    const validateConfirmPassword = (_, value) => {
        const { password } = form.getFieldsValue()
        if (value !== password) {
            return Promise.reject('Passwords do not match')
        }
        return Promise.resolve()
    }

    const [form] = Form.useForm()

    return (
        <div className='h-screen d-flex justify-content-center align-items-center' >
            <div className='w-400 card p-3'>
            <div className="logo">
                            <img src={require("../images/BUSLOGO.png")} alt="logo" />
                        </div>
                <h1 className='text-lg' >TravelSwift - Register</h1>
                <hr />
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item label="Full Name" name="name" rules={[{ validator: validateName }]}>
                        <Input type="text" required />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" rules={[{ validator: validatePhone }]}>
                        <Input type="text" required />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ validator: validateEmail }]}>
                        <Input type="text" required />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ validator: validatePassword }]}>
                        <Input type="password" required />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ validator: validateConfirmPassword }]}>
                        <Input type="password" required />
                    </Form.Item>
                    <hr/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Link to="/login">Click here to Login</Link>
                        <button className='secondary-btn' type='submit'>Register</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register;
