class NegociacaoController{

    constructor(){
        const $ = document.querySelector.bind(document) //alterado de let para const pois o valor da váriável não será mudado
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        //self é NegociacaoController
        //const self = this
        
        //this._negociacoes = new Negociacoes(this, function(model){
            //passando this como parâmetro, a referência do contexto da instância de NegociacaoController é passada para dentro de Negociacao
        this._negociacoes = new Negociacoes( (model => { //função alterada para arrow function
            console.log(this) //continua sendo Negociacoes
            this._negociacoesView.update(model) //agora this aponta para o contexto de NegociacaoController (this como parâmetro)
            //self._negociacoesView.update(model) //força a referência de contexto ao contexto de NegociacaoController
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
        //this._negociacoesView.update(this._negociacoes) removido pois a função já é passada no construtor
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
        //this._negociacoesView.update(this._negociacoes) removido pois a função já é passada no construtor
        this._mensagem.texto = `Negociações apagadas com sucesso!`
        this._mensagemView.update(this._mensagem)
    }

}