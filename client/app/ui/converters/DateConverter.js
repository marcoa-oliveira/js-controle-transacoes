class DateConverter {

    constructor(){
        throw new Error("Esta classe não pode ser instanciada")
    }

    static paraTexto(data){

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
        
    }

    static paraData(texto){
        //as expressões regulares precisaram ser alteradas pois o input foi alterado para o tipo text e
        //não atende mais o padrão aaaa-mm-dd

        //if(!/^\d{4}-\d{2}-\d{2}$/.test(texto))
        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto))
            //throw new Error ('Deve estar no formato aaaa-mm-dd')
            throw new DataInvalidaException //lança a nova exceção
        
        //return new Date(...texto.split('/').map((item, indice) => item - indice % 2 ))
        return new Date(...texto.split('/')
            .reverse() //inverte a ordem dos itens do array e assim os coloca no template correto para a criação da instância de Date
            .map((item, indice) => item - indice % 2 ))
        
    }
}