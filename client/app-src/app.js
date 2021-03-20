import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

// import 'jquery/dist/jquery.js' removido após o uso de webpack.ProvidePlugin

import 'bootstrap/js/modal.js'
import '../css/meucss.css'

import { NegociacaoController } from './controllers/NegociacaoController.js'
import { Negociacao } from './domain/index.js' 
//import { debounce } from './util/Debounce.js' removido para o uso de decorators

const controller = new NegociacaoController() //alterado de let para const pois o valor da variável não será alterado
// const $ = document.querySelector.bind(document)

// $('.form')
//     .addEventListener('submit', controller.adiciona.bind(controller))

// $('#botao-apaga')
//     .addEventListener('click', controller.apaga.bind(controller))

// $('#botao-importa')
//     .addEventListener('click', controller.importaNegociacoes.bind(controller))
//     // .addEventListener('click', debounce(() => {
//     //     console.log('Executou a operação de debounce')
//     //     controller.importaNegociacoes()
//     // }, 1000)) retornou para a forma anterior. usaremos decorator agora

//Os Alias $ e associações de eventos foram removidos para o uso de REFLECT-METADATA no cap.19


const negociacao = new Negociacao(new Date(), 15, 200);
const headers = new Headers();
headers.set('Content-Type', 'application/json');
const body = JSON.stringify(negociacao);
const method = 'post';

const config = { 
    method,
    headers,
    body 
};

fetch('/negociacoes', config)
    .then(() => console.log('Dado enviado com sucesso'))
    .catch(err => console.log(err.message))