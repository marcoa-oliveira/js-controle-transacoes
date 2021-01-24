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
        // let total = 0
        // for (let i = 0; i < this._negociacoes.length; i++) {
        //     total+=this._negociacoes[i].volume 
        // }
        // return total

        return this._negociacoes
            .reduce((total, negociacao) => //arrow function permite a omissão das chaves e do return
                total + negociacao.volume
            , 0)
    }


}