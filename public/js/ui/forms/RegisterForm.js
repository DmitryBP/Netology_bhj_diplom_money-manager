/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, res) => {
      if (err) {
        console.error('Ошибка на стороне сервера:', err);
        return;
      }
      if (res.success) {
        this.element.reset();
        App.setState('user-logged');
        App.getModal('register').close();
      } else {
        Modal.errMessage(res.error, 'register');
      }
    });
  }
}
