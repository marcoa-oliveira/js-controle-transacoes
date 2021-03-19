export function controller(...seletores){
    
    //lista com elementos da DOM
    const  elements = seletores.map(seletor => 
            document.querySelector(seletor))
    
    return function(constructor){
        const constructorOriginal = constructor

        const constructorNovo = function(){
            //usamos function() para definir (e não => pois precisamos que o this do constructor seja dinâmico)
            //constructorNovo deverá chamar constructorOriginal passando os parâmetros necessários
            
            const instance = new constructorOriginal(...elements)
            //Object varre cada propriedade da da classe
            Object
                .getOwnPropertyNames(constructorOriginal.prototype)
                .forEach(property => {
                    if(Reflect.hasMetadata('bindEvent', instance, property)){
                        //precisa fazer a associação do evento
                        associaEvento(instance, Reflect.getMetadata('bindEvent', instance, property))

                    }
                })
        }

        //o novo constructor deve ter o mesmo prototype do original. Isso é importante pois podemos estar lidando com uma classe herdada
        constructorNovo.prototype = constructorOriginal.prototype

        return constructorNovo
    }
}

function associaEvento(instance, metadado){
    document
        .querySelector(metadado.selector)
        .addEventListener(metadado.event, event => {
            if(metadado.prevent) event.preventDefault()
            instance[metadado.propertyKey](event)
        })
}