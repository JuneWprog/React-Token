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
import "./index.scss";
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState} from "react";
import { createArticleAPI ,getArticleById, updateArticleAPI} from "@/apis/article";
import { useChannel } from '@/hooks/useChannel'
import { type } from "@testing-library/user-event/dist/type";
const { Option } = Select;

const Publish = () => {
  const [imgList, setImgList] = useState([]);
  const [imageType, setImageType] = useState(0);
  const { channelList } = useChannel();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const navigate = useNavigate();
  const onFinish = (formValue) => {
    //preprocess the data
    //validate the image type and image list
    if (imgList.length !== imageType) return message.warning(`Please upload ${imageType}  images`);
    const { title, content, channel_id } = formValue;
    const articleData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imgList.map((item) => {return (item.response)?item.response.data.url:item.url}), //image list api just need the url
      },
      channel_id,
    };
    // using api to create article
    if(articleId){
      //new article
      updateArticleAPI({...articleData, id: articleId})
    }
    else{
      //edit article
      createArticleAPI(articleData)
    }
    //reset the form field value and image list after submit 
    form.resetFields();
    setImgList([]);
    setImageType(0);
    navigate('/article')
  };

  //set the image list
  const onChange = (value) => {
    setImgList(value.fileList);
  };

  const onTypeChange = (e) => {
    setImageType(e.target.value);
   }
  // For Edit:
  //fill the form field value if the request with a aritle id 
  //get data from the server by the article id for editing

   useEffect(() => {
    async function getArticleDetail(){
      const res= await getArticleById(articleId)
      //automatic fill the form field value
      form.setFieldsValue({
        ...res.data,
        type: res.data.cover.type,
        
      })
      //fill the image list
      setImageType(res.data.cover.type)
      setImgList(res.data.cover.images.map(url=>{return {url}}))
    }
    if(articleId){
      getArticleDetail()
    }
   },[articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
                { title: `${articleId ? 'Edit' : 'New'} Article` },
            ]}
          />
        }
      >
        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          form={form}
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
              fileList={imgList}
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
                {articleId ? 'Update' : 'Publish'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
