import { obrigatorio } from '../../util/Obrigatorio.js'

export function bindEvent(
    event = obrigatorio(event),
    selector = obrigatorio('event'),
    prevent = true //cancela por padrão o event.preventDefault()
){
    return function (target, propertyKey, descriptor){

        Reflect.defineMetadata( //através de Reflect.defineMetadata é que os metadados são adicionados
            'bindEvent', //identificação dos metadados
            { event, selector, prevent, propertyKey },
            Object.getPrototypeOf(target), propertyKey
        )

        return descriptor
    }
}