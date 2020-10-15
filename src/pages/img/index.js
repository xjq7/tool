import React from 'react';
import UploadAliyun from './component/UploadAliyun';
import { message, Card, List, Button } from 'antd';
import { getFolderList } from './service';
import styles from './index.scss';
import copy from 'copy-to-clipboard';
class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      total: 0,
      currentTotal: 0
    };
  }

  async componentDidMount() {
    const {
      data: { total }
    } = await getFolderList();

    this.setState({ total });
  }
  render() {
    const { files, total, currentTotal } = this.state;
    return (
      <div>
        <Card>
          <span>今日图床上传总数:{total}</span>
        </Card>

        <div className={styles.contentBox}>
          <div>
            <h1 className={styles.title}>Figure bed</h1>
          </div>
          <UploadAliyun
            loading
            currentTotal={currentTotal}
            addCurrentTotal={() => this.setState({ currentTotal: currentTotal + 1 })}
            onChange={({ url, name }) => {
              const { files } = this.state;
              files.push({ url, name });
              this.setState({ files, total: total + 1 });
            }}
          ></UploadAliyun>
        </div>

        <List
          className={styles.list_container}
          header={<div>文件列表:</div>}
          bordered
          dataSource={files}
          renderItem={item => (
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
    );
  }
}

export default Img;
