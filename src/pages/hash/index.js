import React, { useEffect, useState, useRef } from 'react';
import { Button, Progress, message } from 'antd';
import SparkMD5 from 'spark-md5';
import copy from 'copy-to-clipboard';
import styles from './style.scss';

const defaultFileStat = {
  hash: '',
  progress: 0,
  status: 'active'
};

function Hash() {
  const [file, setFile] = useState();
  const [fileStat, setFileStat] = useState(defaultFileStat);
  const fileReaderRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    setFileStat(prev => ({ ...prev, status: 'active', hash: '' }));
    fileReaderRef.current && fileReaderRef.current.abort();

    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      chunkSize = 1024 * 1024 * 2, // Read in chunks of 2MB
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer();

    fileReaderRef.current = new FileReader();

    fileReaderRef.current.onload = function(e) {
      spark.append(e.target.result); // Append array buffer
      currentChunk++;

      if (currentChunk < chunks) {
        const progress = parseInt((currentChunk / chunks) * 100);
        setFileStat(prev => ({ ...prev, progress }));
        loadNext();
      } else {
        const hash = spark.end();
        setFileStat(prev => ({ ...prev, hash, progress: 100, status: 'success' }));
      }
    };

    fileReaderRef.current.onerror = function() {
      setFileStat(prev => ({ ...prev, status: 'exception' }));
    };

    function loadNext() {
      var start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize;

      fileReaderRef.current.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  }, [file]);

  useEffect(() => {
    const getHashFile = document.querySelector('#hash_file');

    getHashFile.addEventListener('change', function() {
      setFile(this.files[0]);
      getHashFile.value = '';
    });
  }, []);

  const renderContentView = () => {
    const { name = '' } = file || {};
    const { progress, hash, status } = fileStat;
    return (
      <div className={styles.content}>
        <span>文件名: {name}</span>
        <Progress type="circle" percent={progress} status={status} style={{ margin: '20px 0' }} />
        <div>
          <span>文件hash值:{hash}</span>
          <Button
            style={{ marginLeft: 5 }}
            size="small"
            type="primary"
            onClick={() => {
              copy(hash);
              message.success('已复制到剪贴板!');
            }}
          >
            复制
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.hash_container}>
        <input id="hash_file" type="file" className={styles.hash_file} />
        <div className={styles.label}>选择文件(计算md5 hash值)</div>
      </div>
      {renderContentView()}
    </div>
  );
}
export default Hash;
