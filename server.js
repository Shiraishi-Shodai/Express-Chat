// 各種モジュールをインポート
const express = require("express");
// expressを初期化してappに代入
const app = express();
const http = require("http");
const server = http.createServer(app);
// (server)はサーバオブジェクトを引数に代入している
const io = require("socket.io")(server);

// ルートパスにアクセスされたとき(ユーザーがlocalhost:3000にアクセスするたびに、index.htmlを表示
app.get("/", (req, res) => {
    // __dirnameは現在のディレクトリのパスを指す(C:\JavaScript\Express-Chat)
    res.sendFile(__dirname + "/index.html");
    console.log("test");
});

// io.onでクライアントが接続したときの処理を記述
// 第一引数にconnectionを指定することでクライアントと接続されていることを確認できる
// socketはオブジェクト情報が入る
io.on("connection", (socket) => {
    console.log("接続");
    // 下記はクライアントがテキストを送信した時に実行
    socket.on("send message", (msg) => {
        // io.emitで任意のイベントを生成しon(イベント名)でemitに対する処理をする
       io.emit("received message", msg);
    });
});
// ポート3000にアクセスしたとき、app.getを実行
server.listen(process.env.PORT || 3000, () => {
    console.log("listened!");
});