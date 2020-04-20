import React from 'react';
import styles from './index.scss';
import UploadAliyun from './component/UploadAliyun';
import Success from './component/Success';
class Img extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.contentBox}>
          <div>
            <h1>图床</h1>
          </div>
          {/* <UploadAliyun></UploadAliyun> */}
          <Success></Success>
        </div>
      </div>
    );
  }
}

export default Img;
