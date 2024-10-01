
class TransactionsWidget {

  constructor( element ) {
    if (!element) {
      throw new Error('Пустой элемент');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('click', (e) => {
      if(e.target.classList.contains('create-income-button')){
        App.getModal('newIncome').open();
      } else {
        App.getModal('newExpense').open();
      }
    })
  }
}
