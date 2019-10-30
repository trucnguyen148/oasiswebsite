const URL = 'http://127.0.0.1:8000/api/';

//const URL = 'http://oasisvn.tk:8888/api/';

const makeRequest = (method, url, data) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    if (data === undefined) {
      xhr.send()
    } else {
      xhr.send(data);
    }

  });
}

export {
  URL,
  makeRequest
}