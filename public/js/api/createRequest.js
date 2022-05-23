/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest;
  
  if (options.method == 'GET') {
    /* Не могу разобраться куда отправлять запрос в примере https://exemple.com
    в ДЗ давались конкретные ссылки здесь в описании такой ссылки не нашел
     */
    xhr.open('GET', `https://exemple.com?mail=${options.data.mail}&password=${options.data.password}`);
    xhr.send();
  } else {
    const xhr = new XMLHttpRequest,
      formData = new FormData;
      formData.append('mail', options.data.mail);
      formData.append('password', options.data.password);

      xhr.open('POST', 'https://exemple.com');
      xhr.send(formData)
  }
};
