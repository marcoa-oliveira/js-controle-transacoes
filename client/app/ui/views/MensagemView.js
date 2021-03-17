System.register(["./View.js"], function (_export, _context) {
    "use strict";

    var View;
    return {
        setters: [function (_ViewJs) {
            View = _ViewJs.View;
        }],
        execute: function () {
            class MensagemView extends View {
                //extends faz com que a classe herde funcionalidades da classe View

                // constructor(seletor){
                //     this._elemento = document.querySelector(seletor)

                // } fará uso do construtor da classe View

                template(model) {
                    return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
                    //em caso de qualquer coisa diferente de uma string com texto, retorna um parágrafo sem as classes do bootstrap
                }

                // update(model){
                //     this._elemento.innerHTML = this.template(model)
                // }  fará uso do update da classe View
            }

            _export("MensagemView", MensagemView);
        }
    };
});
//# sourceMappingURL=MensagemView.js.map