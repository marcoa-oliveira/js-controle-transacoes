function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { HttpService } from "../../util/HttpService.js";
import { Negociacao } from "./Negociacao.js";
import { ApplicationException } from "../../util/ApplicationException.js";

export let NegociacaoService = class NegociacaoService {

    constructor() {
        this._http = new HttpService(); //nova instância de HttpService como dependência
    }

    obtemNegociacaoDaSemana() {
        //alterado pois a responsabilidade de lidar com XMLHttp foi passada para HttpService
        return this._http.get('http://localhost:3000/negociacoes/semana') //http://localhost:3000/ alterado devido alterações no cap.20
        .then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
            //ATENÇÃO AQUI
            //throw new Error ('Não foi possível obter as negociações!')
            throw new ApplicationException('Não foi possível obter as negociações!');
        });
    }

    obtemNegociacoesDaSemanaAnterior() {
        return this._http.get('http://localhost:3000/negociacoes/anterior').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
            //throw new Error('Não foi possível obter as negociações da semana anterior!')
            throw new ApplicationException('Não foi possível obter as negociações da semana anterior!');
        });
    }

    obtemNegociacoesDaSemanaRetrasada() {
        return this._http.get('http://localhost:3000/negociacoes/retrasada').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
            //throw new Error('Não foi possível obter as negociações da semana retrasada!')
            throw new ApplicationException('Não foi possível obter as negociações da semana retrasada!');
        });
    }

    obtemNegociacoesDoPeriodo() {
        var _this = this;

        return _asyncToGenerator(function* () {
            try {
                let periodo = yield Promise.all([_this.obtemNegociacaoDaSemana(), _this.obtemNegociacoesDaSemanaAnterior(), _this.obtemNegociacoesDaSemanaRetrasada()]);
                return periodo.reduce(function (novoArray, item) {
                    return novoArray.concat(item);
                }, []).sort(function (a, b) {
                    return b.data.getTime() - a.data.getTime();
                });
            } catch (err) {
                console.log(err);
                //throw new Error('Não foi possível obter as negociações do período!')
                throw new ApplicationException('Não foi possível obter as negociações do período!');
            }
        })();
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

};
//# sourceMappingURL=NegociacaoService.js.map