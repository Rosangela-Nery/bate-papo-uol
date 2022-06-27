let nome = prompt("Digite o seu nome para logar!");
let nomeDeUsuario = { name: nome };
// let mensagem = [];

enviarNome();

function buscarMensagem() {
    let promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    promessa.then((resp) => {
      console.log("azul: ", resp);
      redenrizarMensagem(resp.data);
    })
    .catch((error) => {
      console.log("Vermelho: ", error);
    })
}

function enviarNome(resp) {
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeDeUsuario);

    promise.then((resp) => {
      console.log('Rosa: ', resp);
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



function redenrizarMensagem(mensagens) {
  let ul = document.querySelector(".mensagem");
  ul.innerHTML = "";
  let classe = '';
  from = ''
  paraQuem = ''

  mensagens.forEach(mensagem => {
    if(mensagem.type === "private_message") {
      classe = 'rosa';
      from = mensagem.to + ":";
      paraQuem = ' reservadamente para '
    }
    else if(mensagem.type === "status") {
      classe = 'cinza';
      from = '';
      paraQuem = '';
    }
    else if(mensagem.type === "message") {
      classe = 'branco';
      from = mensagem.to + ":";
      paraQuem = ' para '
    }

    ul.innerHTML += `
    <li class="${classe}">
      <span class="tempo">(${mensagem.time})</span>
      <span class="from">${mensagem.from}</span>
      <span class="para">${paraQuem}</span>
      <span class="alguem">${from}</span>
      <span class="texto">${mensagem.text}</span>
    </li>
    `;
  })
}


// function botao() {
//   let input = document.querySelector(".texto");
//   texto = input.value;

//   if (texto !== null && texto.trim !== "") {
//     input.value = "";mensagens
//   }
// }
