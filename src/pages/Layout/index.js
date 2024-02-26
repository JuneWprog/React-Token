import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, clearUserInfo} from '@/store/modules/user'

const { Header, Sider } = Layout
const items = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Article',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: 'Publish',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuClick = (route) => {
    const path = route.key
    navigate(path)
  }

  // highlight the current route
  // 1. get the current route using useLocation
  const location = useLocation()
  const selectedkey = location.pathname

  // 2. get user info
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  // log out confirm callback remove user info
  const onConfirm = () => {
    console.log('confirm log out')
    dispatch(clearUserInfo())
    navigate('/login')
  }

  const name = useSelector(state => state.user.userInfo.name)
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="Are you sure you want to log out?" okText="Log Out" cancelText="Cancel" onConfirm={onConfirm}>
              <LogoutOutlined /> Log Out
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedkey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* for secondary routes */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout