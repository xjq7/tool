import React, { useState } from 'react';
import { Input, Button, Tag, Row, Col, message } from 'antd';
import { detectHost, getUrls } from './service';
import copy from 'copy-to-clipboard';
import styles from './style.scss';

const { Search } = Input;

function Pac() {
  const [urls, setUrls] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const onSearch = async v => {
    if (!/^(http|https):\/\//g.test(v)) {
      message.error('请输入完整地址,如https://www.example.com');
      return;
    }

    v = v.trim();
    setSearchLoading(true);
    try {
      const urlsRes = await getUrls({ address: v });
      const { code, msg, data } = urlsRes;

      if (code) {
        const { data: detectHostRes } = await detectHost({ urls: data.join(',') });
        setUrls(detectHostRes);
      } else {
        message.error(JSON.stringify(msg));
      }
    } catch (error) {
      const { message: errorMsg } = error || {};
      if (errorMsg) {
        message.error(errorMsg);
      } else {
        message.error(JSON.stringify(error));
      }
    } finally {
      setSearchLoading(false);
    }
  };

  const onCopy = () => {
    copy(
      urls.reduce((acc, cur, index) => {
        if (index === 0) {
          return `"${cur}",\n`;
        } else {
          return `${acc}"${cur}",\n`;
        }
      }, '')
    );
    message.success('复制成功!');
  };
  return (
    <Row justify="center" className={styles.container}>
      <Col span={12}>
        <Search
          loading={searchLoading}
          placeholder="请输入网址,例如http://www.example.com"
          onSearch={onSearch}
          enterButton
        />
        <div className={styles.urls}>
          {urls.map((v, i) => (
            <div key={i} className={styles.url}>
              <Tag>{v}</Tag>
            </div>
          ))}
          {!!urls.length && (
            <Button type="primary" onClick={onCopy} className={styles.copy}>
              复制
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
}

export default Pac;
