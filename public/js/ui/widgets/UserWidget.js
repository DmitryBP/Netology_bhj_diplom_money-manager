
class UserWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Пустой элемент');
    }
    this.element = element;
  }

  update() {
    const userName = document.querySelector('.user-name');
    if(User.current()){
      userName.textContent = User.current().name
    }
    
  }
}
