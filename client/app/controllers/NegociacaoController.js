class NegociacaoController{

    constructor(){
        const $ = document.querySelector.bind(document) //alterado de let para const pois o valor da váriável não será mudado
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')


        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            //['adiciona','esvazia'] abrimos mão do array para passar os parâmetros individualmente
            'adiciona', 'esvazia'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            //['texto']
            'texto'
        )


        //uso da classe Bind substituindo trecho abaixo

        // this._negociacoes = new Negociacoes( model => {
        //     this._negociacoesView.update(model) 
        // }) deixou de funcionar pois negociacoes não recebe mais a armadilha

        //const self = this //retornamos com a solução self para que o contexto do controller seja passado para dentro do proxy

        //criando o proxy através de ProxyFactory
        // this._negociacoes = ProxyFactory.create(
        //     new Negociacoes(), 
        //     ['adiciona', 'esvazia'],
        //     model => this._negociacoesView.update(model) //elimina a necessidade do self devido escopo léxico da arrow function
        // )

        //this._negociacoesView = new NegociacoesView('#negociacoes')
        
        //recebe inicialmente o modelo que encapsula uma lista vazia
        //this._negociacoesView.update(this._negociacoes)

        //instanciando o modelo
        //this._mensagem = new Mensagem()

        //criando um proxy para mensagem
        // this._mensagem = ProxyFactory.create(
        //     new Mensagem(),
        //     ['texto'],
        //     model => this._mensagemView.update(model)
        // )

        //adiciona as propriedades de MensagemView e passa o id da Div que vai receber a mensagem
        // this._mensagemView = new MensagemView('#mensagemView')
        // this._mensagemView.update(this._mensagem)
    }

    adiciona(event){
        event.preventDefault()
        this._negociacoes.adiciona(this._criaNegociacao())
        this._mensagem.texto = 'Negociação adicionada com sucesso!'
        // this._mensagemView.update(this._mensagem) não chama mais o update da view de Mensagem
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
        //this._mensagemView.update(this._mensagem)
    }

}