System.register(['./controllers/NegociacaoController.js', './util/Debounce.js'], function (_export, _context) {
    "use strict";

    var NegociacaoController, debounce;
    return {
        setters: [function (_controllersNegociacaoControllerJs) {
            NegociacaoController = _controllersNegociacaoControllerJs.NegociacaoController;
        }, function (_utilDebounceJs) {
            debounce = _utilDebounceJs.debounce;
        }],
        execute: function () {

            const controller = new NegociacaoController(); //alterado de let para const pois o valor da variável não será alterado
            const $ = document.querySelector.bind(document);

            $('.form').addEventListener('submit', controller.adiciona.bind(controller));

            $('#botao-apaga').addEventListener('click', controller.apaga.bind(controller));

            $('#botao-importa').addEventListener('click', debounce(() => {
                console.log('Executou a operação de debounce');
                controller.importaNegociacoes();
            }, 1000));
        }
    };
});
//# sourceMappingURL=app.js.map