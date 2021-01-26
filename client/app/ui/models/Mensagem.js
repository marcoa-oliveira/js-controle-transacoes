class Mensagem {
    
    constructor(texto = ''){  //podemos também passar o valor default direto no atributo do construto -> constructor(texto = '')
        
        // if (!texto){
        //     texto = ''
        // }

        // this._texto = texto  isso pode ser simplificado da maneira abaixo:

        this._texto = texto || ''  //se o valor for diferente de null, undefined, 0 ou não for uma string vazia, o valor recebido será atribuido
                                   //caso contrário recebe uma string vazia
    }

    get texto(){
        return this._texto
    }

    set texto(texto){
        this._texto = texto
    }
}