
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../Context/Authcontext';

const { Title } = Typography;
const { TextArea } = Input;

export default function CreateBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/blogs', values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Blog created successfully!');
      navigate('/');
    } catch (err) {
      message.error(err.response?.data?.msg || 'Failed to create blog.');
    }
  };

  if (!user) {
    return <Typography.Text type="danger">You must be logged in to create a blog.</Typography.Text>;
  }

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <Title level={2}>Create New Blog</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <TextArea rows={8} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Publish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
