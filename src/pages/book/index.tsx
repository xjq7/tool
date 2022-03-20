import { useEffect, useState } from 'react';
import { Button, Upload, message, Form, Select, FormInstance, Input, List, Spin } from 'antd';
import styles from './index.module.less';
import { UploadOutlined } from '@ant-design/icons';
import { upload2Bucket, getCategoryList, createBook } from '@services/book';
import { FILE_PREIX } from '@constant/book';
import copy from 'copy-to-clipboard';

export default function Bucket() {
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [fileList, setFileList] = useState<any>([]);

  const [form] = Form.useForm();

  const _upload = async (options: any) => {
    const formData = new FormData();
    formData.append('file', options.file);
    formData.append('name', options.file.name);
    setFileList([...fileList, { uid: options.file.uid, name: options.file.name, status: 'uploading' }]);
    const { path, id } = await upload2Bucket(formData);
    fileList.filter((item: any) => item.uid !== options.file.uid);
    setFileList([
      ...fileList,
      { uid: options.file.uid, id, name: options.file.name, url: FILE_PREIX + path, status: 'success' },
    ]);
  };

  const onFinish = async (form: any) => {
    const { name, desc, category1, category2 } = form;
    if (!fileList.length) {
      message.error('请上传书籍');
      return;
    }
    const data = { files: fileList, name, desc, category1, category2, created_at: new Date() };
    await createBook(data);
    message.success('创建成功');
  };

  const props = {
    name: 'file',
    customRequest: _upload,
    fileList: [],
    multiple: true,
    onChange: (e: any) => {
      console.log(e);
    },
  };

  const fetchCategory = async () => {
    const result = await getCategoryList();
    const category1 = result.filter((item: any) => item.level === 1);
    const category2 = result.filter((item: any) => item.level === 2);
    setCategory1(category1);
    setCategory2(category2);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className={styles.container}>
      <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
        <Form.Item label="书名" name="name" rules={[{ required: true, message: '请输入书名' }]}>
          <Input placeholder="书名" />
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <Input placeholder="描述" />
        </Form.Item>
        <Form.Item label="一级类目" name="category1" rules={[{ required: true, message: '请选择一级类目' }]}>
          <Select placeholder="请选择一级类目">
            {category1.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="二级类目" name="category2">
          <Select placeholder="请选择二级类目">
            {category2.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="文件" name="file">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
          <List
            style={{ marginTop: '10px' }}
            header={<div>文件列表:</div>}
            bordered
            dataSource={fileList}
            renderItem={(item: any) => (
              <Spin spinning={item.status === 'uploading'}>
                <List.Item>
                  {item.name}
                  <Button
                    style={{ marginLeft: 20 }}
                    type="primary"
                    onClick={() => {
                      copy(item.url);
                      message.success('复制链接成功!');
                    }}
                  >
                    复制链接
                  </Button>
                </List.Item>
              </Spin>
            )}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
