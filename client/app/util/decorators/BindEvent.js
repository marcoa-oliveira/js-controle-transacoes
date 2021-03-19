System.register(['../../util/Obrigatorio.js'], function (_export, _context) {
    "use strict";

    var obrigatorio;
    function bindEvent(event = obrigatorio(event), selector = obrigatorio('event'), prevent = true //cancela por padrão o event.preventDefault()
    ) {
        return function (target, propertyKey, descriptor) {

            Reflect.defineMetadata( //através de Reflect.defineMetadata é que os metadados são adicionados
            'bindEvent', //identificação dos metadados
            { event, selector, prevent, propertyKey }, Object.getPrototypeOf(target), propertyKey);

            return descriptor;
        };
    }

    _export('bindEvent', bindEvent);

    return {
        setters: [function (_utilObrigatorioJs) {
            obrigatorio = _utilObrigatorioJs.obrigatorio;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=BindEvent.js.map