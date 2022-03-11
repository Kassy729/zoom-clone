import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

console.log("Hello");

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); //static assets
app.use("/public", express.static(__dirname + "/public"));

// function handleReq(req, res) {
//   res.render("home");
// }
app.get("/", (_, res) => {
  res.render("home");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// app.listen(3000);
function handleListen() {
  console.log("Listening on port 3000");
}
server.listen(3000, handleListen);

// function handleConnection(socket) {
//   // console.log(socket);
//   console.log("Connected to Browser");
//   socket.send("Hello!!");
// }

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to a Browser");
  socket.send("Hello!");
  socket.on("close", () => {
    console.log("Disconnected from the Browser");
  });
  socket.on("message", (msg) => {
    //클라이언트에서 받은 메세지를 받는 부분
    console.log(Buffer.from(msg, "base64").toString("utf-8"));
    // socket.send(Buffer.from(msg, "base64").toString("utf-8"));
    // 연결된 모든 클라이언트에게 msg를 send 한다.
    sockets.forEach((aSocket) => {
      aSocket.send(Buffer.from(msg, "base64").toString("utf-8"));
    });
  });
});
