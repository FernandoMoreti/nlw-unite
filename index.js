//array
let participantes = [
  {
    nome: 'Rafaela Pinheiro',
    email: 'rafaeladepaulapinheiro@gmail.com',
    dataInscricao: new Date(2024, 3, 2, 15, 10),
    dataCheckin: new Date(2024, 3, 3, 22, 0)
  },
  {
    nome: 'Rafael da Silva',
    email: 'rafaelsilva@gmail.com',
    dataInscricao: new Date(2024, 4, 12, 2, 10),
    dataCheckin: new Date(2024, 9, 7, 8, 12)
  },
  {
    nome: 'Ana Oliveira',
    email: 'anaoliveira@gmail.com',
    dataInscricao: new Date(2024, 2, 15, 10, 30),
    dataCheckin: new Date(2024, 2, 17, 18, 45)
  },
  {
    nome: 'Carlos Santos',
    email: 'carlossantos@hotmail.com',
    dataInscricao: new Date(2024, 6, 8, 14, 20),
    dataCheckin: null
  },
  {
    nome: 'Mariana Costa',
    email: 'marianacosta@yahoo.com',
    dataInscricao: new Date(2024, 8, 21, 12, 5),
    dataCheckin: new Date(2024, 8, 22, 16, 55)
  },
  {
    nome: 'João Pereira',
    email: 'joaopereira@gmail.com',
    dataInscricao: new Date(2024, 7, 11, 8, 0),
    dataCheckin: null
  },
  {
    nome: 'Fernanda Almeida',
    email: 'fernandaalmeida@gmail.com',
    dataInscricao: new Date(2024, 1, 25, 17, 45),
    dataCheckin: new Date(2024, 1, 26, 19, 30)
  },
  {
    nome: 'Pedro Santos',
    email: 'pedrosantos@gmail.com',
    dataInscricao: new Date(2024, 5, 7, 9, 15),
    dataCheckin: new Date(2024, 5, 8, 12, 45)
  },
  {
    nome: 'Marta Sousa',
    email: 'martasousa@yahoo.com',
    dataInscricao: new Date(2024, 10, 3, 16, 30),
    dataCheckin: new Date(2024, 10, 5, 10, 10)
  },
  {
    nome: 'Tiago Oliveira',
    email: 'tiagooliveira@hotmail.com',
    dataInscricao: new Date(2024, 11, 19, 11, 50),
    dataCheckin: new Date(2024, 11, 20, 20, 15)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckin = dayjs(Date.now()).to(participante.dataCheckin)
  if (participante.dataCheckin == null) {
    dataCheckin = `
    <button
      data-email="${participante.email}"
      onclick="checkin(event)"
    >
     Confirmar Check-in
    </button>
    `
  }
  return`
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckin}</td>
  </tr>
  `
}

const atualizar = (participantes) => {
  // Pegar informações HTML
  let output = ''
  // Estrutura de repetição
  for (let participante of participantes) {
    // do it
    output = output + criarNovoParticipante(participante)
  }
  // Substituir informações HTML
  document.querySelector('tbody').innerHTML = output
}

atualizar(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null
  }
  // verificar se ja existe
  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
  })
  if (participanteExiste) {
      event.target.querySelector('[name="nome"]').value = ''
      event.target.querySelector('[name="email"]').value = ''
      return alert('Usuario ja existente')
  }
  participantes = [participante, ...participantes]
  atualizar(participantes)
  // limpar inputs
  event.target.querySelector('[name="nome"]').value = ''
  event.target.querySelector('[name="email"]').value = ''
}

const checkin = (event) => {
  // confirmar se realmente quer o checkin
  const resultado = confirm("Tem certeza que deseja realmente fazer o Check-in?")
  if (resultado == false) {
    return
  }
  // encontrar participante na lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o checkin do participante
  participante.dataCheckin = new Date()
  // atualizar a lista
  atualizar(participantes)
}
