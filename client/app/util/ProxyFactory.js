class ProxyFactory{
    static create(objeto, props, armadilha){

        return new Proxy(objeto, {
            get (target, prop, receiver){
                //usa o array props para realizar o includes
                // if(typeof(target[prop]) == typeof(Function) && props.includes(prop)){
                if(ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)){
                    return function(){
                        console.log(`"${prop}" disparou a armadilha`)
                        target[prop].apply(target, arguments) //executa a armadilha que recebe o obj original
                        armadilha(target)
                    }
                } else {
                    return target[prop]
                }
            },

            //Handler para tratar de propriedades (getters e setters)
            set (target, prop, value, receiver){
                const updated = Reflect.set(target, prop, value)
                
                //só executamos a armadilha se fizer parte da lista de props
                if(props.includes(prop)) armadilha(target)

                return updated
            }
        })

    }
    //Parâmetros
    //Objeto: alvo do proxy
    //Props: array com métodos que desejamos interceptar
    //Armadilha: função que desejamos executar para os métodos presentes no array props

    static _ehFuncao(fn){
        return typeof(fn) == typeof(Function)
    }
    //retorna se o parametro passado é função ou não
}