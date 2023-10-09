const formulário = document.querySelector('form');
const lista = [];

// Função para limpar os campos de entrada após a edição ou criação
const clearInputs = () => {
    document.querySelector('#inNome').value = '';
    document.querySelector('#inEmail').value = '';
    document.querySelector('#inCelular').value = '';
    document.querySelector('#inCidade').value = '';
    document.querySelector('#inNome').dataset.index = 'new';
};

// Função para criar um novo cliente e adicioná-lo ao armazenamento local
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
};

// Função para buscar dados de clientes no armazenamento local
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

// Função para ler dados de clientes do armazenamento local
const readClient = () => getLocalStorage();

// Função para limpar a tabela de clientes na interface, exceto a linha de cabeçalho
const clearTable = () => {
    const rows = document.querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) {
        // Comece a partir do índice 1 para evitar remover a primeira linha (linha de cabeçalho)
        rows[i].parentNode.removeChild(rows[i]);
    }
};


// Função para criar uma linha na tabela com dados de um cliente
const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" id="edit-${index}" class="bttEditar">Editar</button>
        <button type="button" id="delete-${index}" class="bttExcluir">Excluir</button>
    </td>`;

    document.querySelector('#tabela').appendChild(newRow);
};

// Função para atualizar a tabela na interface com os dados de clientes
const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
};

// Função para adicionar informações de um cliente e exibi-las na tabela
formulário.addEventListener("submit", (e) => {
    e.preventDefault();
    const client = {
        nome: document.querySelector('#inNome').value,
        email: document.querySelector('#inEmail').value,
        celular: document.querySelector('#inCelular').value,
        cidade: document.querySelector('#inCidade').value
    };

    const index = document.querySelector('#inNome').dataset.index;
    if (index == 'new'){
        createClient(client);
        updateTable();
    } else {
        updateClient(index, client);
        updateTable();
        document.querySelector('#titulo_ul').innerHTML = 'CADASTRAR';
        document.querySelector('#botão').value = 'CADASTRAR';
    }

    clearInputs();
});

// Função para preencher os campos de edição com os dados de um cliente selecionado
const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    document.querySelector('#inNome').value = client.nome;
    document.querySelector('#inEmail').value = client.email;
    document.querySelector('#inCelular').value = client.celular;
    document.querySelector('#inCidade').value = client.cidade;

    document.querySelector('#inNome').dataset.index = client.index;
    document.querySelector('#inEmail').dataset.index = client.index;
    document.querySelector('#inCelular').dataset.index = client.index;
    document.querySelector('#inCidade').dataset.index = client.index;
};

//----------------------------------------------------
// Função para salvar as edições de um cliente
const saveEdit = () => {
    const index = document.querySelector('#inNome').dataset.index;
    const editedClient = {
        nome: document.querySelector('#inNome').value,
        email: document.querySelector('#inEmail').value,
        celular: document.querySelector('#inCelular').value,
        cidade: document.querySelector('#inCidade').value
    };

    updateClient(index, editedClient);
    updateTable();
    document.querySelector('#titulo_ul').innerHTML = 'CADASTRAR';
    document.querySelector('#botaoCadastrar').value = 'CADASTRAR';
    clearInputs();
    document.querySelector("#botaoSalvar").style.display = "none";
    document.querySelector('#botaoCadastrar').style.display = "block";
};

// Adicionar um ouvinte de evento ao botão de "Salvar"
document.querySelector('#botaoSalvar').addEventListener('click', saveEdit);
//----------------------------------------------------

// Função para lidar com a edição e exclusão de clientes
const editDelete = (event) => {
    if (event.target.type == 'button' ){
        const [action, index] = event.target.id.split('-');
        if (action == 'edit'){
            const confirmação = window.confirm('Prosseguir com a edição?')
            if (confirmação){
                editClient(index);
                document.querySelector('p').innerHTML = 'EDITAR'
                document.querySelector('#botaoSalvar').style.display = "block";
                document.querySelector('#botaoCadastrar').style.display = "none";
            } 
        } else {
            const confirmação = window.confirm("Deseja realmente excluir essa conta?");
            if (confirmação){
                deleteClient(index);
                updateTable();
            }
        }
    }
};

// Adicionar um ouvinte de evento à tabela para lidar com a edição e exclusão de clientes
document.querySelector('table').addEventListener('click', editDelete);

// Função para excluir um cliente do armazenamento local
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
};

// Função para atualizar os dados de um cliente no armazenamento local
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
};

window.onload = updateTable()