import fetch from './fetch';
function get(url, data) {
  return new Promise((resolve, reject) => {
    fetch
      .get(url, { params: data })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default get;
