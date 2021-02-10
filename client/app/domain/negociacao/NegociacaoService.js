class NegociacaoService {

    obterNegociacaoDaSemana(cb){
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'negociacoes/semana')

        xhr.onreadystatechange = () => {
            //configurações da requisição de dados ao servidor
            if(xhr.readyState == 4){
                //se a requisição apresentar estado = 4 (requisição concluída e resposta pronta)
                if(xhr.status == 200){
                    //status 200: operação realizada com sucesso
                    
                    //convertendo o obj em instância de Negociacao
                    const negociacoes = JSON
                        .parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    //.forEach(negociacao => this._negociacoes.adiciona(negociacao)) removido pois não está mais no controller

                    cb(null, negociacoes) //operação concluída sem erro
                    
                    //this._mensagem.texto = 'Negociações importadas com sucesso!'
                } else {
                    console.error(xhr.responseText)
                    //this._mensagem.texto = 'Não foi possível obter as negociações da semana!'
                    cb('Não foi possível obter as negociações da semana!', null) //erro na operação
                }
            }
        }

        xhr.send() //executa a requisição configurada
    }
}