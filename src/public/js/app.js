console.log("HI");

//3000번 포트로 소켓 요청
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server!");
});

socket.addEventListener("message", (msg) => {
  //메세지를 돌려받으면 이 이벤트 호출
  console.log("just got this:", msg.data, "from the server");
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
