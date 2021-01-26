const controller = new NegociacaoController() //alterado de let para const pois o valor da variável não será alterado

document
    .querySelector('.form')
    .addEventListener('submit', controller.adiciona.bind(controller))