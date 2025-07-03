import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import './App.scss'

const { Header, Content } = Layout

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: '#fff' }}>
        <Navigation />
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App