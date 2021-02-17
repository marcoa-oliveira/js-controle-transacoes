class NegociacaoService {

    constructor(){
        this._http = new HttpService() //nova instância de HttpService como dependência
    }

    obtemNegociacaoDaSemana(){ //alterado pois a responsabilidade de lidar com XMLHttp foi passada para HttpService
        return this._http
            .get('negociacoes/semana')
            .then(dados => 
                dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {
                //ATENÇÃO AQUI
                throw new Error ('Não foi possível obter as negociações!')
            })
    }

    obtemNegociacoesDaSemanaAnterior(){
        return this._http
            .get('negociacoes/anterior')
            .then(dados =>
                dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {
                throw new Error('Não foi possível obter as negociações da semana anterior!')
            })
    }

    obtemNegociacoesDaSemanaRetrasada(){
        return this._http
            .get('negociacoes/retrasada')
            .then(dados =>
                dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {
                throw new Error('Não foi possível obter as negociações da semana retrasada!')
            })
    }

    obtemNegociacoesDoPeriodo(){ //assume a responsabilidade de obter as negociações no servidor
        return Promise.all([
            this.obtemNegociacaoDaSemana(),
            this.obtemNegociacoesDaSemanaAnterior(),
            this.obtemNegociacoesDaSemanaRetrasada()
        ])
        .then(periodo => periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a,b) => b.data.getTime() - a.data.getTime())
        )
        // .then(periodo => {
        //     //não faz mais forEach como fazia no controller
        //     return periodo
        //         .reduce((novoArray, item) => novoArray.concat(item), [])
        //         .sort((a,b) => b.data.getTime() - a.data.getTime()) //para ordenar as datas das negociações em ordem decrescente
        // })
            .catch(err => {
                console.log(err)
                throw new Error('Não foi possível obter as negociações do período!')
            })
    }

    // obterNegociacaoDaSemana(){ //não precisa mais do callback
        
    //     //método alterado para retornar uma promise
    //     return new Promise((resolve, reject) => {
    //         //inicio do bloco da promise
    //         const xhr = new XMLHttpRequest()
    //         xhr.open('GET', 'negociacoes/semana')

    //         xhr.onreadystatechange = () => {
    //             if(xhr.readyState == 4){
    //                 if(xhr.status == 200){
    //                     const negociacoes = JSON
    //                         .parse(xhr.responseText)
    //                         .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
    //                     resolve(negociacoes) //se o retorno da operação for sucesso, chama o RESOLVE
    //                 } else {
    //                     reject('Não foi possível obter as negociações da semana!') //se houve falha, chama o REJECT
    //                 }
    //             }
    //         }

    //         xhr.send()
    //     })
    // }


    // obterNegociacaoDaSemana(cb){
    //     const xhr = new XMLHttpRequest()
    //     xhr.open('GET', 'negociacoes/semana')

    //     xhr.onreadystatechange = () => {
    //         //configurações da requisição de dados ao servidor
    //         if(xhr.readyState == 4){
    //             //se a requisição apresentar estado = 4 (requisição concluída e resposta pronta)
    //             if(xhr.status == 200){
    //                 //status 200: operação realizada com sucesso
                    
    //                 //convertendo o obj em instância de Negociacao
    //                 const negociacoes = JSON
    //                     .parse(xhr.responseText)
    //                     .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
    //                 //.forEach(negociacao => this._negociacoes.adiciona(negociacao)) removido pois não está mais no controller

    //                 cb(null, negociacoes) //operação concluída sem erro
                    
    //                 //this._mensagem.texto = 'Negociações importadas com sucesso!'
    //             } else {
    //                 console.error(xhr.responseText)
    //                 //this._mensagem.texto = 'Não foi possível obter as negociações da semana!'
    //                 cb('Não foi possível obter as negociações da semana!', null) //erro na operação
    //             }
    //         }
    //     }

    //     xhr.send() //executa a requisição configurada
    // }
}