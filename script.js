let nome = prompt("Digite o seu nome para logar!");
let nomeDeUsuario = { name: nome };

enviarNome();

function buscarMensagem() {
    let promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");


    promessa.then(manterConexao);
}

function enviarNome(resp) {
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeDeUsuario);

    promise.then((resp) => {
      console.log(resp);
      manterConexao();
      buscarMensagem();
    })
    .catch((error) => {
      console.log('Erro de criar usuário: ', error)
      nome = prompt("Esse nome já existe. Digite outro.");
      nomeDeUsuario = { name: nome };
      enviarNome()
    });
}


function manterConexao(resp) {
    let conexao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeDeUsuario);

    conexao.then((resp) => {
      console.log('Mantendo conexão');
    })
    .catch((error) => {
      console.log('Erro de manter conexão: ', error)
    })
    setTimeout(() => {
      manterConexao()
    }, 5000)
}



function redenrizarMensagem() {
  let ul = document.querySelector(".mensagem");
  ul.innerHTML = "";

  for(let i = 0; i < mensagem.length; i++) {
      ul.innerHTML += `
          <li>
              ${mensagem[i].type}
          </li>
      `;
  }
}




// buscarMensagem();

  // function enviarMensagem() {
  //   let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemNova);
  // }


// function escreverMensagem(texto) {
//   mensagem.push(texto);
//   console.log("texto: ", texto);
// }

// function botao() {
//   let input = document.querySelector(".texto");
//   texto = input.value;

//   if (texto !== null && texto.trim !== "") {
//     input.value = "";
//     escreverMensagem(texto);
//   }
//   return;
// }



