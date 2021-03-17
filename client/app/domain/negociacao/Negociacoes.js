System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            class Negociacoes {

                //constructor(armadilha){ // não recebe mais o contexto devido uso de arrow function
                constructor() {
                    // não recebe mais a armadilha devido PROXY
                    this._negociacoes = [];
                    //this._armadilha = armadilha
                    Object.freeze(this); //impede que se realize novas atribuições às propriedades da instância
                }

                adiciona(negociacao) {
                    this._negociacoes.push(negociacao);
                    //this._armadilha(this) //não recebe mais a armadilha
                }

                paraArray() {
                    return [].concat(this._negociacoes); //retorna uma nova referência com os itens do array de negociacoes, 
                    //mas não permite acesso direto ao array original
                }

                get volumeTotal() {
                    return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0);
                }

                esvazia() {
                    //this._negociacoes = [] como a instância é congelada, não aceita atribuições diretas.
                    this._negociacoes.length = 0; //dessa forma, alteramos o tamanho do array e apagamos todo o conteúdo do atribuito.
                    //this._armadilha(this) não recebe mais a armadilha
                }

            }

            _export("Negociacoes", Negociacoes);
        }
    };
});
//# sourceMappingURL=Negociacoes.js.map