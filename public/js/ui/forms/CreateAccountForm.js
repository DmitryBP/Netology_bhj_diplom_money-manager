class CreateAccountForm extends AsyncForm {

  onSubmit(data) {
    Account.create(data, (err, res) => {
      if (err) {
        console.error(err); 
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
