/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const pushMenuBtnElement = document.querySelector('[data-toggle="push-menu"]');
    const body = document.querySelector('body');
    pushMenuBtnElement.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sideBarElement = document.querySelector('.sidebar-menu');
    const enterElement = sideBarElement.querySelector('.menu-item_login>a');
    const registerElement = sideBarElement.querySelector('.menu-item_register>a');
    const logoutElement = sideBarElement.querySelector('.menu-item_logout>a');

    sideBarElement.addEventListener('click', (event) => {
      if (event.target.closest('.menu-item_login a') === enterElement) App.getModal('login').open();
      if (event.target.closest('.menu-item_register a') === registerElement) App.getModal('register').open();
      if (event.target.closest('.menu-item_logout a') === logoutElement) {
        User.logout((err, res)=>{
          if(res.success){
            App.setState( 'init' )
          }
        });
      }
    });
  }
}
