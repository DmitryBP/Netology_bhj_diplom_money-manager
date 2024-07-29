/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function createRequest(options) {}







const data = {
  url: '/user/current', // адрес
  data: {
    // произвольные данные, могут отсутствовать
    email: 'ivan@poselok.ru',
    password: 'odinodin',
  },
  method: 'GET', // метод запроса
  /*
  Функция, которая сработает после запроса.
  Если в процессе запроса произойдёт ошибка, её объект
  должен быть в параметре err.
  Если в запросе есть данные, они должны быть переданы в response.
  */
  callback: (err, response) => {
    console.log('Ошибка, если есть', err);
    console.log('Данные, если нет ошибки', response);
  },
};

createRequest(data);
















// function createRequest(options) {
//   const xhr = new XMLHttpRequest();

//   xhr.open(options.method || 'GET', options.url);
//   xhr.responseType = 'json';

//   if (options.method === 'POST' || options.method === 'PUT') {
//     const formData = new FormData();
//     for (let key in options.data) {
//       formData.append(key, options.data[key]);
//     }
//     xhr.send(formData);
//   } else {
//     const queryString = Object.keys(options.data)
//       .map(key => `${key}=${options.data[key]}`)
//       .join('&');
//     xhr.send(queryString);
//   }

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       if (xhr.status === 200) {
//         options.callback(null, xhr.response);
//       } else {
//         options.callback({
//           status: xhr.status,
//           statusText: xhr.statusText
//         });
//       }
//     }
//   };

//   xhr.onerror = () => {
//     options.callback({
//       status: xhr.status,
//       statusText: xhr.statusText
//     });
//   };
// }
