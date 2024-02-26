import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { getChannelAPI, createArticleAPI } from "@/apis/article";
// import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'
const { Option } = Select;

const Publish = () => {
  const [imgList, setImgList] = useState([]);
  const [imageType, setImageType] = useState(0);
  const { channelList } = useChannel();
  const onFinish = (formValue) => {
    console.log(formValue);
    //preprocess the data
    //validate the image type and image list
    if (imgList.length !== imageType) return message.warning(`Please upload ${imageType}  images`);
    const { title, content, channel_id } = formValue;
    const articleData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imgList.map((item) => item.response.data.url),
      },
      channel_id,
    };
    // using api
    createArticleAPI(articleData).then((res) => {
      message.success("Publish successfully");
    });
  };

  //set the image list
  const onChange = (value) => {
    setImgList(value.fileList);
  };

  const onTypeChange = (e) => {
    setImageType(e.target.value);
   }
  
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              //   { title: `${articleId ? '编辑' : '发布'}文章` },
            ]}
          />
        }
      >
        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          // form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Title" style={{ width: 400 }} />
          </Form.Item>
          {/* channel */}
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[{ required: true, message: "Channel" }]}
          >
            <Select placeholder="Channel" style={{ width: 400 }}>
              {/* name is the key, value属性用户选中之后会自动收集起来作为接口的提交字段 */}
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Cover">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>Single Image</Radio>
                <Radio value={3}>Triple Image</Radio>
                <Radio value={0}>No Image</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
            listType: 决定选择文件框的外观样式
            showUploadList: 控制显示上传列表
            maxCount: 控制最大上传数量
          */}
          {imageType>0 && 
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={true}
              action={"http://geek.itheima.net/v1_0/upload"}
              onChange={onChange}
              maxCount ={imageType}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            }
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: "Please enter the content of the article",
              },
            ]}
          >
            {/* Rich Text Editor，RTE */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder=" Content of the article"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Publish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
