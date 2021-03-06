import { HttpService } from "../../util/HttpService.js";
import { Negociacao } from "./Negociacao.js";
import { ApplicationException } from "../../util/ApplicationException.js"

export class NegociacaoService {

    constructor(){
        this._http = new HttpService() //nova instância de HttpService como dependência
    }

    obtemNegociacaoDaSemana(){ //alterado pois a responsabilidade de lidar com XMLHttp foi passada para HttpService
        return this._http
            .get('/negociacoes/semana') //http://localhost:3000/ alterado devido alterações no cap.20
            .then(dados => 
                dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {
                //ATENÇÃO AQUI
                //throw new Error ('Não foi possível obter as negociações!')
                throw new ApplicationException('Não foi possível obter as negociações!')
            })
    }

    obtemNegociacoesDaSemanaAnterior(){
        return this._http
            .get('/negociacoes/anterior')
            .then(dados =>
                dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {
                //throw new Error('Não foi possível obter as negociações da semana anterior!')
                throw new ApplicationException('Não foi possível obter as negociações da semana anterior!')
            })
    }

    obtemNegociacoesDaSemanaRetrasada(){
        return this._http
            .get('/negociacoes/retrasada')
            .then(dados =>
                dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {
                //throw new Error('Não foi possível obter as negociações da semana retrasada!')
                throw new ApplicationException('Não foi possível obter as negociações da semana retrasada!')
            })
    }

    async obtemNegociacoesDoPeriodo(){
        try {
            let periodo = await Promise.all([
                this.obtemNegociacaoDaSemana(),
                this.obtemNegociacoesDaSemanaAnterior(),
                this.obtemNegociacoesDaSemanaRetrasada()
            ])
            return periodo
                    .reduce((novoArray, item) => novoArray.concat(item),[])
                    .sort((a,b) => b.data.getTime() - a.data.getTime())
        } catch (err) {
            console.log(err)
            //throw new Error('Não foi possível obter as negociações do período!')
            throw new ApplicationException('Não foi possível obter as negociações do período!')
        }
    }

    // obtemNegociacoesDoPeriodo(){ //assume a responsabilidade de obter as negociações no servidor
    //     return Promise.all([
    //         this.obtemNegociacaoDaSemana(),
    //         this.obtemNegociacoesDaSemanaAnterior(),
    //         this.obtemNegociacoesDaSemanaRetrasada()
    //     ])
    //     .then(periodo => periodo
    //             .reduce((novoArray, item) => novoArray.concat(item), [])
    //             .sort((a,b) => b.data.getTime() - a.data.getTime())
    //     )
    //         .catch(err => {
    //             console.log(err)
    //             throw new Error('Não foi possível obter as negociações do período!')
    //         })
    // }

}