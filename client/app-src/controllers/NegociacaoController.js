import { Negociacoes, NegociacaoService, Negociacao} from '../domain/index.js'
import { NegociacoesView, MensagemView, Mensagem, DateConverter } from '../ui/index.js'
import { getNegociacaoDao, Bind, getExceptionMessage } from '../util/index.js'

export class NegociacaoController{

    constructor(){
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        )

        this._service = new NegociacaoService()

        this._init()
    }

    async adiciona(event){

        try {
            event.preventDefault()  
            const negociacao = this._criaNegociacao()
            
            const dao = await getNegociacaoDao()
            await dao.adiciona(negociacao)
            this._negociacoes.adiciona(negociacao)
            this._mensagem.texto = 'Negociação adicionada com sucesso!'

            this._limpaFormulario()

            // getNegociacaoDao()
            //     .then(dao => dao.adiciona(negociacao))
            //     .then(() => {
            //         this._negociacoes.adiciona(negociacao)
            //         this._mensagem.texto = 'Negociação adicionada com sucesso!'
            //         this._limpaFormulario()
            //     })
            //     .catch(err => this._mensagem.texto = err)

        } catch (err) {
            //this._mensagem.texto = err.message
            this._mensagem.texto = getExceptionMessage(err)

            // if(err instanceof DataInvalidaException){ //testa se o erro é de data e exibe a msg ao usuário caso positivo
            //     this._mensagem.texto = err.message
            // } else { //caso não seja um erro de data, exibe msg genérica
            //     this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte'
            // }
        }
    }

    _limpaFormulario(){
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }

    _criaNegociacao(){
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    async apaga(){
        
        try{
            const dao = await getNegociacaoDao()
            await dao.apagaTodos()
            this._negociacoes.esvazia()
            this._mensagem.texto = 'Negociações apagadas com sucesso!'
        } catch (err){
            //this._mensagem.texto = err.message
            this._mensagem.texto = getExceptionMessage(err)
        }
        
        // getNegociacaoDao()
        //     .then(dao => dao.apagaTodos())
        //     .then(() => {
        //         this._negociacoes.esvazia()
        //         this._mensagem.texto = `Negociações apagadas com sucesso!`
        //     })
        //     .catch(err => this._mensagem.texto = err)
    }

    async importaNegociacoes(){
        try {
            const negociacoes = await this._service.obtemNegociacoesDoPeriodo()
            console.log(negociacoes)
            negociacoes
                .filter(novaNegociacao => 
                    !this._negociacoes.paraArray().some(negociacaoExistente => 
                        novaNegociacao.equals(negociacaoExistente)))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações do período importadas com sucesso!'    
        } catch (err) {
            //this._mensagem.texto = err.message
            this._mensagem.texto = getExceptionMessage(err)
        }
    }

    // importaNegociacoes(){
        
    //     this._service  
    //         .obtemNegociacoesDoPeriodo()
    //         .then(negociacoes => {
    //             negociacoes
    //                 .filter(novaNegociacao => 
    //                     !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
    //                 .forEach(negociacao => this._negociacoes.adiciona(negociacao))
    //             this._mensagem.texto = 'Negociacoes importadas com sucesso!'
    //         })
    //         .catch(err => this._mensagem.texto = err) 
    // }

    async _init(){
        try {
            const dao = await getNegociacaoDao()
            const negociacoes = await dao.listaTodos()
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao)) 
        } catch (err) {
            //this._mensagem.texto = err.message //extrai apenas a msg de erro da exceção
            this._mensagem.texto = getExceptionMessage(err)
        }
    }

    //_init() {

        //ALTERADO PARA UTILIZAR ASYNC/AWAIT - 18/03/21
        // getNegociacaoDao()
        // .then(dao => dao.listaTodos())
        // .then(negociacoes => 
        //     negociacoes.forEach(negociacao => 
        //         this._negociacoes.adiciona(negociacao)))
        // .catch(err => this._mensagem.texto = err);
    //}


}