System.register(["./ConnectionFatory.js", "../domain/negociacao/NegociacaoDao.js"], function (_export, _context) {
        "use strict";

        var ConnectionFactory, NegociacaoDao;
        function getNegociacaoDao() {
                return ConnectionFactory.getConnection().then(conn => new NegociacaoDao(conn));
        }

        // class DaoFactory{

        //     static getNegociacaoDao(){
        //         return ConnectionFactory
        //             .getConnection()
        //             .then(conn => new NegociacaoDao(conn))
        //     }
        // }

        //alteramos a declaração de classe e método pois tinhamos apenas um método preso a classe.

        _export("getNegociacaoDao", getNegociacaoDao);

        return {
                setters: [function (_ConnectionFatoryJs) {
                        ConnectionFactory = _ConnectionFatoryJs.ConnectionFactory;
                }, function (_domainNegociacaoNegociacaoDaoJs) {
                        NegociacaoDao = _domainNegociacaoNegociacaoDaoJs.NegociacaoDao;
                }],
                execute: function () {}
        };
});
//# sourceMappingURL=DaoFactory.js.map