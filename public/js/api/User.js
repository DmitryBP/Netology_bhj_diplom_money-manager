class User {
  static URL = '/user';

  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {
    return JSON.parse(localStorage.getItem('user')) || undefined;
  }

  static fetch(fetchCallBack) {
    createRequest({
      url: `${this.URL}/current`,
      method: 'GET',
      callback: (e, res) => {
        if (e) {
          fetchCallBack(err, null);
          return;
        }
        if (res && res.user) {
          this.setCurrent(res.user);
        } else {
          this.unsetCurrent();
        }
        fetchCallBack(null, res);
      },
    });
  }

  static login(data, loginCallback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data: data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        loginCallback(err, response);
      },
    });
  }

  static register(data, callback) {
    const { name, email, password } = data;
    if (name && email && password) {
      createRequest({
        url: this.URL + '/register',
        method: 'POST',
        data,
        callback: (err, response) => {
          if (response && response.user) {
            this.setCurrent(response.user);
          } else {
            console.log(err);
          }
          callback(err, response);
        },
      });
    }
  }

  static logout(logoutCallback) {
    // почему не работает
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        if (response) {
          this.unsetCurrent();
        }
        logoutCallback(err, response);
      },
    });
  }
}

// const data = {
//   email: 'd2@d.ru',
//   password: 'test',
// };

// const loginCallback = (e, res) => console.log(!res.error?'Залогинился':'не получилось', e, res, User.current());
// User.login(data, loginCallback);

// const logoutCallback = (err, response) => console.log('Разлогинился', err, response, User.current());
// User.logout(logoutCallback);
