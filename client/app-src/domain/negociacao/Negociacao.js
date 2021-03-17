export class Negociacao{

    constructor(_data, _quantidade, _valor){
        Object.assign(this, {_quantidade, _valor})
        this._data = new Date(_data.getTime())
        Object.freeze(this)
    }
    
    get volume(){
        return this._quantidade * this._valor
    }

    get data(){
        return new Date(this._data.getTime())
    }

    get quantidade(){
        return this._quantidade
    }

    get valor(){
        return this._valor
    }

    equals(negociacao){
        // return this.data.getDate() == negociacao.data.getDate()
        //     && this.data.getMonth() == negociacao.data.getMonth()
        //         && this.data.getFullYear() == negociacao.data.getFullYear()
        //             && this.quantidade == negociacao.quantidade
        //                 && this.valor == negociacao.valor   PODEMOS SUBSTITUIR TUDO ISSO POR:
        return JSON.stringify(this) == JSON.stringify(negociacao) //pois a condição TRUE necessita que TODOS os valores sejam iguais
    }

}