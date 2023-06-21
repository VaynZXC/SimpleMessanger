const applicantForm = document.getElementById('form')
applicantForm.addEventListener('submit', function(event) {
  event.preventDefault()
  console.log('Отправка!')
})

const wsUri = "wss://echo-ws-service.herokuapp.com";
const btnNode = document.querySelector('.j-btn')
const output = document.querySelector('.message-place')
const btnOpen = document.querySelector('.open-btn')

let websocket;

function writeToScreen(message) {
  let pre = document.createElement('p');
  pre.innerHTML = message;
  output.appendChild(pre)
}

btnOpen.addEventListener('click', () => {
  websocket = new websocket(wsUri)
  websocket.onopen = function(evt) {
    writeToScreen('Connected')
  };
  websocket.onclose = function(evt) {
    writeToScreen('Disconnected')
  };
  websocket.onmessage = function(evt) {
    writeToScreen('<span>Response:</span>' + evt.data);
  };
  websocket.onerror = function(evt) {
    writeToScreen('<span style="color: red;">Error:<span>' + evt.data)
  };
})

btnNode.addEventListener('click', () => {
  const message = document.querySelector('.input-place').value;
  console.log(message)
  websocket.send(message)
}); 