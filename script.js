const formulário = document.querySelector('form')
const lista = []

formulário.addEventListener("submit", (e)=>{
    e.preventDefault()
    saveClient()

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

//Interação com Layout

const saveClient = () => {
    if (isValidFields()){
        console.log("Cadastrando Cliente")
    }
}