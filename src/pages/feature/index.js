import React from 'react';
import { Card } from 'antd';
import styles from './index.scss';
const Feature = () => {
  return (
    <div>
      <Card title="功能介绍" style={{ width: 600 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="注意事项" style={{ width: 600 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="关于我们" style={{ width: 600 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default Feature;
