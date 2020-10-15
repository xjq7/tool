import React from 'react';
import { Card, Col } from 'antd';
import styles from './index.scss';
const Announcement = () => {
  return (
    <div style={{ width: '100%' }}>
      <Col xs={10} sm={14} md={20}>
        <div style={{ height: 200, background: 'lime' }}></div>
      </Col>
      {/* <Card title="功能介绍" style={{ width: 600 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card> */}
    </div>
  );
};

export default Announcement;
