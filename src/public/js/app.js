console.log("HI");

//3000번 포트로 소켓 요청
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server!");
});

const ul = document.querySelector("ul");

socket.addEventListener("message", (msg) => {
  //메세지를 돌려받으면 이 이벤트 호출
  // console.log("just got this:", msg.data, "from the server");
  // 웹페이지의 ul 태그를 찾고
  // 동적으로 li태그를 생성하고
  // 그 li 태그의 내용으로 서버로부터 받은 메시지를 설정하고
  // 그 li를 그 ul 태그의 자식으로 추가한다.
  const li = document.createElement("li"); // <li></li>
  li.innerText = msg.data; //<li>안녕</li>
  ul.appendChild(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from server");
});

// setTimeout(() => {
//   socket.send("Hello from the browser");
// }, 3000);

const messageForm = document.querySelector("form");
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // form 태그 내의 input 태그에 입려고된 값을 읽어온다.
  const input = document.querySelector("input");

  // 그 값을 socket을 통해 WebSocket Server로 전성
  console.log(input.value);
  socket.send(input.value);
  input.value = "";
});

//아이디가 nick인 DOM 객체(Form)를 찾는다.
const nickForm = document.querySelector("#nick");

nickForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("input");
});
