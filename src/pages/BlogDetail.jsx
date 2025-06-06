
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Popconfirm, Card, Typography, message, Spin } from 'antd';
import useAuth from '../Context/Authcontext';
import axios from '../api/axios';

const { Title, Paragraph, Text } = Typography;

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        message.error('Failed to load blog');
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  const handleDelete = async (e) => {
  e.preventDefault(); 
  try {
    const token = localStorage.getItem('token');
    console.log(token);
    await axios.delete(`/blogs/${blog._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    message.success('Blog deleted successfully.');
    navigate('/');
  } catch (err) {
    console.error(err);
    message.error('Failed to delete blog.');
  }
};


console.log(user);
const isAuthor = blog?.author?._id?.toString() === user?._id?.toString();
console.log(isAuthor);




  if (loading)
    return (
      <Spin
        size="large"
        style={{ display: 'block', margin: 'auto', marginTop: 50 }}
      />
    );

  if (!blog)
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        Blog not found
      </div>
    );

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <Card>
        <Title level={2}>{blog.title}</Title>
        <Text type="secondary">
          By {blog.author?.name || 'Unknown'} on{' '}
          {new Date(blog.createdAt).toLocaleDateString()}
        </Text>

        <Paragraph style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
          {blog.content}
        </Paragraph>

        {isAuthor && (
          <div style={{ marginTop: '20px' }}>
            <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={() => navigate(`/edit/${blog._id}`)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this blog?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BlogDetail;
