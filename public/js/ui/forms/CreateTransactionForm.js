class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.element = element;
  }

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

  onSubmit(data) {
    console.log(data);
    Transaction.create(data, (err, res) => {
      if (err) {
        console.error(err);
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
      const activeAccount = document.querySelector(`[data-id="${data.account_id}"]`); 

      // Передача активного аккаунта в accountsWidget.js
      const accountsWidget = App.getWidget('accounts');
      accountsWidget.onSelectAccount(activeAccount);

      App.showPage('transactions', { id: data.account_id });
    });
  }
}
