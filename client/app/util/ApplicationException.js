System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            class ApplicationException extends Error {
                constructor(msg = '') {
                    super(msg);
                    this.name = this.constructor.name;
                }
            }

            //hack do system.js para que a função tenha acesso a definição da classe

            _export('ApplicationException', ApplicationException);

            const exception = ApplicationException;

            function isApplicationException(err) {
                return err instanceof exception || Object.getPrototypeOf(err) instanceof exception;
                //verifica se o tipo ou o prototype da exceção são instâncias de ApplicationException
                //o teste do prototype é importante, pois sem ele DataInvalidaException retorna false
            }

            _export('isApplicationException', isApplicationException);

            function getExceptionMessage(err) {
                if (isApplicationException(err)) {
                    return err.message;
                } else {
                    console.log(err);
                    return 'Não foi possível realizar a operação!';
                }
            }

            _export('getExceptionMessage', getExceptionMessage);
        }
    };
});
//# sourceMappingURL=ApplicationException.js.map