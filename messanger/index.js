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
  const messageCard = `      
    <div class="zxc1">
      <div class="message1">
        <p>${message}</p>
      </div>
    </div>
    `
  output.innerHTML += messageCard
}

btnOpen.addEventListener('click', () => {
  websocket = new WebSocket(wsUri)
  websocket.onopen = function(evt) {
    const messageCard = `
    <div class="connected">
      <div class="message3">
        <p>CONNECTED</p>
      </div>
    </div>
    `
    output.innerHTML += messageCard;
  };
  websocket.onclose = function(evt) {
    const messageCard = `
    <div class="connected">
      <div class="message4">
        <p>DISCONNECTED</p>
      </div>
    </div>
    `
    output.innerHTML += messageCard;
  };
  websocket.onmessage = function(evt) {
    const messageCard = `
    <div class="zxc2">
      <div class="message2">
        <p>${evt.data}</p>
      </div>
    </div>
    `
    output.innerHTML += messageCard;
  };
  websocket.onerror = function(evt) {
    writeToScreen('<span style="color: red;">Error:<span>' + evt.data)
  };
})

btnNode.addEventListener('click', () => {
  const message = document.querySelector('.input-place').value;
  writeToScreen(message)
  websocket.send(message)
}); 

const error = () => {
  status.textContent = 'Невозможно получить ваше метоположение';
}

const sucess = (position) => {
  const mapLink = document.querySelector(`.geo-message${i}`)
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  mapLink.href =  `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}

const btnGeo = document.querySelector('.geo')

let i = 0

btnGeo.addEventListener('click', () => {
  i += 1
  const aClass = `geo-message${i}`
  const geolocationNode = `
  <div class="zxc1">
    <div class="message1">
      <a class="${aClass}" href="" target="_blank"></a>
    </div>
  </div>
  `
  output.innerHTML += geolocationNode
  const mapLink = document.querySelector(`.geo-message${i}`)

  mapLink.href = '';
  mapLink.textContent = '';
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим бораузеров';
  } else {
    navigator.geolocation.getCurrentPosition(sucess, error);
  }
})