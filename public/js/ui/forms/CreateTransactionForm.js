/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.element = element;
    // this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const incomeSelect = App.getForm('createIncome').element.querySelector('#income-accounts-list');
    const expenseSelect = App.getForm('createExpense').element.querySelector('#expense-accounts-list');

    Account.list(User.current(), (err, res) => {
      if (err) {
        console.error(err); // Обработка ошибок
        return;
      }

      if (!res.success) {
        console.error('Сервер вернул ошибку:', res.error);
        return;
      }

      const renderSelect = (select, data) => {
        select.innerHTML = '';
        data.forEach((el) => {
          select.innerHTML += `
            <option value="${el.id}">${el.name}</option>
          `;
        });
      };

      renderSelect(incomeSelect, res.data);
      renderSelect(expenseSelect, res.data);
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    console.log(data);
    Transaction.create(data, (err, res) => {
      if (err) {
        console.error(err); // Обработка ошибок
        return;
      }

      if (!res.success) {
        console.error('Сервер вернул ошибку: ', res.error);
        return;
      }

      this.element.reset();
      App.getModal('newIncome').close();
      App.getModal('newExpense').close();
      App.update();
    });
  }
}

