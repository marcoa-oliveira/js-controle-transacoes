class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
    }

    adiciona(event){
        event.preventDefault()

        //let converter = new DateConverter() //cria uma instancia da classe DateConverter no controller
        //substituido por método static

        // let data = new Date(...   
        //     this._inputData.value
        //         .split('-')
        //         .map((item, indice) => item - indice % 2)
        // ) substituido pelo let data abaixo
        
        //let data = converter.paraData(this._inputData.value)
        let data = DateConverter.paraData(this._inputData.value)

        let negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )

        // let diaMesAno = negociacao.data.getDate()
        //     + `/` + (negociacao.data.getMonth() + 1) //o array getMonth retorna valores de 0 a 11, então +1 corrige o mês
        //     + `/` + negociacao.data.getFullYear()
        
        //let diaMesAno = converter.paraTexto(negociacao.data)
        let diaMesAno = DateConverter.paraTexto(negociacao.data)

        console.log(diaMesAno)
    }
}