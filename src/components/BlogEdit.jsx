
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd';
import axios from '../api/axios';

const { TextArea } = Input;

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`/blogs/${id}`);
        form.setFieldsValue({
          title: res.data.title,
          content: res.data.content,
        });
      } catch (err) {
        message.error('Failed to load blog');
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id, form, navigate]);

  const handleUpdate = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/blogs/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Blog updated successfully');
      navigate(`/blogs/${id}`);
    } catch (err) {
      message.error('Failed to update blog');
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: 'auto', marginTop: 50 }} />;
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h2>Edit Blog</h2>
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please enter content' }]}>
          <TextArea rows={6} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogEdit;
