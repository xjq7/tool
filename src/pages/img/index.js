import React from 'react';
import styles from './index.scss';
import UploadAliyun from './component/UploadAliyun';
import Success from './component/Success';
import { message, Card } from 'antd';
import { getFolderList } from './service';
class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      successUpload: false,
      total: 0
    };
  }

  async componentDidMount() {
    try {
      const {
        code,
        data: { total },
        msg
      } = await getFolderList();
      if (code) {
        this.setState({ total });
      } else {
        message.error(msg);
      }
    } catch (error) {
      this.setState({ total: '请求失败' });
      message.error(error.message);
    }
  }
  changeUpload(bool) {
    this.setState({ successUpload: bool });
  }
  render() {
    const { url, successUpload, total } = this.state;
    return (
      <div className={styles.root}>
        <Card>
          <span>今日图床上传总数:{total}</span>
        </Card>
        <div className={styles.contentBox}>
          {successUpload ? (
            <Success url={url} uploadNext={this.changeUpload.bind(this, false)}></Success>
          ) : (
            <>
              <div>
                <h1 className={styles.title}>Figure bed</h1>
              </div>
              <UploadAliyun
                viewSuccess={this.changeUpload.bind(this, true)}
                onChange={url => this.setState({ url, successUpload: true, total: total + 1 })}
              ></UploadAliyun>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Img;
