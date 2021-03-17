import { ConnectionFactory } from "./ConnectionFatory.js";
import { NegociacaoDao } from "../domain/negociacao/NegociacaoDao.js";

export function getNegociacaoDao() {
    return ConnectionFactory
            .getConnection()
            .then(conn => new NegociacaoDao(conn))
}

// class DaoFactory{

//     static getNegociacaoDao(){
//         return ConnectionFactory
//             .getConnection()
//             .then(conn => new NegociacaoDao(conn))
//     }
// }

//alteramos a declaração de classe e método pois tinhamos apenas um método preso a classe.