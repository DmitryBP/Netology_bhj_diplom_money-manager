/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, res) => {
      if (err) {
        console.error('Ошибка на стороне сервера:', err);
        return;
      }
      if (res.success) {
        this.element.reset();
        App.setState('user-logged');
        App.getModal('login').close();
        // new Modal(App.getModal('login').element).close();
      } else {
        Modal.errMessage(res.error, 'login');
      }
    });
  }
}
