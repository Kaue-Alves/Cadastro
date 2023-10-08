const formulário = document.querySelector('form')
const lista = []

//Criando um cliente
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

//Enviando e buscando cliente no local storage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

//Lendo cliente no local storage
const readClient = () => getLocalStorage()

//Buscando cliente e criando campos
const clearTable = () => {
    const rows = document.querySelectorAll('tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" id="edit-${index}">editar</button>
        <button type="button" id="delete-${index}">excluir</button>
    </td>`
    
    document.querySelector('#tabela').appendChild(newRow)
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

//Adicionando informações do cliente e mostrando na tela
formulário.addEventListener("submit", (e)=>{
    e.preventDefault()
    const client = {
        nome: document.querySelector('#inNome').value,
        email: document.querySelector('#inEmail').value,
        celular: document.querySelector('#inCelular').value,
        cidade: document.querySelector('#inCidade').value
    }

    //Verifica se irá editar ou cadastrar
    const index = document.querySelector('#inNome').dataset.index
    if (index == 'new'){
        createClient(client)
        updateTable()
    } else {
        updateClient(index, client)
        updateTable()
        document.querySelector('#titulo_ul').innerHTML = 'CADASTRAR'
        document.querySelector('#botão').value = 'CADASTRAR'
    }

    

    //Limpar inputs
    document.querySelector('#inNome').value = ""
    document.querySelector('#inEmail').value = ""
    document.querySelector('#inCelular').value = ""
    document.querySelector('#inCidade').value = ""
})

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    document.querySelector('#inNome').value = client.nome
    document.querySelector('#inEmail').value = client.email
    document.querySelector('#inCelular').value = client.celular
    document.querySelector('#inCidade').value = client.cidade

    document.querySelector('#inNome').dataset.index = client.index
    document.querySelector('#inEmail').dataset.index = client.index
    document.querySelector('#inCelular').dataset.index = client.index
    document.querySelector('#inCidade').dataset.index = client.index
}

const editDelete = (event) => {
    if (event.target.type == 'button' ){
        const [action, index] = event.target.id.split('-')
        if (action == 'edit'){
            editClient(index)
            document.querySelector('#titulo_ul').innerHTML = 'MODO DE EDIÇÃO'
            document.querySelector('#botão').value = 'EDITAR'
        } else {
            const confirmação = window.confirm("Deseja realmente excluir essa conta?")
            if (confirmação){
                deleteClient(index)
                updateTable()
            }
        }
    }
}

document.querySelector('table').addEventListener('click', (editDelete))


//CRUD - DELETE 
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}
 
//CRUD - UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
} 