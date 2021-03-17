System.register(["../../util/ApplicationException.js"], function (_export, _context) {
    "use strict";

    var ApplicationException;
    return {
        setters: [function (_utilApplicationExceptionJs) {
            ApplicationException = _utilApplicationExceptionJs.ApplicationException;
        }],
        execute: function () {

            //class DataInvalidaException extends Error{
            class DataInvalidaException extends ApplicationException {
                constructor() {
                    super('A data deve estar no formato dd/mm/aaaa'); //construtor diferente da classe a qual se extende necessita da chamada de super()
                    //this.name = this.constructor.name //faz com que a identificação da origem da exceção seja DataInvalidaException e não Error
                    //não é mais necessário pois a responsabilidade de alterar o this.name ficou herdada de ApplicationException
                }
            }

            _export("DataInvalidaException", DataInvalidaException);
        }
    };
});
//# sourceMappingURL=DataInvalidaException.js.map