import React, { useEffect } from 'react';
import SparkMD5 from 'spark-md5';

function Hash() {
  useEffect(() => {
    document.getElementById('file').addEventListener('change', function() {
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        file = this.files[0],
        chunkSize = 1024 * 1024 * 2, // Read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader();

      fileReader.onload = function(e) {
        console.log('read chunk nr', currentChunk + 1, 'of', chunks);
        spark.append(e.target.result); // Append array buffer
        currentChunk++;

        if (currentChunk < chunks) {
          loadNext();
        } else {
          console.log('finished loading');
          console.info('computed hash', spark.end()); // Compute hash
        }
      };

      fileReader.onerror = function() {
        console.warn('oops, something went wrong.');
      };

      function loadNext() {
        var start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }

      loadNext();
    });
  }, []);

  return (
    <div>
      <input id="file" type="file" />
    </div>
  );
}
export default Hash;
