class NegociacaoController{

    constructor(){
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        )

        this._service = new NegociacaoService()
    }

    adiciona(event){

        try {
            event.preventDefault()
            this._negociacoes.adiciona(this._criaNegociacao())
            this._mensagem.texto = 'Negociação adicionada com sucesso!'
            this._limpaFormulario()
        } catch (err) {            
            if(err instanceof DataInvalidaException){ //testa se o erro é de data e exibe a msg ao usuário caso positivo
                this._mensagem.texto = err.message
            } else { //caso não seja um erro de data, exibe msg genérica
                this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte'
            }
        }
    }

    _limpaFormulario(){
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }

    _criaNegociacao(){
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    apaga(){ 
        this._negociacoes.esvazia()
        this._mensagem.texto = `Negociações apagadas com sucesso!`
    }

    importaNegociacoes(){
        
        // this._service.obterNegociacaoDaSemana((err, negociacoes) => {
        //     if(err){
        //         this._mensagem.texto = 'Não foi possível obter as negociações da semana!'
        //         return
        //     }

        //     negociacoes.forEach(negociacao => {
        //         this._negociacoes.adiciona(negociacao)
        //     });

        //     this._mensagem.texto = 'Negociações importadas com sucesso'
        // }) ALTERADO PARA PADRÃO PROMISE

        // const negociacoes = []

        // this._service.obterNegociacaoDaSemana()
        //     .then(semana => {
        //         negociacoes.push(...semana) //spread operator
        //         //quando retornamos uma promise, seu retorno é acessível ao encadear uma chamada à then
        //         return this._service.obtemNegociacoesDaSemanaAnterior()
        //     })
        //     .then(anterior => {
        //         negociacoes.push(...anterior)
        //         negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
        //     })
        //     .then(retrasada => {
        //         negociacoes.push(...retrasada)
        //         negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
        //         this._mensagem.texto = 'Negociações importadas com sucesso!'
        //     })
        //     .catch(err => this._mensagem.texto = err) ALTERADO PARA O USO DE PROMISE.ALL()

        // this._service.obterNegociacaoDaSemana().then( //recebe dois parâmetros (cb) -  
        //     negociacoes => { //---------> negociacoes recebe o retorno da operação assinc.
        //         negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
        //         this._mensagem.texto = 'Negociações importadas com sucesso'
        //     },
        //     err => this._mensagem.texto = err  //err dá acesso aos possíveis erros
        // )

        // Promise.all([
        //     this._service.obtemNegociacaoDaSemana(), //array em index 0
        //     this._service.obtemNegociacoesDaSemanaAnterior(), //array em index 1
        //     this._service.obtemNegociacoesDaSemanaRetrasada() //array em index 2
        // ])
        // .then(periodo => {
        //     //periodo é um array de arrays com 3 elementos
            
        //     periodo = periodo.reduce((novoArray, item) => novoArray.concat(item), []) //.1
        //         .forEach(negociacao => this._negociacoes.adiciona(negociacao)) //2.
            
        //     this._mensagem.texto = 'Negociações importadas com sucesso!'
            
        //     //1. achata os 3 arrays em um array de dimensão única (flaten)
        //     //1. periodo passa a ter a quantidade total de elementos dos 3 arrays
        //     //2. insere as negociações importadas na lista de negociações da view

        //     console.log(periodo)
        // })
        // .catch(err => this._mensagem.texto = err) RESPONSABILIDADE PASSADA PARA negociacaoService.js/obtemNegociacoesdoPeriodo()

        this._service  //agora importa utilizando o método obtemNegociacoesDoPeriodo() de negociacaoService.js
            .obtemNegociacoesDoPeriodo()
            .then(negociacoes => {
                negociacoes
                    .filter(novaNegociacao => 
                        !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociacoes importadas com sucesso!'
            })
            .catch(err => this._mensagem.texto = err) 
    }

}