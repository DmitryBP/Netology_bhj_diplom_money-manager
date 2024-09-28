/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      console.log(element);
      throw new Error('Пустой элемент');
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const closeElements = this.element.querySelectorAll('[data-dismiss=modal]');
    closeElements.forEach((el) => {
      el.addEventListener('click', this.onClose.bind(this));
    });
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose() {
    this.close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = '';
  }
  
  static errMessage(text, form) {
    const errMessage = document.createElement('div');
    errMessage.innerHTML = `<div class = 'err-message' style='color:red'>${text}</div>`;
    const modalElement = App.getModal(form).element.querySelector('.modal-body');
    const existErrmessage = modalElement.querySelector('.err-message');
    if (!existErrmessage) {
      modalElement.append(errMessage);
    }
  }
}

// const login = new Modal(document.querySelector('#modal-login'));
// login.open();
