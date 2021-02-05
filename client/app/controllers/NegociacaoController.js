class NegociacaoController{

    constructor(){
        const $ = document.querySelector.bind(document) //alterado de let para const pois o valor da váriável não será mudado
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        // this._negociacoes = new Negociacoes( model => {
        //     this._negociacoesView.update(model) 
        // }) deixou de funcionar pois negociacoes não recebe mais a armadilha

        const self = this //retornamos com a solução self para que o contexto do controller seja passado para dentro do proxy

        this._negociacoes = new Proxy(new Negociacoes(), {
            get (target, prop, receiver){
                if(typeof(target[prop]) == typeof(Function) && ['adiciona', 'esvazia'].includes(prop)){
                    return function(){
                        console.log(`"${prop}" disparou a armadilha`)
                        target[prop].apply(target, arguments)
                        //target é a instância real de Negociacoes

                        //this._negociacoesView.update(target) assim não funciona pois o this aponta para o contexto do próprop proxy
                        self._negociacoesView.update(target) //por isso temos que usar o self
                    }
                } else {
                    return target[prop]
                }
            }
        })

        this._negociacoesView = new NegociacoesView('#negociacoes')
        
        //recebe inicialmente o modelo que encapsula uma lista vazia
        this._negociacoesView.update(this._negociacoes)

        //instanciando o modelo
        this._mensagem = new Mensagem()

        //adiciona as propriedades de MensagemView e passa o id da Div que vai receber a mensagem
        this._mensagemView = new MensagemView('#mensagemView')
        this._mensagemView.update(this._mensagem)
    }

    adiciona(event){
        event.preventDefault()
        this._negociacoes.adiciona(this._criaNegociacao())
        this._mensagem.texto = 'Negociação adicionada com sucesso!'
        this._mensagemView.update(this._mensagem)
        this._limpaFormulario()
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

    apaga(){ //apaga as negociações quando o usuário pressionar "apagar" e atualiza a tela com uma msg
        this._negociacoes.esvazia()
        this._mensagem.texto = `Negociações apagadas com sucesso!`
        this._mensagemView.update(this._mensagem)
    }

}