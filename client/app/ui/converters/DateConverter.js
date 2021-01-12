class DateConverter {

    constructor(){
        throw new Error("Esta classe não pode ser instanciada")
        //classe com metodos static ainda podem ser instanciadas mas o acesso dos métodos pela instancia gera erro de método não definido
    }

    static paraTexto(data){
        // return data.getDate()
        //     + `/` + (data.getMonth() + 1)
        //     + `/` + data.getFullYear()

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
        //substitui let diaMesAno do método adiciona() em NegociacaoController
        //reescrito com template literal
    }

    static paraData(texto){

        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto))
            throw new Error ('Deve estar no formato aaaa-mm-dd')
        //FAIL-FAST: verifica se a data recebida está no padrão correto para a instancia de Date.
        //utilizando expressão regular verifica se o texto enviado está OK. Se não estiver, retorna um erro antes que
        //a lógica do método crie uma data inválida.
        
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2 ))
        //substitui let data do método adiciona() em NegociacaoController

        //usamos static quando um método não necessita de atributos para realizar um retorno, sendo assim, não é necessário
        //criar uma instancia de DateConverter para invocar os métodos e podemos chamar direto da classe.
        //ex.: DateConverter.paraTexto()
    }
}