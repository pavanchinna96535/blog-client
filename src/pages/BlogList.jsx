
import { useEffect, useState } from 'react';
import { List, Card, Pagination, Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const { Title } = Typography;

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`/blogs?page=${page}&limit=${limit}`);
      setBlogs(res.data.blogs);
      setTotalBlogs(res.data.total);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <Title level={2}>All Blogs</Title>
      {loading ? (
        <Spin />
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={blogs}
            renderItem={(blog) => (
              <List.Item>
                <Card
                  title={<Link to={`/blogs/${blog._id}`}>{blog.title}</Link>}
                  extra={<small>{new Date(blog.createdAt).toLocaleDateString()}</small>}
                >
                  <p>{blog.content.slice(0, 150)}...</p>
                  <p><b>Author:</b> {blog.author?.name || 'Unknown'}</p>
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            current={page}
            pageSize={limit}
            total={totalBlogs}
            onChange={(p) => setPage(p)}
            style={{ marginTop: '16px', textAlign: 'center' }}
          />
        </>
      )}
    </div>
  );
}
