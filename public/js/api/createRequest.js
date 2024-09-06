const createRequest = ({ url, method, data, callback }) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  let formData = null;

  if (method === 'GET') {
    const params = new URLSearchParams(data).toString();
    url = `${url}?${params}`;
  } else {
    formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
  }

  xhr.open(method, url);

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
    } else {
      callback(new Error(`Request failed with status ${xhr.status}`), null);
    }
  };

  xhr.onerror = () => {
    callback(new Error('Зарос не направлен, проверьте адрес запроса'), null);
  };

  try {
    xhr.send(formData);
  } catch (e) {
    callback(e, null);
  }
};

// createRequest({
//   url: 'user/login',
//   method: 'POST',
//   data: {
//     email: '1@1.ru',
//     password: '1234',
//   },
//   callback: (err, response) => {
//     console.log(err, 'e');
//     console.log(response, 'r');
//   },
// });
