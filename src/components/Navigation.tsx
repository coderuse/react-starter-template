import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons'

const Navigation = () => {
  const location = useLocation()
  
  const items = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">About</Link>,
    },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '40px' }}>
        React Starter
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
        style={{ flex: 1, border: 'none' }}
      />
    </div>
  )
}

export default Navigation