import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import {useDispatch} from 'react-redux'
import {fetchLogin} from '@/store/modules/user'
import {useNavigate} from 'react-router-dom'
import {useRef, useEffect} from 'react'


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  // login form submit event pass values when validation is successful
  const onFinish = async (values) => {
    //dispatch action to get token
    await dispatch(fetchLogin(values));
    //redirect to home page
    navigate('/');
    //remind the user of successful login
    // message.success('Login successfully');
    message.success(localStorage.getItem("token"));

  }

  //set focus on the input box when the page is loaded
  useEffect(() => {
    inputRef.current.focus();
  
  }, []);

  
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* login form */}
        <Form  
          onFinish={onFinish}
        validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            // validation input rules
            rules={[
              {
                required: true,
                message: 'Phone number is required.',
              },
              {
                pattern: /^[0-9]{0,15}$/,
                message: 'Please enter a valid phone number.'
              }
            ]}>
            <Input size="large" ref={inputRef} placeholder="Phone Number" />
          </Form.Item>
          <p>13800000002</p> 

          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Password is required',
              },
            ]}>
            <Input size="large" placeholder="Password" />
          </Form.Item>
          <p>246810</p>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login