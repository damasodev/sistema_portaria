const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir arquivos estáticos
app.use(express.static("public"));

// Lista para armazenar registros
let registros = [];

// Conexão com os clientes
io.on("connection", (socket) => {
    console.log("Novo cliente conectado");

    // Enviar registros existentes ao novo cliente
    socket.emit("atualizarRegistros", registros);

    // Adicionar registro
    socket.on("adicionarRegistro", (registro) => {
        registros.push(registro);
        io.emit("atualizarRegistros", registros); // Enviar para todos os clientes
    });

    // Limpar registros
    socket.on("limparRegistros", () => {
        registros = [];
        io.emit("atualizarRegistros", registros);
    });
});

// Iniciar o servidor
const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});
