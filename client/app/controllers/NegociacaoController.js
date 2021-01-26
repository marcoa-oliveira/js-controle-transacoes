class NegociacaoController{

    constructor(){
        const $ = document.querySelector.bind(document) //alterado de let para const pois o valor da váriável não será mudado
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
        this._negociacoes = new Negociacoes()
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
        this._negociacoesView.update(this._negociacoes) //cada nova negociação gera um update na tabela
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
}