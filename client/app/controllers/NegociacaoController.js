class NegociacaoController{

    //por uma questão de performance, devemos evitar percorrer a DOM todas as vezes que "adiciona()" for disparado
    //assim, criaremos um método construtor que será a referência de busca

    constructor(){
        let $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
    }

    adiciona(event){
        event.preventDefault()

        //let $ = document.querySelector.bind(document) //funções podem ser atribuidas a variáveis e, nesse caso, poupam trabalho :)
                                                      //.bind(document) referencia o comportamento de .querySelector ao this de document

        //let inputData = document.querySelector('#data') pode ser substituido por
        // let inputData = $('#data')
        // let inputQuantidade = $('#quantidade')  ------> transf. ao construtor
        // let inputValor = $('#valor')

        // console.log(inputData.value)
        // console.log(parseInt(inputQuantidade.value))
        // console.log(parseFloat(inputValor.value))
        
        // console.log(this._inputData.value)
        // console.log(parseInt(this._inputQuantidade.value))
        // console.log(parseFloat(this._inputValor.value))

        // console.log(typeof(this._inputQuantidade.value)) //string
        // console.log(typeof(this._inputValor.value)) //string

        //let data = new Date(this._inputData.value.split('-')) //transforma o valor do inputDate em string e monta o Date
        //let data = new Date(this._inputData.value.replace(/-/g,',')) //substitiu todos os hífens do array de string por vírgula
        
        /*let data = new Date(...this._inputData.value //transforma o valor do inputDate em string e monta o Date recebendo
            .split('-')                              //cada item do array como cada parâmetro do construtor Date
            .map(function(item, indice){                     //fazendo uso de spread operator [...]
                //if(indice == 1){                    //map() percorre o array, se estiver na posição referente ao mês, subtrai 1
                 //   return item - 1                 //assim corrige a informação do mês, que em Date é de 0 a 11.
                //}
                return item - indice % 2 //usando módulo no lugar do if
        }))*/
        
        let data = new Date(...   //faz o mesmo que o de cima, mas com arrow functions
            this._inputData.value
                .split('-')
                /*.map((item, indice) => { //como temos apenas uma instrução, podemos remover {} e return
                    return item % 2
                }*/
                .map((item, indice) => item - indice % 2)
        )

        let negociacao = new Negociacao(
            //this._inputData.value, //o valor capturado é do tipo string e gera um erro no atributo _data da classe Negociacao
            data, //com os dados formatados para a criaçao de Date
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )

        console.log(negociacao)
    }
}