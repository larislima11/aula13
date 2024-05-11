// Array para armazenar as pessoas cadastradas localmente
let pessoas = [];

// Função para salvar uma pessoa localmente
function salvarPessoa() {
  // Obter os valores dos campos
  let nome = document.getElementById('inputNome').value;
  let email = document.getElementById('inputEmail').value;
  let telefone = document.getElementById('inputTelefone').value;

  // Criar objeto pessoa
  let pessoa = {
    nome: nome,
    email: email,
    telefone: telefone
  };

  // Adicionar pessoa ao array local
  pessoas.push(pessoa);

  // Limpar campos
  document.getElementById('inputNome').value = '';
  document.getElementById('inputEmail').value = '';
  document.getElementById('inputTelefone').value = '';

  // Atualizar tabela localmente
  atualizarTabela();
}

// Função para sincronizar pessoas com a API
function sincronizarPessoas() {
  // Verificar se há pessoas para sincronizar
  if (pessoas.length === 0) {
    console.log('Não há pessoas para sincronizar.');
    return;
  }

  // Iterar sobre as pessoas para sincronizar com a API
  pessoas.forEach(pessoa => {
    fetch('https://663d53a117145c4d8c39491c.mockapi.io/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pessoa)
    })
    .then(response => response.json())
    .then(data => console.log('Pessoa sincronizada:', data))
    .catch(error => console.error('Erro ao sincronizar pessoa:', error));
  });

  // Limpar array local de pessoas após a sincronização
  pessoas = [];

  // Atualizar tabela localmente
  atualizarTabela();
}

// Função para carregar e exibir os dados da API na tabela
function carregarDadosDaAPI() {
  fetch('https://663d53a117145c4d8c39491c.mockapi.io/usuario')
    .then(response => response.json())
    .then(data => {
      // Limpar array local de pessoas
      pessoas = [];

      // Atualizar array local com os dados da API
      pessoas = data;

      // Atualizar tabela localmente
      atualizarTabela();
    })
    .catch(error => console.error('Erro ao carregar dados da API:', error));
}

// Função para atualizar a tabela localmente
function atualizarTabela() {
  let tabela = document.getElementById('tabelaPessoas');
  tabela.innerHTML = '';

  // Preencher tabela com pessoas cadastradas localmente
  pessoas.forEach(pessoa => {
    let newRow = tabela.insertRow();
    let cellNome = newRow.insertCell(0);
    let cellEmail = newRow.insertCell(1);
    let cellTelefone = newRow.insertCell(2);
    cellNome.innerText = pessoa.nome;
    cellEmail.innerText = pessoa.email;
    cellTelefone.innerText = pessoa.telefone;
  });
}

// Chamar a função para carregar os dados da API quando a página carregar
window.onload = function() {
  carregarDadosDaAPI();
};
