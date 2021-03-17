import { View } from './View.js';
import { DateConverter } from "../converters/DateConverter.js";

export class NegociacoesView extends View{  //extends faz com que a classe herde funcionalidades da classe View

    // constructor(seletor){
    //     this._elemento = document.querySelector(seletor)
    // }

    // update(model){ //recebe a ultima versão do array de negociações
    //     this._elemento.innerHTML = this.template(model)
    // } 

    //fará uso do construtor e do método update da classe View

    template(model){ //organiza os dados da ultima versão do array para a montagem da tabela
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
            ${model.paraArray().map(negociacao => 
                `
                    <tr>
                        <td>${DateConverter.paraTexto(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                        <td>${negociacao.volume}</td>
                    </tr>
                `
            ).join('')}
            </tbody>
            
            <tfoot>
                <tr>
                    <td colspan="3"></td>
                    <td>${model.volumeTotal}</td>
                </tr>
            </tfoot>
        </table>
        `
    }
}