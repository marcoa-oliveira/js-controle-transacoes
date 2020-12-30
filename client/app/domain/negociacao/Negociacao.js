class Negociacao{

    /*constructor(data, quantidade, valor){
        // this.data = new Date() //data atual
        // this.quantidade = 1
        // this.valor = 0.0

        //cada parâmetro recebido será atribuido às propriedades da classe
        // this.data = data
        // this.quantidade = quantidade
        // this.valor = valor
        
        //encapsulamento ._atrib
        //convencionamos que atributos precedidos de (_) não devems er acessados fora dos métodos da própria classe
        //this._data = data  ---> alterado para evitar que o atrib seja modificado qd referenciado a outra variável
        // this._data = new Date(data.getTime()) 
        // this._quantidade = quantidade
        // this._valor = valor
        // Object.freeze(this) //faz com que o objeto seja criado com os valores iniciais já congelados e imutáveis 
                            //this faz referência ao objeto que será criado, no caso ao n1 no index.html
                            //mas o freeze só tem referência aos atribs do objeto da classe Negociacao. 
                            //n1 atribui um objeto Date ao atributo data, e este objeto Date não estará congelado!
        
        Object.assign(this, {_data: new Date(data.getTime()), _quantidade: quantidade, _valor: valor})
        Object.freeze(this)
        //Object.assign() é usado para copiar os valores de todas as propriedades próprias de um ou mais objetos para
        //um objeto de destino. No caso, THIS recebe as propriedades _data, _quantidade e _valor com os valores passados
        //ao construtor.
    }*/

    //Métodos acessadores

    // getVolume(){
    //     return this._quantidade * this._valor
    // }

    // getData(){
    //     return this._data;
    // }

    // getQuantidade(){
    //     return this._quantidade
    // }

    // getValor(){
    //     return this._valor
    // }

    //A sintaxe get atrib() matém a característica dos métodos acessadores mas elimina a necessidade da declaração do prefixo
    //get na identificação do atributo, assim o atributo pode ser acessado fora da classe de maneira menos verbosa

    constructor(_data, _quantidade, _valor){
        Object.assign(this, {_quantidade, _valor})
        this._data = new Date(_data.getTime())
        //Por questão de legibilidade, prop que precisa de alteração antes de atribuir fica fora do Object.assign()
        Object.freeze(this)
    }
    //novo constructor utilizando parâmetros com (_) e atalho para declaração de propriedades c/ Object.assign
    //quando o nome da propriedade tem o mesmo nome da variável que será atribuida como seu valor

    get volume(){
        return this._quantidade * this._valor
    }

    get data(){
        // return this._data;
        return new Date(this._data.getTime()) //altera o return para previnir tentativas de alteração no atrib data
    }

    get quantidade(){
        return this._quantidade
    }

    get valor(){
        return this._valor
    }

}