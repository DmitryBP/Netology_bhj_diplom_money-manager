/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(this.getData(), (err, res) => {
      if (err) {
        console.error(err); // Обработка ошибок
        return;
      }

      if (!res.success) {
        console.error('Сервер вернул ошибку: ', res.error);
        return;
      }
      const successMessaga = document.createElement('div')
      successMessaga.classList.add('success-message');
      this.element.append(successMessaga);
      this.element.querySelector('.success-message').innerHTML = 'Счёт успешно создан!';
      setTimeout(() => {
        this.element.reset();
        App.getModal('createAccount').close();
        App.update();
      }, 2000);
    });
  }
}
