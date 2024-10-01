class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Пустой элемент');
    }

    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('create-account')) {
        App.getModal('createAccount').open();
      } else if (e.target.closest('.account')) {
        this.onSelectAccount(e.target.closest('.account'));
      }
    });
  }

  update() {
    if (User.current()) {
      Account.list(User.current(), (err, res) => {
        if (err) {
          console.error('Ошибка на стороне сервера:', err);
          return;
        }
        if (res.success) {
          this.clear();

          this.renderItem(res.data);
        } else {
          Modal.errMessage(res.error, 'login');
        }
      });
    }
  }

  clear() {
    const accountElements = document.querySelectorAll('.account');
    accountElements.forEach((account) => account.remove());
  }

  onSelectAccount(element) {
    this.activeAccount = this.element.querySelector('.active');
    this.activeAccount?.classList.remove('active');
    element.classList.add('active');
    this.activeAccount = this.element.querySelector('.active');
    App.showPage('transactions', { id: element.dataset.id });
  }

  getAccountHTML(item) {
    return `<li class="account" data-id="${item.id}">
                <a href="#">
                    <span>${item.name}</span> /
                    <span>${item.sum} ₽</span>
                </a>
            </li>`;
  }

  renderItem(data) {
    data.forEach((item) => this.element.insertAdjacentHTML('beforeEnd', this.getAccountHTML(item)));
    const activId = this.activeAccount?.dataset.id;
    const activeAccount = this.element.querySelector(`[data-id="${activId}"]`);
    activeAccount?.classList.add('active');
  }
}
