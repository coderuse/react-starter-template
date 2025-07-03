import { useState } from 'react'
import { Typography, Tabs, Card, Row, Col, Spin, Alert, Image as AntImage, Tag, Statistic } from 'antd'
import { UserOutlined, FileTextOutlined, PictureOutlined, DashboardOutlined } from '@ant-design/icons'
import { usePosts, useUsers, usePhotos, useDashboardData } from '../hooks/useApi'
import { Post, User, Photo } from '../services/api'

const { Title, Paragraph } = Typography

const Home = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'users' | 'photos' | 'dashboard'>('posts')
  
  // Individual queries
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts()
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers()
  const { data: photos, isLoading: photosLoading, error: photosError } = usePhotos()
  
  // Combined dashboard query
  const dashboardData = useDashboardData()

  const renderPosts = () => (
    <div>
      <Title level={3}>Posts ({posts?.length || 0})</Title>
      {postsLoading && <Spin size="large" />}
      {postsError && <Alert message="Error loading posts" description={postsError.message} type="error" />}
      {posts && (
        <Row gutter={[16, 16]}>
          {posts.slice(0, 6).map((post: Post) => (
            <Col xs={24} sm={12} md={8} key={post.id}>
              <Card
                title={post.title}
                size="small"
                extra={<Tag color="blue">User #{post.userId}</Tag>}
              >
                <Paragraph ellipsis={{ rows: 3 }}>
                  {post.body}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )

  const renderUsers = () => (
    <div>
      <Title level={3}>Users ({users?.length || 0})</Title>
      {usersLoading && <Spin size="large" />}
      {usersError && <Alert message="Error loading users" description={usersError.message} type="error" />}
      {users && (
        <Row gutter={[16, 16]}>
          {users.map((user: User) => (
            <Col xs={24} sm={12} md={8} key={user.id}>
              <Card
                title={<><UserOutlined style={{ marginRight: 8 }} />{user.name}</>}
                size="small"
              >
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
                <p><strong>Website:</strong> {user.website}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )

  const renderPhotos = () => (
    <div>
      <Title level={3}>Photos ({photos?.length || 0})</Title>
      {photosLoading && <Spin size="large" />}
      {photosError && <Alert message="Error loading photos" description={photosError.message} type="error" />}
      {photos && (
        <Row gutter={[16, 16]}>
          {photos.map((photo: Photo) => (
            <Col xs={24} sm={12} md={8} lg={6} key={photo.id}>
              <Card
                hoverable
                cover={<AntImage src={photo.thumbnailUrl} alt={photo.title} />}
                size="small"
              >
                <Card.Meta description={photo.title} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )

  const renderDashboard = () => (
    <div>
      <Title level={3}>Dashboard Overview</Title>
      {dashboardData.isLoading && <Spin size="large" />}
      {dashboardData.error && <Alert message="Error loading dashboard" description={dashboardData.error.message} type="error" />}
      {!dashboardData.isLoading && !dashboardData.error && (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Posts"
                value={dashboardData.posts.data?.length || 0}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Users"
                value={dashboardData.users.data?.length || 0}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Photos"
                value={dashboardData.photos.data?.length || 0}
                prefix={<PictureOutlined />}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )

  const tabItems = [
    {
      key: 'posts',
      label: 'Posts',
      children: renderPosts(),
      icon: <FileTextOutlined />,
    },
    {
      key: 'users',
      label: 'Users',
      children: renderUsers(),
      icon: <UserOutlined />,
    },
    {
      key: 'photos',
      label: 'Photos',
      children: renderPhotos(),
      icon: <PictureOutlined />,
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      children: renderDashboard(),
      icon: <DashboardOutlined />,
    },
  ]

  return (
    <div style={{ padding: '24px' }}>
      <Title level={1}>Welcome to React Starter Template</Title>
      <Paragraph>
        This template now includes React, TypeScript, React Router, Axios, TanStack React Query, and Ant Design!
      </Paragraph>
      
      <div style={{ marginTop: '32px' }}>
        <Title level={2}>React Query API Demo</Title>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as 'posts' | 'users' | 'photos' | 'dashboard')}
          items={tabItems}
        />
      </div>
    </div>
  )
}

export default Home