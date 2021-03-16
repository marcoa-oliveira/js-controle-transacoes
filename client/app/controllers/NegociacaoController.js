class NegociacaoController{

    constructor(){
        const $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        this._init()

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
            
            // this._negociacoes.adiciona(this._criaNegociacao())
            // this._mensagem.texto = 'Negociação adicionada com sucesso!'
            // this._limpaFormulario()
            // a inclusão na tabela e limpeza do form passam a depender da inclusão no banco ou não

            const negociacao = this._criaNegociacao()

            // DaoFactory
            //     .getNegociacaoDao()
            getNegociacaoDao()
                .then(dao => dao.adiciona(negociacao))
                .then(() => {
                    //só inclui na tabela se conseguir incluir no banco antes
                    this._negociacoes.adiciona(negociacao)
                    this._mensagem.texto = 'Negociação adicionada com sucesso!'
                    this._limpaFormulario()
                })
                .catch(err => this._mensagem.texto = err)

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
        //método alterado para utilizar DaoFactory
        // DaoFactory
        //     .getNegociacaoDao()
        getNegociacaoDao()
            .then(dao => dao.apagaTodos())
            .then(() => {
                this._negociacoes.esvazia()
                this._mensagem.texto = `Negociações apagadas com sucesso!`
            })
            .catch(err => this._mensagem.texto = err)
    }

    importaNegociacoes(){
        
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

    _init(){
        // DaoFactory //chamada do método listaTodos() de DaoFactory
        //     .getNegociacaoDao()
        getNegociacaoDao() //alterado devido mudança na declaração de DaoFactory
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao)))
            .catch(err => this._mensagem.texto = err)
    }

}