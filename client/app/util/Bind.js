class Bind{
    //constructor(model, view, props){ 
    constructor(model, view, ...props){ //todos os parâmetros passados a contar do 3º, serão considerados parte de um array (...)
        const proxy = ProxyFactory.create(model, props, model=>{view.update(model)})
        //toda view tem o método update que recebe um modelo, por isso a chamada view.update(model) na armadilha do proxy
        //assim, retiramos a necessidade da chamada do update no construtor do controller.

        view.update(model)

        return proxy
    }
}