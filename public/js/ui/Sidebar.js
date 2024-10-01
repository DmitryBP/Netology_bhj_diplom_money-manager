
class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const pushMenuBtnElement = document.querySelector('[data-toggle="push-menu"]');
    const body = document.querySelector('body');
    pushMenuBtnElement.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

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
