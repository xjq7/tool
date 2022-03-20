import { useState } from 'react';
import Upload from '@components/upload';
import { message, List, Button } from 'antd';
import useAliyunOss from '@hooks/useAliyunOss';
import copy from 'copy-to-clipboard';
import styles from './index.module.less';

function Img() {
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  const [total, setTotal] = useState(0);

  const { ossStore } = useAliyunOss();

  const upload = async (r: any) => {
    const { file } = r;
    const { name } = file;
    const date = new Date();
    const YY = date.getFullYear();
    const MM = date.getMonth() + 1;
    const DD = date.getDate();
    let folder = `/${YY}/${MM}/${DD}/`;
    let reNameAsDate = `${Date.now()}_`;
    try {
      const res = await ossStore.put(`${folder}${reNameAsDate}${name}`, file);
      const { url } = res;
      setFiles([...files, { url, name }]);
      setTotal(total + 1);
      message.success(`${name}上传成功!`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.contentBox}>
          <div>
            <h1 className={styles.title}>Figure bed</h1>
          </div>
          <Upload upload={upload}></Upload>
        </div>

        <List
          header={<div>文件列表:</div>}
          bordered
          dataSource={files}
          renderItem={(item) => (
            <List.Item>
              {item.name.length < 30 ? item.name : item.name.substr(0, 30) + '......'}
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
          )}
        />
      </div>
    </div>
  );
}

export default Img;
