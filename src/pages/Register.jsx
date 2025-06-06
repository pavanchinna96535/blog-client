
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../Context/Authcontext';

const { Title } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onFinish = async (values) => {
    try {
      const res = await axios.post('/auth/register', values); // change to your API route
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      
      message.success('Successfully registered. Please login.', 2);
      
     
      navigate('/login');
    
    } catch (err) {
      message.error(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={2}>Register</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
