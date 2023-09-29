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
    

})