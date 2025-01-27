const socket = io(); // Conectar ao servidor

const tabela = document.getElementById("registros-tabela");

// Atualizar tabela com registros recebidos do servidor
socket.on("atualizarRegistros", (registros) => {
    tabela.innerHTML = ""; // Limpar tabela
    registros.forEach((registro) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${registro.nome}</td>
            <td>${registro.tipo}</td>
            <td>${registro.dataHora}</td>
        `;
        tabela.appendChild(linha);
    });
});

// Adicionar novo registro
function adicionarRegistro(tipo) {
    const nome = prompt("Digite o nome do prestador de serviço:");
    if (nome) {
        const registro = {
            nome,
            tipo,
            dataHora: new Date().toLocaleString(),
        };
        socket.emit("adicionarRegistro", registro); // Enviar para o servidor
    }
}

// Limpar todos os registros
function limparRegistros() {
    if (confirm("Deseja realmente limpar todos os registros?")) {
        socket.emit("limparRegistros"); // Enviar comando para o servidor
    }
}
