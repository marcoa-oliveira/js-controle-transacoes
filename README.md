# CONTROLE DE TRANSAÇÕES COM JAVASCRIPT

Atividade de estudo com o livro *Cangaceiro JavaScript: Uma aventura no sertão da programação*, escrito por [Flávio Almeida](https://github.com/flaviohenriquealmeida) e publicado pela _Casa do Código_.

## Evolução de estudos

- [x] *Cap 1*: Código simples, sem uso de boas práticas
    - Desenvolvimento do código simples para realização da ação (incluir negociação em tela)

- [x] *Cap 2*: Paradigma da orientação a objetos
    - Criação de um _Modelo_ de negociação com orientação a objeto
    - Classe `Negociacao.js`
    - Método Construtor
    - Métodos de Classe
    - Encapsulamento: _Métodos Acessadores_ (`get`)
    - Objetos Imutáveis: `Object.freeze()`
    - Programação Defensiva
    - `Object.assign()` e atalhos para props de objetos literais
    - Declaração de variáveis `var` - `let`, _Temporal Dead Zone_

- [x] *Cap 3*: Controller
    - Controller `NegociacaoController.js`
    - `app.js` - associação de elementos da DOM a funções e métodos através da interface de eventos
    - Associação de eventos do usuário a métodos do controller
    - Atribuição de funções a variáveis `let $ = document.querySelector.bind(document)` e função `bind()`
    - Construtor para guardar os inputs (_evitar percorrer a DOM a cada disparo de evento_)
    - Criando Instância de Negociação, problemas com Date()
    - Criando objeto `Date()` a partir de valor passado pelo usuário (`.split("-")`, `.join(",")`, `[...]` _Spread Operator_, `map()`, _Arrow Functions_)

- [x] *Cap 4*: Trabalhando com datas em JS
    - Criação da classe `DateConverter.js` em app/ui/converters. A classe fica responsável pela conversão dos dados referentes a data tanto para TEXTO (`DateConverter.paraTexto(data)`) quanto para o formato Date (`DateConverter.paraData(texto)`)
    - Uso de **métodos estáticos** com os métodos `paraTexto()` e `paraData()`
    - Uso de **FAIL FAST** para validar se os dados passados por parâmetro a `paraData()` atendem ao padrão exigido para uma instância de `Date`
    - Template Literal

- [x] *Cap 5*: Model (lista de negociações)
    - Criação da classe `Negociacoes.js` para tratar do encapsulamento do array de negociações.
    - Prefixo "_" para definir que o atributo só pode ser acessado pelos métodos da própria classe.
    - `Uncaught ReferenceError: Negociacoes is not defined at new NegociacaoController` - como **Negociacoes.js** está sendo carregado após **App.js**, temos um problema de **dependência** em **NegociacaoController**. Para isso, precisamos carregar todas as dependências antes de App.js em **index.html**.
    - método privado `_limpaFormulario()` em `NegociacaoController`
    - método privado `_criaNegociacao()` retorna uma nova negociação com base nos dados do form. Assim, a responsabilidade pela criação de uma nova instancia de negociação não é mais do método `adiciona`.
    - para garantir que não seria possível alterar os valores do array de negociacoes através do método `paraArray()`, alteramos o seu return para um array vazio, concatenado com os valores do array de negociações, assim criamos uma nova referência.

- [x] *Cap 6*: View
    - implementação da view `NegociacoesView.js` em `client/app/views`
    - a estrutuda da tabela que antes era apresentada em **index.html**, agora será retornada pelo método `template()` de `NegociacoesView` como **template literal**
    - o construtor de `NegociacaoController` foi alterado para que ao iniciar, carregue uma tabela vazia na tela
    - método `adiciona` em **NegociacaoController** foi alterado para definir que cada nova negociação gere um update na tabela
    - adicionado o metodo `volumeTotal()` em **Negocicacoes.js** para extrair o valor total das negociações cadastradas
    - utilizamos `.reduce` em `VolumeTotal()` em substituição ao `for` para reduzir a verbosidade

- [x] *Cap 7*: Isolar e Reutilizar
    - classe `ui/models/Mensagem.js`responsável pela exibição de msgs na tela
    - **Setters**
    - **Parametro Default**
        - definimos que *caso nenhum valor de texto seja passado como atributo da classe `Mensagem`, esse valor será uma string vazia para evitar `undefined`*
    - `negociacaoController` envia uma mensagem informando que a negociacao foi cadastrada utilizando a classe `Mensagem`
    - definimos que o método `template` da classe `MensagemView` fica responsável por tratar a exibição de em tela para strings vazias na mensagem
    **Herança e Reutilização de Código**
        - Criação da classe `ui/views/View` para centralizar o `constructor` e o método `update` das views, já que são identicos.
        - **extends**: as classes `NegociacoesView` e `MensagemView` passam a extender da classe `View` e assim herdam as funcionalidades do construtor e do método `update`
        - **super**: quando uma classe filha herda o construtor da classe pai mas recebe uma quantidade diferente de atributos, o primeiro parâmetro do contrutor recebe a chamada `super(atrib)` onde **atrib** é o atributo herdado da classe pai.
    - variáveis que não terão seu valor atualizado foram alteradas de `let` para `const`

- [x] *Cap 8*: Automatização de atualizações da View
    - adição do método `esvazia()` em `Negociacoes.js`
    - adição ddo método `apaga()` que fará a chamada do método `esvazia()` em `NegociacaoController` quando o usuário clicar no botão **apagar**
    - Em `App.js` fazemos a associação do evento de click no botão apagar com o método `apaga()` de `NegociacaoController`
    - Alteramos o modelo `Negociacoes.js` pois a propriedade `_negociacoes` não está congelada e, por isso, aceita receber novas atribuições. Utilizamos `Object.freeze()`
    - Assim, alteramos o método `esvazia()` que em vez de **atribuir um novo array vazio**, agora altera o tamanho do array com `this_negociacoe.length = 0`. Desta forma, a instância de negociacões não pode receber novas atribuições e o método apaga realiza sua função normalmente.
    - Na classe `Negociacoes`, definimos que o construtor da classe passa a receber o parâmetro `armadilha`, que será o responsável por passar o método da **view** que faz a chamada e realizar o update.
    - Os métodos `adiciona()` e `apaga()` também recebem as chamadas da função contida em `armadilha` desta forma: `this._armadilha(this)`, onde o `(this)` se refere a instância de faz a chamada, no caso, as instâncias de negociacoes.
    - Em `NegociacoesController` alteramos o construtor na propriedade que cria uma nova instância de `Negociacoes` para que receba como parâmetro uma função: 
    
    ```javascript
        this._negociacoes = new Negociacoes(function(model){
            this._negociacoesView.update(model)
        })
    ```
    
    - Desta forma, toda vez que os métodos `adiciona()` e `esvazia()` forem chamados, a estratégia de `armadilha` passada no construtor também será chamada.
    - Esta alteração torna desnecessária a chamada do update da View pelos dois métodos e por isso foi removida.
    - O contexto dinâmico de `this` faz com que se precise de uma solução em `NegociacaoController` pois a referência passada no construtor em `this._negociacoes = new Negociacoes(function(model){...})` altera o contexto do this interno para o contexto de negociacoes, mas precisamos do this no contexto de `NegociacaosController`.
    - Uma saída seria a declaração de uma constante que guardaria o contexto de this de NegociacaoController, por exemplo `const self = this`, e dentro de `new Negociacao`, usariamos `self._negociacoesView.update(model)` para forçar que a chamada do update seja no contexto da instância de NegociacaoController.
    - Outra maneira de resolver a questão do escopo dinâmico seria **passar o contexto de `this` como parâmetro do construtor de Negociacao**, adicionar uma variável que receba esse contexto no construtor em `Negociacao.js` e utilizar o método `.call` nas chamadas da armadilha em `adiciona()` e `esvazia()`.
    - Uma maneira menos verbosa é a passagem da função em `new Negociacao` como **Arrow Function**: `this._negociacoes = new Negociacoes( model => { ... })`. Assim, o contexto **estático** da arrow function faz com que a referência de this permaneça em quem fez a chamada, ou seja, em `NegociacaoController`      

- [x] *Cap 9*: Padrão de Projeto Proxy e Data binding
    - A propriedade `this._armadilha = armadilha` em `Negociacoes.js` não tem qualquer relação com o domínio que a classe representa, está lá apenas por uma questão de infraestrutura.
    - Não é uma solução muito adequada pois obriga que seja recebida em TODAS AS CLASSES DE MODELO, além de ser necessária sua chamada em cada método que altera o estado do modelo.
    - **Modelo do domínio**: não contém nada que não diga respeito ao problema do domínio que resolve
    - **Padrão de projeto PROXY**: envolve a instância que queremos manipular, contendo um correspondente para cada propriedade e método presente nessa instância.
    - `proxy = new Proxy(instancia, {})`, o construtor recebe a instância que será encapsulada e um **objeto literal** que contém o código das armadilhas que desejamos executar.
    - Ao criarmos um proxy de Negociacao, por exemplo, ao acessar a propriedade `proxy.valor` estaremos acessando a propriedade `valor` da instância de Negociacao que foi encapsulada.
    - Para que não seja possível o acesso direto à instância encapsulada, podemos adotar: `negociacao = new Proxy(new Negociacao(new Date(), 1, 100), {})`, assim, a variável negociacao serve para mascarar o proxy.
    - Se desejarmos, por exemplo, que uma mensagem seja gerada toda vez que uma propriedade fosse acessada via Proxy, poderiamos fazer o **handler** da seguinte forma (armadilha de leitura):
    
    ```javascript
    const negociacao = new Proxy(new Negociacao(new Date(), 1, 100), {
        get (target, prop, receiver){
            console.log('A propriedade "${prop}" caiu na armadilha')
            return target[prop]
        }
    })
    ```
    
    - `target` é uma referência ao **objeto encapsulado** (o objeto verdadeiro), `prop` é uma string com o **nome da propriedade** acessada, `receiver` é uma referência ao próprio Proxy.
    - Toda armadilha deve ficar responsável pelo seu retorno, podemos usar o parâmetro `target` acompanhado da `prop` para acessar o atributo da propriedade chamada. **objetos javascript fornecem acesso às suas propriedades através de ponto (.) ou com o uso de colchetes que recebem uma string com o nome da propriedade desejada**
    - Para adicionarmos uma armadilha de escrita, usamos `set`:

    ```javascript
    const negociacao = new Proxy(new Negociacao(new Date(), 1, 100), {
        get ...
        set (target, prop, value, receiver){
            console.log('${prop} guarda ${target[prop]}, receberá ${value}')
            target[prop] = value
            return target[prop] == value
        }
    })
    ```

    - A especificação de Proxy do **ES2015** aponta que é necessário retornar true em uma armadilha para confirmar sua execução bem sucedida.
    - **Reflect API** provê métodos para operações interceptáveis, semelhantes aos métodos manipuladores de Proxy. Centraliza métodos estáticos que permitem, leitura, escrita e chamada de métodos e funções dinâmicamente.
    - Com o uso de `reflect` podemos alterar o setter do proxy removendo a atribuição do `target[prop]` e a comparação entre a propriedade do alvo e o valor passado, pois `Reflect.set()` faz as duas coisas (atribui o valor à propriedade alvo e retorna true ou false para a operação)
    
    ```javascript 
        const negociacao = new Proxy(new Negociacao(new Date(), 1, 100), {
        get ...
        set (target, prop, value, receiver){
            console.log('${prop} guarda ${target[prop]}, receberá ${value}')
            return Reflect.set(target, prop, value)
        }
    }) 
    ```
    
    - Atualização de `NegociacaoController` para uso do Proxy
    - Alteramos a criação da instância de negociacões em `NegociacaoController` para que fosse instanciado um objeto encapsulado pelo Proxy. Dentro dele, o `get` realiza a verificação para saber se quem realizou a chamada foram os métodos `adiciona()` ou `esvazia()`.
    - Caso seja um deles, dispara a armadilha e executa o método e faz a chamada da atualização da view.
    - Voltamos a utilizar `self` para puxar para o contexto do proxy o this do controller.   

- [x] *Cap 10*: Padrão de Projeto Factory
    - Criação do arquivo `client/app/util/ProxyFactory.js`
    - A responsabilidade pela criação do proxy foi retirada de `NegociacaoController` e passada para `ProxyFactory`
    - Com a passagem da responsabilidade de criação para **ProxyFactory**, melhoramos a legibilidade do código no controller e eliminamos a necessidade do uso de `self` através de arrow functions.
    - Também criamos uma factory para a criação de instâncias de **mensagem** e removemos as chamadas manuais de **update da view** em `adiciona()` e `esvazia()`.
    - O `ProxyFactory` não está chamando a atualização da view Mensagem, pois não consegue lidar com `get texto()` da classe Mensagem já que este é uma propriedade **(getters e setters são acessados como propriedades)**. Assim, adiciona-se um `set` no `handler` do proxy.
    - Criação do arquivo `client/app/util/Bind.js` que ficará responsável pelas chamadas de update da view, removendo a necessidade da chamada manual no controller.
    - Em javascript, o **constructor pode retornar um objeto de um tipo diferente da classe à qual pertence**. Desta forma, o construtor de `Bind` irá retornar o proxy que criou.
    - Alterando o controller `NegociacaoController` para utilizar a classe `Bind` e assim remover a necessidade da declaração das propriedades `_negociacaoView` e `_mensagemView`:
    
    ```javascript
        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            ['adiciona','esvazia']
        ) //this._mensagem segue o mesmo padrão
    ```
    
    - Com as responsabilidades de ligar o **modelo** a **view** passadas para a classe `Bind`, liberamos o contrutor do controller de realizar as chamadas de update da view (que agora são automáticas) e já passamos por parâmetro as instância da view e as propriedades ou métodos que queremos automatizar).
    - **Parâmetros REST**: utilizamos o **REST operator `...`** no parâmetro `props` => `...props`, assim indicamos que ao instânciarmos a classe Bind, **do 3º parâmetro em diante, todos fazem parte de um array**. 
    - **Apenas o ultimo parâmetro pode receber um REST operator**

- [x] *Cap 11*: Exceções
    - Alteração do campo **data** em `index.html` para um imput do tipo **text**, pois o imput do tipo **date** pode não funcionar corretamente em alguns navegadores.
    - Com esta alteração, o método `paraData()` da classe `DateConverter` acaba quebrando, pois o formato recebido no campo é exatamente o formato digitado pelo usuário e não mais o template "aaaa-mm-dd" usado pelo input date.
    - Alteramos a expressão regular que realiza a validação do formato digitado no input para atender o padrão dd-mm-aaaa 
    
    ```javascript
        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto))
    ```

    - Assim, foi necessário alterar o desmembramento da string, no caso o separador `.split('-')` para `.split('/')` e realizar a inversão do formado em `return new Date`

    ```javascript
        return new Date(...texto.split('/')
            .reverse() //inverte a ordem dos itens do array e assim os coloca no template correto para a criação da instância de Date
            .map((item, indice) => item - indice % 2 ))
    ``` 

    - **Exceções**: Tratamento de exceções lançadas com `throws`. Dentro do bloco `try`, temos a instrução que pode, ou não, ocasionar uma excessão. Em caso positivo, o fluxo do código é direcionado para o bloco `catch`, que recebe como parâmetro um objeto com informações da exceção lançada.
    - Método `adiciona()` de `NegociacaoController` alterado para a estrutura **try-catch**
    - Podemos realizar um tratamento das mensagens apresentadas ao usuário em casos de exceções, pois não há interesse que mensagens ocasionadas por erros de sintaxe no código sejam apresentadas em tela ao usuário. Assim, criamos nossas próprias exceções e utilizamos `instanceof` para obter o tipo de de exceção lançada.
    - Como as classes de tratamento das exceções são extendidas de `error` (por exemplo `DataInvalidaException`) precisamos forçar a identificação da origem das mensagens de error, pois a msg disparada no console atribui a origem a classe errada (no caso, Error) e não a classe `DataInvalidaException`. Assim, podemos fazer o uso de:

    ```javascript
        this.name = this.constructor.name
    ```

    no construtor da classe `DataInvalidaException`, mas isso seria inviável caso o número de exceções aumente. Então criamos uma classe em `client/app/util/ApplicationException.js` que cuidará dessa parte.

- [x] *Cap 12*: XMLHttpRequest e conexão com API
    - A partir daqui, o uso da index deve ser feito através do **servidor**.
    `..\js-controle-transacoes\server> npm start`
    - A aplicação passa a ser acessível pelo endereço: (http://localhost:3000/) 
    - `importarNegociacoes()` em **NegociacaoController** será o método responsável por realizar a **requisição dos dados no servidor** através de ``XMLHTTPREQUEST`. 
    - Criação da classe `NegociacaoService.js` responsável pela comunicação com o servidor e devolução das respostas ao controller.
    - Com base no **estado da requisição** `xhr.readyState` e no **status da resposta** `xhr.status` fazemos a verificação da requisição.
        
        ```javascript
            obterNegociacaoDaSemana(cb){
                const xhr = new XMLHttpRequest()
                xhr.open('GET', 'negociacoes/semana')

                xhr.onreadystatechange = () => {
                    if(xhr.readyState == 4){
                        if(xhr.status == 200){
                            
                            //convertendo o obj em instância de Negociacao
                            const negociacoes = JSON
                                .parse(xhr.responseText)
                                .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))

                            cb(null, negociacoes) //operação concluída sem erro
                            
                        } else {
                            console.error(xhr.responseText)
                            cb('Não foi possível obter as negociações da semana!', null) //erro na operação
                        }
                    }
                }

                xhr.send() //executa a requisição configurada
            }
        ```
        - A resposta da requisição vem em formato de texto JSON, por isso fazemos uso do `parse` para transformá-la em um objeto e com o uso do `.map` **convertemos esse array de objetos em instâncias de negociação**
        - `objeto.data` é passado como **new Date** pois no objeto retornado pelo servidor, o formato de data está diferente do esperado.
        - Em `NegociacaoController.js` o método `importaNegociacoes()` faz uma chamada do método `obterNegociacoesDaSemana()` passando um **CALLBACK** (cb) no padrão **Error-First-Callback**. 
        
        ```javascript
            importaNegociacoes(){
        
        this._service.obterNegociacaoDaSemana((err, negociacoes) => {
            if(err){
                this._mensagem.texto = 'Não foi possível obter as negociações da semana!'
                return
            }

            negociacoes.forEach(negociacao => {
                this._negociacoes.adiciona(negociacao)
            });

            this._mensagem.texto = 'Negociações importadas com sucesso'
        })
    } 
        ```

    - Neste caso, se **err for diferente de NULL** significa que não foi possível por algum motivo realizar a operação, o callback **retorna** uma mensagem de erro ao usuário. 
    - Caso contrário, `obterNegociacaoDaSemana()` retornará as negociações presentes no servidor e estas serão adicionadas.

- [x] *Cap 13*: Callback Hell e Padrão de Projeto Promise
    
    - **Callback HELL**: estrutura que lembra uma pirâmide deitada:
    ```javascript
        //exemplo
        const service = new HttpService()
        let resultado = []

        service.get('http://...', (err, dados1) => {
            resultado = resultado.concat(dados1)
            service.get('http://...', (err, dados2) => {
                resultado = resultado.concat(dados2)
                service.get('http://...', (err, dados3) => {
                    resultado = resultado.concat(dados3)
                    service.get('http://...', (err, dados4) => {
                        resultado = resultado.concat(dados4)
                        console.log('lista completa')
                        console.log(resultado)
                    })
                })
            })
        })
    ```  

    - **Padrão de Projeto Promise**: Uma promomise é o resultado futuro de uma ação. Padrão criado para lidar com operações **assíncronas**.
    - Métodos que retornam uma Promise não precisam receber um callback.
    - Para lidarmos com uma promise, utilizamos a função `then()`, que recebe como parâmetro duas funções callback, sendo a primeira resposável por receber o retorno da operação assíncrona e a segunda os possíveis erros.
    - Assim, o método `importaNegociacoes()` de `NegociacaoController.js` foi alterado para esperar uma promise.
    -  Também foi alterado o método `obterNegociacoesDaSemana()` em `negociacaoService.js` para que retorne uma promise.
    
    ```javascript
        return new Promise((resolve,reject) => {
            //...
            if(xhr.status == 200) {
                //...
                resolve(negociacoes) //retorna ao controller o resultado da solicitação ao servidor
            } else {
                reject('mensagem de erro') //retorna mensagem de erro em caso de falha na operação
            }
            //...
            xhr.send()
        })    
    ```

    -  A estrutura do **construtor da promise** recebe dois parâmetros **Resolve()** e **Reject()**, que são responsáveis por lidar com o retorno da operação assíncrona e os eventuais erros que possam surgir.
    - Criação da classe `client/app/util/HttpService.js` que isola a configuração do XMLHttpRequest utilizando padrão promise.
    - Em seguida, alteramos novamente o método `obterNegociacoesDaSemana()` para receber o retorno da promise criada em HttpService, transferindo assim a responsabilidade de lidar com XMLHttpRequest.
    - Criação do método `obtemNegociacoesDaSemanaAnterior()` em negociacaoService.
    - Criação do método `obtemNegociacoesDaSemanaRetrasada()`
    - Alteração do método `importaNegociacoes()` para receber um array de negociações concatenadas
    - `Promise.all()`: recebe um array de promises como parâmetro e as resolve em paralelo, retornando um **array de arrays** com as promises resolvidas.
    - O método `importaNegociacoes()` foi alterado para lidar com `Promisse.all()`, mas a lógica de busca das **negociações por período** não deveria estar no controller, mas sim em `NegociacaoService`, então passamos essa responsabilidade para o método `NegociacaoService\obtemNegociacoesDoPeriodo()` e o método passou a chamar o método de serviço para importar.
    - Utilizamos `.sort()` para ordenar as negociações importadas por data, já que o método realiza uma comparação "A - B" para retornar valores 0 (para iguais), (B > A) ou (A > B). No caso da comparação utilizando `.getTime()` o método retorna um número que representa uma data e assim podemos realizar a operação.
    - Como já visto antes, *Arrow Functions* sem bloco (com uma única instrução) possuem return implícito. Os `.then()` dos métodos de `negociacaoService()` são arrow functions com uma única instrução,  por isso, removemos os blocos de instrução e a instrução return para reduzir a verbosidade.
    - Nossa preocupação agora é impedir **importações duplicadas**. Assim, implementamos o método `equals()` em `Negociacao.js`
    - O método `equals(negociacao)` realiza a comparação entre **a instância** que chama o método e a negociação passada por **parâmetro**.
    - Como a comparação é realizada entre TODOS os atributos de negociação, podemos converter a instância e o parâmetro em string e realizar uma comparação simples, sem todos os && que colocamos.
    
    ```javascript
        equals(negociacao){
            return JSON.stringify(this) == JSON.stringify(negociacao) //comparação literal entre os valores
        }
    ```

    - Em `importaNegociacoes()` implementamos o filtro para que não haja duplicação de negociações importadas:

    ```javascript
    //...
        this._service
            .obtemNegociacoesDoPeriodo()
            .then(negociacoes => {
                negociacoes
                    .filter(novaNegociacao => 
                        !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao))
        //...
    ```

    - A função `filter()` tem como lógica o retorno da função `some()` que é aplicada na lista já existente retornando `true` ou `false`.
    - Quando realizamos a importação da negociação, `some()` verifica se ela não existe na lista, como a função retornaria FALSE em caso de uma negociação nova, não atenderia nossa necessidade no método `filter()`, assim invertemos a saída (!) para true para que o filter considere o novo elemento na lista.

- [x] *Cap 14*: Persistência de dados com IndexedDB
    - Praticando *indexedDB* em arquivo separado. `client/db.html`
    
    ```javascript
        const openRequest = indexedDB.open("nomeDoBanco", 1) //1 é a versão do banco
    ```

    - O retorno de `open()` é uma instância de **IDBOpenDBRequest**, que é uma requisição de abertura do banco. Toda vez que fazemos uma requisição, precisaremos lidar com os eventos `onupgradeneeded`, `onsuccess` e `onerror`.
    
    ```javascript
        openRequest.onupgradeneeded = e => console.log('Cria ou altera um banco já existente')
        openRequest.onsuccess = e => console.log('Conexão obtida com sucesso')
        openRequest.onerror = e => console.log(e.target.error)
    ```

    - A conexão com o banco é obtida através dos eventos `onsuccess` e `onupgradeneeded` que retorna uma instância de **IDBDatabase** representando a conexão.
    - Em `db.html` criamos a conexão e guardamos sua instância na variável `connection`
    - **Object Store**: algo análogo às tabelas do SQL
    - Precisamos verificar se uma Store existe ou não no momento de sua criação. Se existir, vamos apagá-la antes de criá-la novamente, pois o evento `onupgradeneeded` também pode ser disparado quando o banco for atualizado.
    - `connection.objectStoreNames.contais()`: método que realiza a verificação da existência de uma store através de seu nome.
    - `connection.deleteObjectStore()`: método que apaga a store indicada
    - `connection.createObjectStore()`: cria a store

    ```javascript
        openRequest.onupgradeneeded = e => {
            console.log('Cria ou altera um banco já existente')
            connection = e.target.result

            if(connection.objectStoreNames.contains('negociacoes')){
                connection.deleteObjectStore('negociacoes')
            }

            connection.createObjectStore('negociacoes', {autoIncrement:true})
        }
    ```

    - `autoIncrement:true`: cria internamente um identificador único para os objetos salvos na store
    - O método `onupgradeneeded` só é chamado quando a versão do banco é superior a que já se encontra armazenada, assim, precisamos mudar a versão do banco para "2" na solicitação de conexão.
    - **Transação de escrita:** 
    ```javascript
    function adiciona(){
        const negociacao = new Negociacao(new Date(), 200, 1);
        const transaction = connection.transaction(['negociacoes'], 'readwrite')
        const store = transaction.objectStore('negociacoes')
        const request = store.add(negociacao)

        request.onsuccess = e => {console.log('negociação salva com sucesso!')}
        request.onerror = e => {console.warn();('não foi possível salvar a negociação!')}
    }
    ```
    `connection.transaction()` recebe dois parâmetros. O primeiro é o **nome da store** que receberá a transação e o segundo é a permissão de acesso, ou seja, `readwrite` para **escrita** e `readonly` para apenas leitura.

    Podemos também encadear todas as chamadas de métodos, assim evitamos a criação de muitas variáveis, deixando o método `adiciona()` assim:

    ```javascript
    function adiciona(){
        const negociacao = new Negociacao(new Date(), 200, 1);
        
        const request = connection //chamadas encadeadas -----------------
            .transaction(['negociacoes'], 'readwrite')
            .objectStore('negociacoes')
            .add(negociacao)

        request.onsuccess = e => console.log('negociação salva com sucesso!')
        request.onerror = e => console.warn();('não foi possível salvar a negociação!')
    }
    ```

    - **Cursores:** 

    ```javascript
    function listaTodos(){
        const negociacoes = []
        const cursor = connection
            .transaction(['negociacoes'], 'readwrite')
            .objectStore('negociacoes')
            .openCursor()
        
        cursor.onsuccess = e => {
            const negociacao = new Negociacao(
                atual.value._data,
                atual.value._quantidade,
                atual.value._valor
            )
            negociacoes.push(negociacao)
            atual.continue()
        } //retorna em cada item acessado na objectStore
        cursor.onserror = e => console.warn(`Error: ${e.targeterror.name}`)
    }
    ```
    O método `listaTodos()` percorre a objectStore **negociacoes** iterando sobre cada item encontrado e armazenando no array negociacoes cada um deles. Como `atual.value` retorna objetos com as propriedades de negociacões, precisamos criar uma nova instância de Negociacao com cada item encontrado e armazenar essa instância no array negociacao.
    
- [x] *Cap 15*: IndexedDB e Boas Práticas na conexão
    
    - Criação da `client/app/util/ConnectionFactory` que será responsável por lidar com as conexões com o indexedDB
    - A classe tem um método estático `getConnection()` que retorna uma `Promise` pois **conexões com o banco são realizadas de maneira assíncrona**.
    - A conexão precisa atender algumas regras:
        - Uma única conexão para toda a aplicação. Independente de quantas chamadas forem feitas, getConnection deve retornar a mesma conexão.
        - Apenas `ConnectionFactory` pode fechar a própria conexão. O método `.close()` não pode ser chamado por ninguém de fora.
    - Antes da classe `ConnectionFactory` declaramos um array que armazena os nomes das stores disponíveis em nosso indexedDB.
    - Foi criado o **método privado** `_createStores()`, que recebe a lógica de criação de stores e só deve ser chamado pela própria classe.
    - Foi declarada também a variável `connection` para receber a conexão com o indexedDB e dentro da lógica da promise em `getConnection()` verificamos se já existe uma conexão criada na variável. Caso haja, essa conexão é enviada para `resolve`. Assim atendemos a regra da **conexão única**
    -**Padrão de projeto MODULE PATTERN**: para evitar o vazamento de `stores` e `connection` para o escopo global, vamos envolver `ConnectionFactory` em uma função `tmp()`. Assim criamos um escopo onde as variáveis e seus valores só são acessíveis dentro desta função.
    - Com esta ação, resolvemos a questão do acesso global às variáveis `stores` e `connection`, mas quebramos `getConnection()` da factory.
    - Para tornar possível o acesso global à `getConnection()` e à própria classe `ConnectionFactory`, definimos que `tmp()` deve retornar a definição da classe. Esse retorno é passado para a chamada da função `tmp()` atribuído à variável `const ConnectionFactory`
    - Agora, se tentarmos acessar `stores` ou `connection`, teremos um **undefined** pois não existem fora do escopo de `tmp()`, mas `getConnection()` existe no escopo global pois foi passado nas propriedades da classe `ConnectionFactory` para a variável global.
    - **IIFE ou Função imediata**: criamos `tmp()` para encapsular as variáveis e métodos de `ConnectionFactory`, mas isso não nos impede de acessar `temp()` indefinidas vezes. Então vamos utilizar a abordagem de funções imediatas para que apenas `ConnectionFactory.js` seja capaz de realizar a própria chamada.
    
    **como estava antes, utilizando `tmp()`**
    ```javascript
        function tmp(){
            const stores = ['negociacoes']
            let connection = null

            return class ConnectionFactory{
                constructor(){
                    //...
                }
                static getConnection(){
                    //...
                }
                static _createStores(connection){
                    //...
                }
            }
        }
        const ConnectionFactory = tmp()
    ```

    **como ficou utilizando IIFE**
    ```javascript
        const ConnectionFactory = (() => {
            const stores = ['negociacoes']
            let connection = null

            return class ConnectionFactory{
                constructor(){
                    //...
                }
                static getConnection(){
                    //...
                }
                static _createStores(connection){
                    //...
                }
            }
        })()
    ```

    - **Monkey Patch**: Modificação de uma API já existente. No caso deste projeto, é a alteração do **método `close()`** original da conexão existente, que passará a lançar uma excessão quando houver uma tentativa de acesso fora da própria conexão. **Atendendo assim à regra de que a conexão não pode ser encerrada pelo desenvolvedor através da conexão criada.**

    Exemplo:
    ```javascript
    //o que queremos evitar
    ConnectionFactory.getConnection().then(conn => conn.close())
    ```

    ```javascript
    //como iremos evitar
    //cliente/app/util/ConnectionFactory.js
    //...
    openRequest.onsuccess = e => {
        connection = e.target.result;
        connection.close = () => {      //alteração do método close() padrão!
            throw new Error('A conexão não pode ser fechada diretamente!')
        }
        resolve(connection)
    }
    ```

    - Para concluir, o método estático `closeConnection()` foi criado para lidar com o encerramento da conexão dentro da classe `ConnectionFactory`. Mais uma vez, `bind` foi utilizado para que o método close() não perdesse seu contexto.

- [ ] *Cap 16*: Padrão de Projeto DAO
- [ ] *Cap 17*: Sistema de Módulos JS e Babel
- [ ] *Cap 18*: Promises, Async/await e padrões de projetos
- [ ] *Cap 19*: Padrão de Projeto Decorator, Fetch API, Metaprogramação com `reflect-metadata`
- [ ] *Cap 20*: Webpack, Boas práticas em desenvolvimento e produção, Deploy no GithubPages

## Observações

- Os comentários nos códigos serão removidos na *branch main*, mas mantidos na branch de cada versão para facilitar o entendimento do passo a passo.