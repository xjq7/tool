import  { useRef, useState } from 'react';
import { Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styles from './index.module.less';
const { Dragger } = Upload;

const Index = ({ upload }:any) => {
  const [loading, setLoading] = useState(false);
  const uploadQueueRef = useRef(new Set());
  const _upload = async (r: any) => {
    if (loading && uploadQueueRef.current.size === 6) {
      message.error('最多同时上传 5 个文件!');
    }
    if (uploadQueueRef.current.size > 5) {
      return;
    }
    if (!loading) setLoading(true);
    const { file } = r;
    try {
      await upload(r);
    } catch (error) {
      console.log(error);
    } finally {
      uploadQueueRef.current.delete(file.uid);
      if (uploadQueueRef.current.size === 0) {
        setLoading(false);
      }
    }
  };

  const uploadParams = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    customRequest: _upload,
    beforeUpload(file: File) {
      const isLt5M = file.size / 1024 / 1024 > 10;
      if (isLt5M) {
        message.error('请选择小于10 mb 的文件');
        return false;
      }
    },
  };
  return (
    <Spin spinning={loading} tip="上传中...">
      <Dragger {...uploadParams} className={styles.draggerBox}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">选择文件(10 mb 以下)</p>
      </Dragger>
    </Spin>
  );
};


export default Index;
