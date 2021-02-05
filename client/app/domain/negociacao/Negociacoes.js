class Negociacoes{

    //constructor(contexto, armadilha){
    constructor(armadilha){ // não recebe mais o contexto devido uso de arrow function
        this._negociacoes = []
        this._armadilha = armadilha
        //this._contexto = contexto
        Object.freeze(this) //impede que se realize novas atribuições às propriedades da instância
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao)
        //this._armadilha.call(this._contexto, this) //alteração na chamada da armadilha para que receba o contexto da chamada
        this._armadilha(this) //retorno da chamada direta sem call devido alteração no construtor
    }

    paraArray(){
        return [].concat(this._negociacoes) //retorna uma nova referência com os itens do array de negociacoes, 
                                            //mas não permite acesso direto ao array original
    }

    get volumeTotal(){
        return this._negociacoes
            .reduce((total, negociacao) => 
                total + negociacao.volume
            , 0)
    }

    esvazia(){
        //this._negociacoes = [] como a instância é congelada, não aceita atribuições diretas.
        this._negociacoes.length = 0 //dessa forma, alteramos o tamanho do array e apagamos todo o conteúdo do atribuito.
        //this._armadilha.call(this._contexto, this)
        this._armadilha(this)
    }


}