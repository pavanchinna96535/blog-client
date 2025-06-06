import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import BlogList from './pages/BlogList.jsx';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import BlogEdit from './components/BlogEdit.jsx';
import Login from './pages/Login';
import Register from './pages/Register.jsx';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/edit/:id" element={<BlogEdit />} />
            

          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2025 Blog Platform</Footer>
      </Layout>
    </Router>
  );
}

export default App;
