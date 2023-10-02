const formulário = document.querySelector('form')
const lista = []

formulário.addEventListener("submit", (e)=>{
    e.preventDefault()

    let nome = formulário.inNome.value
    let email = formulário.inEmail.value
    let celular = formulário.inCelular.value
    let cidade = formulário.inCidade.value
    
    const conta = {
        nome: nome,
        email: email,
        celular: celular,
        cidade: cidade
    };

    lista.push(conta)
    localStorage.setItem('pessoa', JSON.stringify(conta));
    
    formulário.inNome.value = ""
    formulário.inEmail.value = ""
    formulário.inCelular.value = ""
    formulário.inCidade.value = ""

})

//teste

const tempClient = {
    nome: "nome",
    email: "email",
    celular: "celular",
    cidade: "cidade"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

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

//CRUD - READ
const readClient = () => getLocalStorage()

//CRUD - CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}