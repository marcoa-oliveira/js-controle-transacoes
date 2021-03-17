System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            class View {
                constructor(seletor) {
                    this._elemento = document.querySelector(seletor);
                }

                update(model) {
                    this._elemento.innerHTML = this.template(model);
                }

                template() {
                    throw new Error('Você precisa implementar o método template');
                } //emulação de métodos abstratos, assim caso não seja implementado um template nas classes que extendem da View, uma msg é disparada
            }

            _export('View', View);
        }
    };
});
//# sourceMappingURL=View.js.map