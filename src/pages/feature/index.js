import React from 'react';
import { Card } from 'antd';
import styles from './index.scss';
const Feature = () => {
  return (
    <div className={styles.contentBox}>
      <Card title="功能介绍" className={styles.itemBox}>
        <p>1. 图片上传存储,也支持其他文件上传,大小限制5mb內</p>
        <p>2. 有接入国内cdn,访问速度更快</p>
        <p>3. 无损存储,不会压缩上传图片</p>
        <p>4. 一次只能上传一个文件,生活拮据,变相节流</p>
      </Card>
      <Card title="注意事项" className={styles.itemBox}>
        <p>
          1.
          保存时间为一年,这条要注意,每个文件上传后返回的名字是以时间+文件名保存的,在文件名时间一年以内(暂定,如果使用人数较少,空间足够,会更新这里的保存时间)
        </p>
        <p>2. 违法内容切勿上传,后果自负</p>
        <p>3. 暂不支持删除</p>
        <p>4. 涉及到个人隐私的资源切勿上传</p>
        <p>5. 不会跑路!!!</p>
      </Card>
      <Card title="关于我们" className={styles.itemBox}>
        <p>1. 网站暂无反馈渠道,微信:15115438096</p>
        <p>2. 公益事业,生活拮据,还请不要恶意刷流量,上传无意义内容</p>
      </Card>
    </div>
  );
};

export default Feature;
