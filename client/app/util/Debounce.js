System.register([], function (_export, _context) {
    "use strict";

    function debounce(fn, milisegundos) {
        let timer = 0;
        //timer guarda um ID. 0 significa que não há nenhum

        return () => {
            clearTimeout(timer);
            //para o ultimo timer definido

            timer = setTimeout(() => fn(), milisegundos);
            //usa um temporizador para chamar fn depois de 'x' milisegundos
            //timer é afetado e ganha um novo ID de um novo temporizador no escopo da função debounce
        };
    }

    _export("debounce", debounce);

    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Debounce.js.map