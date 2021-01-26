class Negociacoes{

    constructor(){
        this._negociacoes = []
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao) 
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


}