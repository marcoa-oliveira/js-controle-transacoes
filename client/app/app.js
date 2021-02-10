const controller = new NegociacaoController() //alterado de let para const pois o valor da variável não será alterado
const $ = document.querySelector.bind(document)

$('.form')
    .addEventListener('submit', controller.adiciona.bind(controller))

$('#botao-apaga')
    .addEventListener('click', controller.apaga.bind(controller))

$('#botao-importa')
    .addEventListener('click', controller.importaNegociacoes.bind(controller))