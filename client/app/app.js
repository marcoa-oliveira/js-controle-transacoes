// Responsável pela associação de elementos da DOM a métodos através da interface de eventos
// Ponto de entrada da aplicação, inicializa todos os objetos necessários a aplicação

//cria instância do NegociacaoController
let controller = new NegociacaoController()

//associa o evento de submit do form à chamada do método "adiciona"
document
    .querySelector('.form')
    .addEventListener('submit', controller.adiciona.bind(controller)) //funções podem ser passadas como param. para outras funções
                                                                      //.bind(controller) para q permaneça no escopo do controller
                                                                      //sem isso, o value procurado será no contexto o próprio form na DOM
