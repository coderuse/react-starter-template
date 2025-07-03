import { Typography, List, Card, Row, Col, Tag } from 'antd'
import { CheckCircleOutlined, CodeOutlined, ApiOutlined, ThunderboltOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

const About = () => {
  const technologies = [
    'React 18 with TypeScript',
    'React Router for navigation',
    'Axios for HTTP requests',
    'TanStack React Query for server state management',
    'Ant Design for UI components',
    'Vite for fast development and building',
    'ESLint for code quality'
  ]

  const features = [
    'Caching and synchronization of server state',
    'Background refetching',
    'Optimistic updates',
    'Error handling',
    'Loading states',
    'Parallel and dependent queries',
    'Request/response interceptors'
  ]

  return (
    <div style={{ padding: '24px' }}>
      <Title level={1}>
        <CodeOutlined /> About
      </Title>
      <Paragraph>
        This is a React TypeScript starter template that includes modern tools and libraries for building robust web applications.
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card 
            title={<><ApiOutlined /> Technologies</>}
            size="small"
          >
            <List
              size="small"
              dataSource={technologies}
              renderItem={item => (
                <List.Item>
                  <Tag color="blue">{item}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card 
            title={<><ThunderboltOutlined /> Features</>}
            size="small"
          >
            <List
              size="small"
              dataSource={features}
              renderItem={item => (
                <List.Item>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default About