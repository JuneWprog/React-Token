import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm} from 'antd';

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import {  getArticleListAPI, delArticleAPI, getArticleById } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'
import {useNavigate} from 'react-router-dom'

const {Option} = Select;
const {RangePicker} = DatePicker;

const Article = () => {
  const navigate = useNavigate()
  const statusMap = {
    1:  <Tag color="warning">Reviewing</Tag>,
    2:  <Tag color="success">Passed</Tag>
  }

  const {channelList} = useChannel();

    const columns = [
        {
          title: 'Cover',
          dataIndex: 'cover',
          width: 120,
          render: cover => {
            return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
          }
        },
        {
          title: 'Title',
          dataIndex: 'title',
          width: 220
        },
        {
          title: 'Status',
          dataIndex: 'status',
          // data - 后端返回的状态status 根据它做条件渲染
          render: status => statusMap[status]
          // render: data => data === 1 ? <Tag color="warning">Reviewing</Tag> : <Tag color="success">Passed</Tag>
        },
        {
          title: 'Publish Time',
          dataIndex: 'pubdate'
        },
        {
          title: 'Views',
          dataIndex: 'read_count'
        },
        {
          title: 'Comments',
          dataIndex: 'comment_count'
        },
        {
          title: 'Thumb Ups',
          dataIndex: 'like_count'
        },
        {
          title: 'Operation',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />}  onClick ={()=>navigate(`/publish/?id=${data.id}`)} />
                <Popconfirm
                  title="Delete this article?"
                  description="Are you sure you want to delete this article?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm = {()=>onConfirm(data)}
                >
                  <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              </Space>
            )
          }
        }
      ]

    const [articleList, setArticleList] = useState([])
    const [count, setCount] = useState(0)
    const [reqData, setReqData] =useState({
      status: '',
      channel_id: '',
      begin_pubdate: '',
      end_pubdate: '',
      page: 1,
      per_page: 10
    })

    useEffect(() => {
      const getArticleList = async () => {
        const res = await getArticleListAPI(reqData)
        setArticleList(res.data.results)
        setCount(res.data.total_count)
      }
      getArticleList()
    }, [reqData])

    //for search function
    //1. get the filter data
    const onFinish = (values) => {
      setReqData({
        ...reqData,
        status: values.status,
        channel_id: values.channel_id,
        begin_pubdate: values.date[0].format('YYYY-MM-DD'),
        end_pubdate: values.date[1].format('YYYY-MM-DD')
      })
    } 

    const onPageChange = (page) => {
      console.log(page)
      setReqData({
        ...reqData,
        page
      })
    }

    const onConfirm = async(data) => {
      console.log(data)

      await delArticleAPI(data.id)
        setReqData({
          ...reqData,
        })
    }

    
   
    return (
      <div>
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>Home</Link> },
              { title: 'Article List' },
            ]} />
          }
          style={{ marginBottom: 20 }}
        >
          <Form initialValues={{ status: '' }} onFinish = {onFinish}>
            <Form.Item label="Status" name="status">
              <Radio.Group>
                <Radio value={''}>All</Radio>
                <Radio value={1}>Review</Radio>
                <Radio value={2}>Pass</Radio>
              </Radio.Group>
            </Form.Item>
  
            <Form.Item label="Channel" name="channel_id">
              <Select
                placeholder="Channel"
                style={{ width: 120 }}
              >
                {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
            </Form.Item>
  
            <Form.Item label="Date" name="date">
              <RangePicker ></RangePicker>
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                Search
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {/* list table */}
        <Card title={`Found ${count} Articles：`}>
          <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange
          }}></Table>
         
        </Card>
      </div>
    )
  }
  
export default Article;