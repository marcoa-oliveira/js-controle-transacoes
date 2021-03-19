export function debounce(milissegundos = 500){
    return function (target, key, descriptor){
        const metodoOriginal = descriptor.value //referência para o método original
        
        let timer = 0

        descriptor.value = function(...args){
            if(event) event.preventDefault()
            clearInterval(timer)
            //aqui entra a implementação original do método que substituirá o original
            //chama metodoOriginal após x milissegundos
            timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos)
        }
        
        return descriptor
    }
}