/*
CONSUMINDO UMA API COM JAVASCRIPT
API: https://dog.ceo/api
*/
// 1- SELECIONAR ELEMENTOS DO HTML

//PEGA A IMAGEM DO CACHORRO
const dogImage = document.getElementById('docImage');
//elemento onde aparece o nome da raça
const breedName = document.getElementById('breedName');
//BOTÃO QUE BUSCA CACHORRO ALEATÓRIO
const randomBtn = document.getElementById('randomBtn')
//BOTÃO QUE BUSCA RAÇA
const searchBtn = document.getElementById('searchBtn')
//CAMPO DE INPUT ONDE O USUÁRIO DIGITA A RAÇA
const breedIpnut = document.getElementById('breadIpnut');
//ÁREA ONDE A IMAGEM APARECE
const dogArea = document.querySelector('.dog-area');
//========================================================


// 2- URL BASE DA API
//========================================================
const API_BASE = 'https://dog.ceo/api'

//====-===================================================
// 3- FUNÇÃO QUE CHAMA A API
//========================================================

//FUNÇÃO ASSINCRONA QUE FAZ REQUISIÇÃO HTTP
async function fetchFromApi(endpoint) {
    
    //adiciona classe de loading(mostra "carregando")
    dogArea.classList.add('loading');

    try {
        //montar a URL completa da requisição
        const url = `${API_BASE}${endpoint}`;

        //mostrar no console a URL Chamada
        console.log("requisição", url);

        //faz requisição HTTP para a API
        const response = await fetch(url);

        //Converter para JSON
        const data = await response.json();

        //Mostrar a resposta console
        console.log("Resposta:", data);
        
        if (data.status === "success"){
            //URL da imagem retornada pela API
            const imageUrl = data.message;
            //COLOCAR A IMAGEM NO ELEMENT <img>
            dogImage.src = imageUrl;
            //extrai a raça da URL
            const breed = imageUrl.split('/')[4];
            //substituir "-" por espaço
            const formattedBreed = breed.replace(/-/g," ");
            //deixa a primeira letra maúscula
            const finalBreed = 
                formattedBreed.charAt(0).toUpperCase() +
                formattedBreed.slice(1);

            //mostra o nome da raça na tela
            breedName.textContent = finalBreed;
        }
    } catch (error) {
            //mostrar erro no console
            console.error("Erro:", error);

            //mensagem de erro para o usuário
            breedName.textContent = "erro ao carregar";

            //remove imagem
            dogImage.src = "";
    } finally {
            //remove estado de loading
            dogArea.classList.remove("loading");
    }
}
fetchFromApi("/breeds/image/random");
