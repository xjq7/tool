import React from 'react';
import styles from './index.scss';
import UploadAliyun from './component/UploadAliyun';
import Success from './component/Success';
class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      successUpload: false
    };
  }
  render() {
    const { url, successUpload } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.contentBox}>
          {successUpload ? (
            <Success url={url} uploadNext={() => this.setState({ successUpload: false })}></Success>
          ) : (
            <>
              <div>
                <h1 className={styles.title}>Figure bed</h1>
              </div>
              <UploadAliyun onChange={url => this.setState({ url, successUpload: true })}></UploadAliyun>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Img;
