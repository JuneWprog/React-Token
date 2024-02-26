import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm} from 'antd';

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import {  getArticleListAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const {Option} = Select;
const {RangePicker} = DatePicker;

const Article = () => {

  const {channelList} = useChannel();

    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width: 120,
          render: cover => {
            return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
          }
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: 220
        },
        {
          title: '状态',
          dataIndex: 'status',
          // data - 后端返回的状态status 根据它做条件渲染
          // data === 1 => 待审核
          // data === 2 => 审核通过
        //   render: data => status[data]
        },
        {
          title: '发布时间',
          dataIndex: 'pubdate'
        },
        {
          title: '阅读数',
          dataIndex: 'read_count'
        },
        {
          title: '评论数',
          dataIndex: 'comment_count'
        },
        {
          title: '点赞数',
          dataIndex: 'like_count'
        },
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />}  />
                <Popconfirm
                  title="删除文章"
                  description="确认要删除当前文章吗?"
                  okText="Yes"
                  cancelText="No"
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

    useEffect(() => {
      const getArticleList = async () => {
        const res = await getArticleListAPI()
        setArticleList(res.data.results)
        setCount(res.data.total_count)
      }
      getArticleList()
    }, [])
   
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
          <Form initialValues={{ status: '' }} >
            <Form.Item label="Status" name="status">
              <Radio.Group>
                <Radio value={''}>全部</Radio>
                <Radio value={1}>待审核</Radio>
                <Radio value={2}>审核通过</Radio>
              </Radio.Group>
            </Form.Item>
  
            <Form.Item label="频道" name="channel_id">
              <Select
                placeholder="请选择文章频道"
                style={{ width: 120 }}
              >
                {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
            </Form.Item>
  
            <Form.Item label="日期" name="date">
              {/* 传入locale属性 控制中文显示*/}
              <RangePicker ></RangePicker>
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {/* 表格区域 */}
        <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
          <Table rowKey="id" columns={columns} dataSource={articleList}></Table>
         
        </Card>
      </div>
    )
  }
  
export default Article;