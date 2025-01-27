const registros = [];
const prestadores = [
    "PJ 1", "PJ 2", "PJ 3", "PJ 4", "PJ 5" // Adicione os nomes aqui
];

// Carregar Prestadores no Dropdown
const dropdown = document.getElementById("pj-dropdown");
prestadores.forEach(nome => {
    const option = document.createElement("option");
    option.value = nome;
    option.textContent = nome;
    dropdown.appendChild(option);
});

// Registrar Entrada
function registrarEntrada() {
    const nome = dropdown.value;
    if (!nome) {
        alert("Selecione um prestador de serviço.");
        return;
    }

    const registro = {
        nome,
        tipo: "Entrada",
        dataHora: new Date().toLocaleString()
    };
    registros.push(registro);
    atualizarTabela();
}

// Registrar Saída
function registrarSaida() {
    const nome = dropdown.value;
    if (!nome) {
        alert("Selecione um prestador de serviço.");
        return;
    }

    const registro = {
        nome,
        tipo: "Saída",
        dataHora: new Date().toLocaleString()
    };
    registros.push(registro);
    atualizarTabela();
}

// Atualizar Tabela
function atualizarTabela() {
    const tabela = document.getElementById("registros-tabela");
    tabela.innerHTML = "";

    registros.forEach((registro, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${registro.nome}</td>
            <td>${registro.tipo}</td>
            <td>${registro.dataHora}</td>
            <td>
                <button onclick="removerRegistro(${index})">Remover</button>
            </td>
        `;

        tabela.appendChild(row);
    });
}

// Remover Registro
function removerRegistro(index) {
    registros.splice(index, 1);
    atualizarTabela();
}

// Exportar para Excel
function exportarExcel() {
    const ws = XLSX.utils.json_to_sheet(registros);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registros");
    XLSX.writeFile(wb, "registros_portaria.xlsx");
}

// Filtro por Data
document.getElementById("date-filter").addEventListener("change", (event) => {
    const dataSelecionada = event.target.value;

    const tabela = document.getElementById("registros-tabela");
    tabela.innerHTML = "";

    registros
        .filter(registro => registro.dataHora.startsWith(dataSelecionada))
        .forEach((registro, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${registro.nome}</td>
                <td>${registro.tipo}</td>
                <td>${registro.dataHora}</td>
                <td>
                    <button onclick="removerRegistro(${index})">Remover</button>
                </td>
            `;

            tabela.appendChild(row);
        });
});
