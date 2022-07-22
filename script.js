let formulario = document.querySelector('form');

formulario.addEventListener('submit', function(e) {
    //SERVE PRA NÃO EXECUTAR O REFRESH
    e.preventDefault(); 

    //URL DA PESQUISA
    let urlForm = " https://pokeapi.co/api/v2/pokemon/"; 

    //VALOR DO INPUT NAME
    let nome = document.getElementById("inputTxt");

    //CONCATENA A URL COM O INPUT TEXT
    urlForm = urlForm + this.inputTxt.value;

    //TRANSFORMA O QUE FOR DIGITADO EM MINUSCULO AO CLICAR
    urlForm = urlForm.toLocaleLowerCase();

    let resultado = document.getElementById("resultado");

    //ID resultado em Imagem
    let resultadoImg = document.getElementById("result-img");

    //ID resultado em Texto
    let resultadoText = document.getElementById("result-text");

    //Resposta em HTML
    let html = '';

    fetch(urlForm)
        .then(resultadoText => resultadoText.json())
        .then(function(data){
            console.log(data);
            html = `Nome: ${maiuscula(data.name)} <br> Tipo: ${maiuscula(data.types[0].type.name)}`
            resultadoText.innerHTML = html;

            resultadoImg.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
        })
        .catch(function(err){
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
                html = 'Pokémon não encontrado! 😒'
            }else{
                html = `Erro: ${err}`
            }
            resultadoText.innerHTML = html
        });
    //Fetch() é um comando no qual eu vou fazer a pesquisa, ele vai pesquisar
    //e vai retornar pra mim o valor dessa pesquisa

    resultado.classList.remove("hide");
    
});

function maiuscula(val){
    return val[0].toUpperCase() + val.substr(1);
}