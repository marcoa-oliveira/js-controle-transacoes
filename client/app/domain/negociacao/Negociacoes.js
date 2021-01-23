class Negociacoes{

    constructor(){
        this._negociacoes = [] //o prefíxo _ é utilizado para indicar que só pode ser acessado pelos métodos da própria classe
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao) 
    }

    paraArray(){
        // return this._negociacoes
        return [].concat(this._negociacoes) //retorna uma nova referência com os itens do array de negociacoes, 
                                            //mas não permite acesso direto ao array original
    }


}