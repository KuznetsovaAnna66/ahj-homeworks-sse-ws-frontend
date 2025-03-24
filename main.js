/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// CONCATENATED MODULE: ./src/components/modal/Modal.js

class Modal {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.form = document.createElement("form");
    this.form.classList.add("modal__form");
    this.title = document.createElement("h3");
    this.title.classList.add("modal__title");
    this.title.textContent = "Choose your nickname";
    this.label = document.createElement("label");
    this.label.classList.add("modal__label", "visually-hidden");
    this.label.htmlFor = "name";
    this.label.textContent = "Choose your nickname";
    this.input = document.createElement("input");
    this.input.classList.add("modal__input");
    this.input.id = "name";
    this.input.type = "text";
    this.input.placeholder = "Enter your nickname";
    this.input.required = true;
    this.tooltip = document.createElement("p");
    this.tooltip.classList.add("modal__tooltip", "visually-hidden");
    this.button = document.createElement("button");
    this.button.classList.add("modal__btn");
    this.button.type = "submit";
    this.button.textContent = "Join the chat";
    this.form.append(this.title, this.label, this.input, this.tooltip, this.button);
    this.modal.append(this.form);
    document.body.append(this.modal);
  }
  hide() {
    this.modal.classList.add("hidden");
  }
  showTooltip(text) {
    this.tooltip.classList.remove("visually-hidden");
    this.tooltip.textContent = text;
  }
  hideTooltip() {
    this.tooltip.classList.add("visually-hidden");
  }
  getInputValue() {
    this.input.value = this.input.value.trim();
    return this.input.value;
  }
  submitEvent(handler) {
    this.form.addEventListener("submit", handler);
  }
  removeForm() {
    this.modal.remove();
  }
}
;// CONCATENATED MODULE: ./src/js/server/createRequest.js
async function createRequest(options) {
  // const baseUrl = "http://localhost:3000"; // локальный сервер
  const baseUrl = "https://ahj-homeworks-sse-ws-backend-4lat.onrender.com"; // сервер на Render

  const {
    method,
    url,
    body
  } = options;
  try {
    const response = await fetch(baseUrl + url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    // проверка подключения к серверу:
    if (response.status === 204) {
      return {
        status: response.status,
        message: "Server found!"
      };
    }
    return await response.json();
  } catch (err) {
    return {
      error: true,
      status: 520
    };
  }
}
;// CONCATENATED MODULE: ./src/js/server/Service.js

class Service {
  // проверка связи с сервером:
  static async pingServer() {
    const options = {
      method: "GET",
      url: "/ping-server"
    };
    const data = await createRequest(options);
    return data;
  }

  // регистрация нового юзера на сервере:
  static async registerUser(name) {
    const options = {
      method: "POST",
      url: "/new-user",
      body: {
        name
      }
    };
    const data = await createRequest(options);
    return data;
  }
}
;// CONCATENATED MODULE: ./src/components/chat/Chat.js

class Chat {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("Container must be an HTML element");
    }
    this.container = container;
    this.chat = document.createElement("div");
    this.chat.classList.add("chat");
    this.messages = document.createElement("div");
    this.messages.classList.add("messages");
    this.form = document.createElement("form");
    this.form.classList.add("chat__form");
    this.label = document.createElement("label");
    this.label.classList.add("chat__label", "visually-hidden");
    this.label.for = "text";
    this.label.textContent = "Type a message";
    this.input = document.createElement("input");
    this.input.classList.add("chat__input");
    this.input.id = "text";
    this.input.placeholder = "Type a message";
    this.input.required = true;
    this.btn = document.createElement("button");
    this.btn.classList.add("chat__btn");
    this.form.append(this.label, this.input, this.btn);
    this.chat.append(this.messages, this.form);
    this.container.appendChild(this.chat);
  }
  addSubmitEvent(handler) {
    this.form.addEventListener("submit", handler);
  }
  getMessages() {
    return this.input.value.trim();
  }
  addMessage(msgInfo, msgText, isYours) {
    const message = document.createElement("div");
    message.classList.add("message");
    const info = document.createElement("div");
    info.classList.add("message__info");
    info.textContent = msgInfo;
    if (isYours) {
      message.classList.add("message_right");
      info.classList.add("message__info_you");
    }
    const text = document.createElement("div");
    text.classList.add("message__text");
    text.textContent = msgText;
    message.append(info, text);
    this.messages.append(message);
  }
  resetForm() {
    this.form.reset();
  }
}
;// CONCATENATED MODULE: ./src/components/users/Users.js

class Users {
  constructor(container) {
    this.container = container;
    this.users = document.createElement("div");
    this.users.classList.add("users");
    this.container.append(this.users);
  }
  addUser(nickName) {
    const user = document.createElement("div");
    user.classList.add("user");
    const photo = document.createElement("div");
    photo.classList.add("user__photo");
    photo.textContent = nickName.slice(0, 1).toUpperCase();
    const name = document.createElement("div");
    name.classList.add("user__name");
    name.textContent = nickName;
    if (nickName === "You") {
      name.classList.add("user__name_you");
    }
    user.append(photo, name);
    this.users.append(user);
  }
  deleteUsers() {
    [...this.users.children].forEach(child => child.remove());
  }
}
;// CONCATENATED MODULE: ./src/pic/spinner.svg
const spinner_namespaceObject = __webpack_require__.p + "32cc3a8b2e4b59bacdc0.svg";
;// CONCATENATED MODULE: ./src/components/spinner/Spinner.js


class Spinner {
  constructor() {
    this.spinner = document.createElement("img");
    this.spinner.classList = "spinner";
    this.spinner.alt = "preloader";
    this.spinner.src = spinner_namespaceObject;
    document.body.append(this.spinner);
  }
  removeSpinner() {
    this.spinner.remove();
  }
}
;// CONCATENATED MODULE: ./src/js/Controller.js





class Controller {
  constructor(container) {
    this.container = container;
  }
  async init() {
    this.spinner = new Spinner(); // запускаем спиннер ожидания
    const server = await Service.pingServer(); // ждём ответа от сервера
    this.spinner.removeSpinner(); // убираем спиннер после получения ответа от сервера

    this.renderModal();
  }
  renderModal() {
    this.modal = new Modal();
    const inputField = this.modal.input;
    if (inputField) {
      inputField.addEventListener("input", () => {
        this.modal.hideTooltip(); // Скрываем tooltip при вводе текста
      });
      this.modal.submitEvent(this.addModalSubmitEvent.bind(this));
    }
  }
  async addModalSubmitEvent(event) {
    event.preventDefault();
    const name = this.modal.getInputValue();
    const data = await Service.registerUser(name);
    if (data.status === "error") {
      this.modal.showTooltip("This nickname is taken. Please, choose another one.");
      return;
    }
    if (data.status === "ok") {
      this.currentId = data.user.id; // свой id
      this.currentName = data.user.name; // своё имя

      window.addEventListener("beforeunload", this.exit.bind(this)); // перед закрытием страницы...

      this.modal.removeForm(); // удаляем модалку из DOM
      this.renderPage();
    }
  }
  exit() {
    const msg = {
      type: "exit",
      user: {
        id: this.currentId,
        name: this.currentName
      }
    };
    this.ws.send(JSON.stringify(msg)); // отправка данных через ws-соединение
  }
  renderPage() {
    this.container.classList.remove("hidden"); // отрисовка контейнера для всего контента
    this.usersContainer = new Users(this.container); // отрисовка контейнера для юзеров
    this.chatContainer = new Chat(this.container); // отрисовка контейнера для сообщений
    this.chatContainer.addSubmitEvent(this.addChatSubmitEvent.bind(this));
    this.connectToWebSocket();
  }
  connectToWebSocket() {
    // this.ws = new WebSocket("ws://localhost:3000/ws"); // локальный сервер
    this.ws = new WebSocket("wss://ahj-homeworks-sse-ws-backend-4lat.onrender.com/ws"); // сервер на Render

    this.ws.addEventListener("message", event => {
      const data = JSON.parse(event.data);

      // отрисовка сообщений у всех юзеров:
      if (data.type === "send") {
        const name = data.user.id === this.currentId ? "You" : data.user.name;
        const info = `${name}, ${data.created}`;
        this.chatContainer.addMessage(info, data.msg, name === "You"); // 'Anna, 20:50 19.09.2024', 'Hello!', true
        this.chatContainer.resetForm(); // очищаем форму
        return;
      }

      // обновление списка юзеров при входе/выходе каждого юзера:
      this.usersContainer.deleteUsers(); // 1. полная очистка списка юзеров

      data.forEach(user => {
        const name = user.id === this.currentId ? "You" : user.name;
        this.usersContainer.addUser(name); // 2. добавление заново всех юзеров, которые онлайн
      });
    });
  }
  addChatSubmitEvent(event) {
    event.preventDefault();
    const message = this.chatContainer.getMessages();
    if (!message) {
      this.chatContainer.resetForm(); // очищаем форму
      return;
    }
    this.sendMsg(message);
  }
  sendMsg(message) {
    const date = new Date(Date.now()).toLocaleString("ru-Ru", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    const formattedDate = date.split(", ").reverse().join(" ");
    const msg = {
      type: "send",
      msg: message,
      user: {
        id: this.currentId,
        name: this.currentName
      },
      created: formattedDate
    };
    this.ws.send(JSON.stringify(msg)); // отправка данных через ws-соединение
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const controller = new Controller(container);
  controller.init();
});
// const root = document.getElementById("root");

// const app = new Chat(root);

// app.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;