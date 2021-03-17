import { ApplicationException } from "../../util/ApplicationException.js";

//class DataInvalidaException extends Error{
export class DataInvalidaException extends ApplicationException{
    constructor(){
        super('A data deve estar no formato dd/mm/aaaa') //construtor diferente da classe a qual se extende necessita da chamada de super()
        //this.name = this.constructor.name //faz com que a identificação da origem da exceção seja DataInvalidaException e não Error
        //não é mais necessário pois a responsabilidade de alterar o this.name ficou herdada de ApplicationException
    }
}