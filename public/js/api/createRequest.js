/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  try {
    if (options.method == "GET") {
      xhr.open(
        "GET",
        `${options.URL}?mail=${options.data.mail}&password=${options.data.password}`
      );
      xhr.send();
    } else {
      formData = new FormData();
      xhr.responseType = "json";
      formData.append("mail", options.data.mail);
      formData.append("password", options.data.password);
      xhr.open("POST", options.URL);
      xhr.send(formData);
    }
    options.collback(err, response);
  } catch (e) {
    callback(e);
  }
};
