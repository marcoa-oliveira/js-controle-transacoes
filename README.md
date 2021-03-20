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

    - **Exceções**: Tratamento de exceções lançadas com `throws`. Dentro do bloco `try`, temos a instrução que pode, ou não, ocasionar uma exceção. Em caso positivo, o fluxo do código é direcionado para o bloco `catch`, que recebe como parâmetro um objeto com informações da exceção lançada.
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

    - **Monkey Patch**: Modificação de uma API já existente. No caso deste projeto, é a alteração do **método `close()`** original da conexão existente, que passará a lançar uma exceção quando houver uma tentativa de acesso fora da própria conexão. **Atendendo assim à regra de que a conexão não pode ser encerrada pelo desenvolvedor através da conexão criada.**

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

- [x] *Cap 16*: Padrão de Projeto DAO
    - **DAO - Data Access Object**
    - Classe `cleint/app/domain/negociacao/NegociacaoDao,js` responsável por lidar com detalhes da conexão. 
    - Adotamos o **padrão** de que as classes DAO têm como nome, o nome da classe do **modelo persistido** + a terminação DAO.
    - A classe DAO recebe uma conexão ao banco em seu construtor, assim podemos reutilizar a mesma classe em outro banco apenas passando a conexão correta.

    ```javascript
    const negociacao = new Negociacao(new Date(), 7, 100)
    
     ConnectionFactory
        .getConnection() //retorna uma promise que fornece acesso à conexão
        .then(conn => new NegociacaoDao(conn)) //com a conexão, retornamos uma instância de NegociacaoDao
        .then(dao => dao.adiciona(negociacao)) //com NegociacaoDao acessível, passamos a negociacao a ser gravada
        .then(msg => console.log(msg)) //como adiciona() é uma promise, este then só executa em caso de sucesso
        .catch(err => console.log(err)) //se ocorrer algum erro em qualquer parte do processo, executa o catch

    //Promise{[[PromiseStatus]]:"pending",[[PromiseValue]]:undefined}
    ```

    - Métodos de persistência DAO **retornam Promisses** pois persistência com IndexedDB é assíncrono.
    - Como no exemplo acima, a `ConnectionFactory` cria uma conexão ao IndexedDB e com a conexão criada, utilizamos NegociacaoDao para lidar com a negociacação criada e gravá-la no banco. 
    
    ```javascript
    ConnectionFactory
        .getConnection()
        .then(conn => new NegociacaoDao(conn)) //**obs1
        .then(dao => dao.listaTodos())
        .then(negociacoes => console.log(negociacoes))
        .catch(err => console.log(err));

        //Promise {<pending>}
        //[Negociacao]   -------> retorna um array com todas as negociações persistidas

        //OBS1: errar a chamada da classe (ex.: chamar Negociacao) pode resultar em um .getDate() is not a function ou outro erro
    ```

    - Nesse momento, temos os dois métodos DAO criados, mas sempre que precisamos de um deles, somos obrigados a criar uma conexão. Iremos resolver isso com uma **DAOFactory**
    - `client/app/util/DaoFactory.js` - será a classe responsável por isolar a criação da DAO.

    ```javascript
        DaoFactory.getNegociacaoDao().then(dao => console.log(dao))
        //retorna uma instância de NegociacaoDao no console
    ```

    - Com toda a infraestrutura pronta, podemos partir para a persistência das negociações. Em `NegociacaoController` precisamos alterar o método `adiciona()` para que realize a persistência da negociação do formulário.
    - Alteramos o método para que a **inclusão das negociações na tabela (view) só seja realizada caso a inclusão das negociações no banco seja realizada com sucesso**.
    - Para exibir todas as negociações, vamos alterar o **construtor** de `NegociacaoController` para que faça a chamada do método `listaTodos()` de `NegociacaoDao` logo que for instanciado. Agora, ao abrir a aplicação, já é apresentada uma lista das negociações presentes na store.
    - Funciona, mas por uma questão de **boas práticas**, devemos **isolar todo o código de inicialização que não diga respeito à própria classe** em um método isolado.
    
    ```javascript
    class exemplo {
        constructor(){
            let x = 0
            let y = 0
            //...
            this._init() //chamada do código isolado
        }

        _init(){
            //...código que faz a chamada de métodos de outra classe utilizados pelos construtor da classe exemplo
        }
    }
    ```
    
    - Ainda precisamos incluir um método de **remoção** das negociações em `NegociacaoDao`.
    - Assim, incluímos o método `apagaTodos()` em `NegociacaoDao` e alteramos o método `apaga()` de `NegociacaoController` para utilizar o método.
    - Alteramos a declaração da classe `NegociacaoDao` para que haja apenas a declaração do método `getNegociacaoDao()` e alteramos o consumo deste método em `NegociacaoController`.
    - **Quando utilizamos apenas um método, não é necessário a declaração de uma classe exclusiva para esse método, podemos apenas realizar a declaração da função**
    
    ```javascript
        class exemplo{
            static getExemplo(){
                //código omitido
            }
        }
    ``` 

    podemos trocar por:

    ```javascript
        function getExemplo(){
            //código omitido
        }
    ``` 

- [x] *Cap 17*: Sistema de Módulos JS e Babel
    - **Sistema de Módulos**: 
        - Cada *script é um módulo por padrão* que esconde seu código interno do mundo externo;
        - A instrução `import` permite que *artefatos de outros módulos* sejam importados, mas somente *artefatos exportados* (`export`) podem ser importados;
        - O `loader` será responsável por carregar o primeiro módulo e resolver dependências, poupando o desenvolvedor do cuidado na ordem de importação.
        - **Neste projeto**, utilizaremos a biblioteca [System.js](https://github.com/systemjs/systemjs) como *loader universal*.
        - Em `..\js-controle-transacoes\client`:
        
        ```console
            ..client: npm init
            .
            .
            .
            ..client: npm install systemjs --save
        ```

        - `npm init` gera o arquivo **package.json** responsãvel por guardar o *nome* e *versão* de todas as dependências baixadas pelo npm.
        - `npm install systemjs --save` instala o módulo *system.js* e salva suas informações em *package.json*
        - Ao terminar de executar a instalação, tanto o *System.js* quanto suas dependências estarão salvas em `..\client\node_modules`
        - Agora já podemos **remover todas as importações** de script em `index.html` e começar a passar essa responsabilidade para *System.js*, pois nossos scripts se tornarão *módulos*
            
            > Acidentalmente eu incluí como dependência o pacote System.js mais recente e não a versão especificada no livro (0.20.12) e não deu certo a realização dos passos seguintes. Removi a dependência `npm uninstall systemjs` e refiz o passo de instalação. Deu certo.
        
        - Para saber se a primeira alteração deu certo, ou seja, saber se passar a responsabilidade de **importar o módulo** `app.js` para *System.js* funcionou, precisamos subir o servidor disponibilizado no projeto, pois o *System.js* **baixa os módulos através de requisições assíncronas com XMLHttpRequest**.
        - Neste primeiro momento, a *importação de app.js* deu certo, mas recebemos uma mensagem de erro pois não temos as outras dependências solucionadas.
        - Analisando `app.js` podemos notar que sua única dependência é `NegociacaoController.js`, por isso vamos realizar a importação.

        ```javascript
        // app\app.js
        import {NegociacaoController} from './controllers/NegociacaoController.js'

        const controller = new NegociacaoController()
        const $ = document.querySelector.bind(document)
        
        //...resto do código omitido...
        ``` 

        Isso não resolve o problema, pois ainda não declaramos a permissão para a exportação da classe em `NegociacaoController.js`

        ```javascript
        // ./controller/NegociacaoControler.js
        export class NegociacaoController {
            //código omitido
        }
        ```

        - Também foi realizada a importação das dependências em todos os outros módulos do projeto.
        - Em `ConnectionFactory` já podemos remover o *IIFE* pois com o padrão de módulos, as variáveis e métodos ficam *automáticamente inacessíveis* fora dele.
        - Mesmo realizando todo o processo de *import* e *export* de dependências, ainda teremos uma mensagem de erro no console ao recarregarmos a página:

        ```javascript
        TypeError: Unable to dynamically transpile ES module
        A loader plugin needs to be configured via `SystemJS.config({ transpiler: 'transpiler-module' })`.
        at Qe (instantiate.js:462)
        at instantiate.js:241
        ```

        - A mensagem de erro informa que *System.js* não consegue realizar as importações dos módulos **sem o auxílio de um TRANSCOMPILADOR (*transpiler*)**
        - **TRANSPILER:** é um compilador que permite **realizar transformações** no código, adicionar código extra ou mesmo **traduzir** o código-fonte para outra linguagem.
        - Esse processo **pode ser realizado diretamente no navegador, mas é uma questão problemática em produção**, pois impacta no tempo de processamento da aplicação, *impactando o tempo de carregamento da página* e, consequentemente, o **Ranking de Pesquisa Orgânica do Google**.
        
    - **Babel**

    - Neste caso, o [Babel](https://babeljs.io) é o mais indicado, pois roda localmente (*em tempo de desenvolvimento*) e gera os arquivos modificados que serão carregados pelo navegador.
    
    - Ajustes necessários para a instalação configuração do Babel
        - **Renomear** a pasta `./client/app` -> `./client/app-src`: O sufixo `src` indica que a pasta armazena os arquivos originais do projeto
        - **Instalar** via NPM em `./client/` o *babel-cli*: `npm install babel-cli@6.24.1 --save-dev`
        - **Instalar** o plugin que adequa os módulos do ES2015 ao sistema de carregamento do *System.js*: `npm install babel-plugin-transform-es2015-modules-systemjs@6.24.1 --save-dev` 
        - **Criar o arquivo** `./client/.babelrc` e declarar nele que o módulo instalado deve ser utilizado.
        - **Adicionar** um script em `./client/package.json` chamado *build* dentro da tag *scripts*
        
        ```javascript
        //...
        "scripts":{
            //..
            "build": "babel app-src -d app --source-map"
        }
        ```

        - Agora podemos testar se tudo está ok rodando o comando `./client: npm run build`.
    
    - Ao utilizar o *babel* estamos utilizando um **build step** em nosso projeto, sendo assim, nossa aplicação não pode ser diretamente consumida sem passar por esse processo.
    - Instalamos também o *plugin* que permite ao *babel* a transformação dos nosso módulos (que no arquivo original seguem o padrão ES2015) para o formato do sistema de carregamento do *System.js*
    - O arquivo `.babelrc` é o responsável por listar o que o Babel deve utilizar, no caso desta instalação, a primeira inclusão é justamento o plugin de transformação dos módulos.
    - O script *build* carrega a instrução que o babel deve executar com nosso projeto, no caso, gerar a pasta **app** e os respectivos **source-map**. 
    - Ao rodar a build, geramos a pasta `./client/app` mas, *diferente daquela que foi inicialmente renomeada*, esta possui nosso código transpilado e o **source-map**. de cada arquivo. Assim, quando um erro for identificado pelo navegador, ele apontara a linha no arquivo transpilado, mas podemos utiliar o *sourcemap* para localizar no arquivo original.

    > Encontrei alguns problemas ao fazer o *build* da aplicação. Alguns módulos estavam quebrando por erro de digitação nas importações.
    > A função `getNegociacaoDao()` está caindo em um `Type error: getNegociacaoDao is not a function` apontando para `NegociacaoControler._init()`. **SOLUÇÃO**: Havia um erro na importação do módulo `DaoFactory.js` em `NegociacaoControler` apontando para o módulo errado. Também havia um erro no próprio método, não havia sido removido o IIFE corretamente.

    - Para evitar a necessidade de *roda um build* a cada alteração no código original, vamos adicionar um **watcher** do Babel no `package.json`.
        - Como pode ser observado, utilizamos muitos *imports* em `NegociacaoControler`, muitos deles originários da mesma pasta. Podemos simplificar esse tipo de situação utilizando **barrels**.
        - **Barrels**: um barrel é um *módulo que importa e exporta os módulos que importou* possibilitando importar em uma única instrução vários artefatos exportados pelo barrel. *Partindo do ponto de vista que cada pasta do projeto é um barril cheio de coisas*
        - Precisamos criar *pontos de entrada* para os módulos:
            - `./client/app-src/domain/index.js`
            - `./client/app-src/ui/index.js`
            - `./client/app-src/util/index.js`
        
        - Os arquivos **index.js** vão receber a lista de exportações dos *barris* em que estão.
        - Com as listas de exportações definidas, podemos alterar `NegociacaoControler`.

        ```javascript
        //client/app-src/controlers/NegociacaoControler.js
        import { Negociacoes, Negociacaoservice, Negociacao} from '../domain/index.js'
        //os outros imports seguem o mesmo modelo...
        ```

- [x] *Cap 18*: Promises, Async/await e padrões de projetos
    
    - Utilizamos *Promises* para evitar o *Callback Hell* e centralizar o tratamento de erros das promises envolvidas na operação. Um bom exemplo disso é o método `_init()`:

    ```javascript
    _init(){
        getNegociacaoDao()
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao)))
            .catch(err => this._mensagem.texto = err) //TRATA O ERRO EM APENAS UM LUGAR
    }
    ```

    - O problema é que, mesmo utilizando essa estrutura de promises, o código não é tão **legível** quanto um código **síncrono e bloqueante**.
    
    ```javascript
    //exemplo com bloco try-catch
    _init(){
        try{
            const dao = getNegociacaoDao() //bloq. a execução enquanto a promise não é resolvida
            const negociacoes = dao.listaTodos() //novamente bloq. a execução enquanto a promise não é resolvida
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
        }catch(err){
            this._mensagem.texto = err
        }
    }
    ``` 

    - Como `getNegociacaoDao` e `dao.listaTodos` são métodos *síncronos e bloqueantes* podemos capturar suas excessões através de cláusulas *try-catch*, já que o erro acontece na mesma pilha de execução. O problema dessa abordagem é que se uma das promises demora para responder, a aplicação congela enquanto não receber um retorno.

    **Async - Await**

    ```javascript
    async _init(){
        try{
            const dao = await getNegociacaoDao()
            const negociacoes = await dao.listaTodos()
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
        }catch(err){
            this._mensagem.texto = err
        }
    }
    ```

    - A abordagem acima é muito semelhante à anterior, síncrona. A diferença está nas instruçãos **async** e **await**.
    - **Async** indica que o método está preparado para lidar com operações assíncronas separadamente.
    - **Await** esta chamada antes dos métodos que retornam promises faz com que o bloco do método `_init()` seja suspenso da pilha de execução principal da aplicação, assim, a *aplicação segue sua execução normal enquanto as promises são resolvidas*. O retorno da promise faz com que o bloco retorne para a pilha principal.
    - Quando a *promise* (assíncrona e não bloqueante) é resolvida, internamente ocorre o **resume** do método `_init()`, retornando a pilha principal e ficando disponível para o *Event Loop*
    - **Generators**: São funções que permitem *Suspender ou Resumir* sua execução em qualquer ponto do bloco, mantendo o contexto original e podem retornar um valor mesmo sem a instrução `return`.

    ```javascript
    //exemplo
    function* minhaFuncaoGeradora(){
        for (let i = 0; i < 3; i++){
            //instrução yield! Suspende a execução do blocoda função e retorna o valor de i
            yield i
        }

    }

    let it = minhaFuncaoGeradora()
    
    //executa o bloco do GENERATOR, que será suspenso assim que encontrar a expressão yield
    let objeto = it.next()

    console.log(objeto.value) // 0 é o valor de i
    console.log(objeto.done) //false, ainda não terminou
    ```

    - Funções geradoras são declaradas com a keyword `function` seguida de `*` e retornam não um resultado, mas um **iterator**, um tipo de objeto especial que permite *resumir o generator* e, eventualmente, extrair valores.
    - `Yield` é a instrução responsável por suspender a execução do bloco do gerador e, quando especificado, retornar um valor acessível pelo iterator.
    - A instrução `.next()` (*do Iterator retornado*) faz com que o bloco da função geradora seja executado até que se depare com a instrução `yield` que irá suspendê-la. Essa chamada é obrigatória ao menos uma vez, pois *quando executamos uma função geradora*, ela não será executada inicialmente. Essa instrução **retorna um objeto** que possui as propriedades `value` e `done`. **Value** é qualquer valor retornado pela instrução. **Done** retorna um status *true* ou *false* sobre a conclusão do bloco da função do gerador. 
    - Cada chamada da instrução `.next()` promove uma execução da função. No exemplo acima, a **próxima chamada** de `it.next()` resultaria em uma nova execução da função e, consequentemente, `objeto.value` retornaria `i = 1` e `objeto.done = false` já que a estrutura do `for` não foi finalizada.
    
    ```javascript
    objeto = it.next()
    console.log(objeto.value) // 1
    console.log(objeto.done) // false
    objeto = it.next()
    console.log(objeto.value) // 2
    console.log(objeto.done) // false
    objeto = it.next()
    console.log(objeto.value) // undefined
    console.log(objeto.done) // true (for não executa pois i = 3)
    ```

    - Esse processo pode ser simplificado da seguinte forma:

    ```javascript
    let it = minhaFuncaoGeradora()
    let objeto = null

    while(!(objeto = it.next()).done){
        console.log(objeto.value)
    }
    ```

    **Modificando o método `_init()` com `async/await`**

    ```javascript
    async _init(){
        try {
            const dao = await getNegociacaoDao()
            const negociacoes = await dao.listaTodos()
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao)) 
        } catch (err) {
            this._mensagem.texto = err.message //extrai apenas a msg de erro da exceção
        }
    }
    ```

    - É importante lembrar que só se pode utilziar `await` para Promises dentro de funções `async`. Então outros métodos precisam ser alterados para que o funcionamento seja adequado, por exemplo, `adiciona()` e `apaga()` de `NegociacaoController`.
    - Outras alterações para utilizar `async/await`:
        - `NegociacaoController/importaNegociacoes()`
        - `negociacaoService/obtemNegociacoesDoPeriodo()`
        - `DaoFactory.js`

    **Garantindo compatibilidade com ES2015**

    - Instalação do **preset** do *Babel*: `./client: npm install babel-preset-es2017@6.24.1 --save-dev`
    - Adicionar o *preset* no `.babelrc`
    
    - Quando executado `npm run watch` ou `npm run build` o *preset* realiza a conversão de *async/await* para *promises*

    **Melhorando o tratamento de exceções**

    - As exceções da aplicação são tratadas com `try catch`, então vamos adotar por padrão que *exeções do tipo `ApplicationException`* **são de negócio**. Assim, devem apresentar mensagem diretamente ao usuário. Todos os outros tipos de exceções deverão ser exibidas *via log* para o desenvolvedor e apresentar uma mensagem genérica ao usuário.
    - Foi alterado o módulo `ApplicationException.js` para lidar com essa definição.
    - `Object.getPrototypeOf()` retorna o prototype do objeto

    - Alterações:
        - **Remoção** do `import` *DataInvalidaException* em `NegociacaoController`
        - **Importação** de *getExceptionMessage* em `NegociacaoController`
        - **Alteração** de todos os blocos `catch` para uso de `getExceptionMessage`
        - **Importação** de *ApplicationException* em `NegociacaoService`
        - **Alteração** de todos os `throw new Error('/*mensagem*/')` -> `throw new ApplicationException(/*mensagem*/)` 
    
    - Agora, qualquer exceção lançada por `NegociacaoService` será capturada pelo *bloco catch* em `NegociacaoController`

    **Debounce Pattern**

    - Criação do módulo `client/app-src/util/Debounce.js`
    - O módulo foi importado em `app.js` e evento do botão *importa negociações* passa a realizar a chamada da função `debounce` passando o método `importaNegociacoes()`.
    - Definimos um `timer` para *debounce* que receberá um ID a cada temporizador 

- [x] *Cap 19*: Padrão de Projeto Decorator, Fetch API, Metaprogramação com `reflect-metadata`

    **Padrão Decorator**
    
    - É um padrão de projeto que permite **adicionar um comportamento** a um objeto já existente **em tempo de execução** de forma *dinâmica*.
    
    ```javascript
    //app-src/controllers/NegociacaoController
    //...código omitido

    @debounce()
    async importaNegociacoes(){
        //...código omitido
    }
    //...código omitido
    ```

    - Dentro das implicações deste projeto, a aplicação do *Decorator*, da maneira apresentada acima, pode ainda não estar disponível com padrão oficial ECMAScript, mas podemos fazer uso da mesma através da instalação de scripts do *Babel*
    > Em 2018 (ano de publicação do livro base deste projeto, o uso de Decorator aguardava aprovação no TC39)

    - Para ter suporte a *Decorators* com o Babel:

    `./client: npm install babel-plugin-transform-decorators-legacy@1.3.4 --save-dev`

    - Em seguida, precisamos **adicionar** o plugin em `./client/.babelrc`
    - **Remover** o `import` de *Debounce* em `app.js`
    - **Criar** o arquivo `./client/jsconfig.json` e abilitar o uso de decorators (*assim evita que o visual studio code exiba uma mensagem de erro ao encontrar uma declaração de decorator*)

    > Aparentemente essa instrução não desativou a msg de erro. A solução foi permitir o uso de decorators em: `preferences -> settings`, pesquisando por Decorators e habilitando *experimentalDecorators*

    - **Excluir o arquivo** `./util/Debounce.js` e seu `export`em `./util/index.js`
    - **Criação** de um novo arquivo chamado *Debounce* em `./util/decorators/Debounce.js`

    ```javascript
    //`./util/decorators/Debounce.js`
    export function debounce(milissegundos = 500){ //recebe uma qtd de tempo, a ser considerado, em milissegundos como param. 
        return function (target, key, descriptor){
            return descriptor
        }
    }
    ```

    - Se `debounce` não receber esse parâmetro de tempo, adotará um *default* de meio segundo, que é suportado pelo ES2015.
    - **Toda decorator** deve retornar outra função que recebe três parâmetros:
        - **Target**: O alvo do decorator
        - **Key**: Nome da propriedade na qual o decorator foi utilizado
        - **Descriptor**: Um objeto especial que dá acesso à implementação original do método ou função através de `descriptor.value`.
    - A função **sempre** deve devolver o `descriptor` modificado ou não
    - É necessário guardar uma referência para o método original dentro da função `const metodoOriginal = descriptor.value`, para aplicar o debounce, pois ao modificar este valor precisamos de uma referência para que o método original seja chamado
    - Com o debounce já implementado, vamos adicionar novamente em `./util/index.js`

    - Se tentarmos reutilizar o decorator `debounce` em outro método, como por exemplo `adiciona()`, o `event.preventDefault()` deixará de funcionar, pois o intervalo de tempo entre a chamada do debounce e a execução do submit são diferentes e o submit acaba passando.
    - Resolvemos isso:
    ```javascript
        export function debounce(milissegundos = 500) {
            return function(target, key, descriptor) {
                const metodoOriginal = descriptor.value;
                let timer = 0;
                descriptor.value = function(...args) {
                    // MUDANÇA!
                    if(event) event.preventDefault(); //caotura o evento
                    clearInterval(timer);
                    timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
                }
                return descriptor
            }
        }
    ```

    **DOM INJECTOR**

    - Na classe `NegociacaoController` buscamos as tags `input` do form através de `querySelectors` que recebem o seletor CSS dos elementos

    ```javascript
        //...código omitido
        constructor(){
            const $ = document.querySelector.bind(document)
            this._inputData = $('#data')
            this._inputQuantidade = $('#quantidade')
            this._inputValor = $('#valor')
            //...código omitido
        }
    ``` 

    - A ideia agora é a implementação de um **Decorator de Classe** que permita injetar as dependências de elementos da DOM na instância da classe. Algo como:

    ```javascript
        @controller('#data','#quantidade','#valor')
        export class NegociacaoController{
            constructor(inputData,inputQuantidade,inputValor){
                this._inputData = inputData
                this._inputQuantidade = inputQuantidade
                this._inputValor = inputValor
                //...código omitido
            }
        }
    ```

    - No exemplo acima, o decorator `@controller` recebe os seletores CSS dos elementos que desejamos passar para o novo `constructor` da classe na mesma ordem.
    - Foi criado o *decorator* `./util/decorators/Controller.js`
    - Assim como um *decorator* de método, este também retorna uma função, mas desta vez dará **acesso ao construtor da classe decorada**.
    - Concluído o *decorator* de `controller`, podemos exportar no *barrel* de utils e importar em `NegociacaoController`
    - O constructor da classe foi **alterado** para receber parâmetros e limpamos o código interno utilizando `Object.assign`
    
    **Requisições AJAX com API FETCH**

    - Simplifica drasticamente o código para a realização de requisições assíncronas (*ou Requisições Ajax*).
    > 2018) API Fetch é um recurso experimental 

    - O método `get()` da classe `./util/HttpService.js` foi reescrito para utilizar API FETCH
    - **Acessamos a API através da função global** `fetch(url)` que recebe a URL da requisição
    -  A promise retornada pela função **não retorna uma resposta parseada**, mas sim um objeto que encapsula a resposta e podemos lidar com isso através de `.text()` ou `.json()`
    - É preciso lidar com eventuais erros durante a operação. Isso pode ser **resolvido por quem chama** `get()`

    ```javascript
    //exemplo

    let service = new HttpService()
    service
        .get('http://endereco-da-api')
        .then(dados => console.log(dados))
        .catch(err => console.log(err)) //só será chamada se a Promise for rejeitada
    ```

    - Para que uma *promise* seja rejeitada, precisamos saber se a *requisição* foi **realizada com sucesso ou não** com base em `res.ok`
    - **Declaração** do método `_handleErrors(res)` em `HttpService`
    - `_handleErrors()` verifica se tudo funcionou bem com `res.ok`, retornando `this._handleErrors` que será acessível ao próximo `.then`

    **Configurando uma requisição com API FETCH**

    - Por **padrão**, as requisições são feitas com o **método GET**, mas podemos realizar requisições POST após configurar a requisição.
    - O servidor deste projeto está preparado para receber requisições POST que enviam JSON para `/negociacoes`
    - `app.js` terá as seguintes alterações:
        - `import` de Negociacao
        - Declaração de uma instância de `Headers` para a configuração do cabeçalho
        - Através do método `.set` do objeto, idicamos seu `Content-Type`
        - A variável `body` recebe os dados que desejamos enviar para a API convertidos em JSON
        - A variável `config` recebe as configurações de acesso à API
        - Com tudo definido, é realizado o `fetch` no endereço da api
    
    > Havia um problema na execução do envio de requisições via POST para o server da aplicação devido alterações no código do mesmo. O código de `./server/app/api/index.js` apresentava um problema na `api.cadastraNegociacao` (linha 51). A solução encontrada foi a substituição do arquivo pelo presente no repositório oficial do projeto (branch 19).

    **Validação com parâmetro DEFAULT**

    - Sabendo que os parâmetros no `constructor()` de `./domain/negociacao/Negociacao.js` são obrigatórios, é necessário uma forma de validar se foram realmente passados.
    - **Criação** do módulo `./util/Obrigatorio.js` que exportará a função `obrigatorio(parametro)`.
    - **Export** de `Obrigatorio.js` ao *barrel* de `util`
    - **Import** de `Obrigatorio.js` em `Negociacao.js`
    - **Alteração do constructor** para utilizar `obrigatorio()`

    ```javascript
        constructor(
            _data = obrigatorio('data'), 
            _quantidade = obrigatorio('quantidade'), 
            _valor = obrigatorio('valor')){
                
            Object.assign(this, {_quantidade, _valor})
            this._data = new Date(_data.getTime())
            Object.freeze(this)
        }
    ```

    - Desta forma, qualquer tentativa de utilizar o construtor sem informar todos os parâmetros gerará uma mensagem de erro.

    **REFLECT-METADATA**

    > 2018) Em ECMAScript não há uma maneira especificada para a inclusão de metadados na definição de classes

    - A proposta de uso de **METADATA** tem como objetivo:
        - **Isolar** a lógica de **associação entre eventos da DOM e métodos do Controller**
        - Uma **solução** seria a criação do *decorator* `@bindEvent(event,selector,prevent)`, mas *decorators* são métodos que **são aplicados antes da classe ser instânciada**, então o problema seria: "como associar 'método - evento' sem uma instância?"
    
    > Existe uma API de reflexão no ECMAScript 2015 acessível através do objeto global `Reflect`, mas neste projeto será utilizado `reflect-metadata`

    - Instalação do projeto: `./client: npm install reflect-metadata@0.1.10 --save`
    - O módulo precisa ser importado em `index.html`
    - **Criação** do *decorator* `./util/decorators/BindEvent.js`
    - A função `Reflect.metadata()` recebe quatro parâmetros:
        - Nome do metadado, no caso do *decorator* `BindEvent.js`, utilizamos `'bindEvent'`
        - O segundo é um objeto (**o objeto**) contendo as propriedades: `event`, `selector`, `prevent` e `propertyKey`
        - O `prototype` da instância em que os metadados serão adicionados
        - O nome da propriedade que receberá o metadado. Como `@bindEvent` será usado apenas em métodos, `propertyKey` foi usado.
    - `BindEvent.js` **adicionado** ao *barrel* de util.
    - Para **extrair** metadados precisamos com o *decorator* de classe:
        - *Acessar a instância criada* e percorrer suas propriedades (`Object.getOwnPropertyNames()`)
        - *Verificar em cada propriedade* se o metadado **bindEvent** está presente (`Reflect.hasMetadata()`)
        - Em `./util/decorator/Controller.js` agora temos:

        ```javascript
        const constructorNovo = function(){
            //usamos function() para definir (e não => pois precisamos que o this do constructor seja dinâmico)
            //constructorNovo deverá chamar constructorOriginal passando os parâmetros necessários
            
            const instance = new constructorOriginal(...elements)
            //Object varre cada propriedade da da classe
            Object
                .getOwnPropertyNames(constructorOriginal.prototype)
                .forEach(property => {
                    if(Reflect.hasMetadata('bindEvent', instance, property)){
                        //precisa fazer a associação do evento
                    }
                })
        }
        ```

        - Foi criada uma função auxiliar `associaEvento()` que recebe a instância da classe e o metadado

        ```javascript
        
        function associaEvento(instance, metadado){
            document
                .querySelector(metadado.selector)
                .addEventListener(metadado.event, event => {
                    if(metadado.prevent) event.preventDefault()
                    instance[metadado.propertyKey](event)
                })
        }

        ```

        - Utilizando `Reflect.getMetadata()` a informação será extraída, passando como parâmetro *identificador do metadado* (`instance`), *instância da classe* e *nome da propriedade que possui o metadado* (`Reflect.getMetadata('bindEvent', instance, property)`)

        ```javascript
            const constructorNovo = function(){
            
                const instance = new constructorOriginal(...elements)
                Object
                    .getOwnPropertyNames(constructorOriginal.prototype)
                    .forEach(property => {
                        if(Reflect.hasMetadata('bindEvent', instance, property)){
                            //precisa fazer a associação do evento
                            associaEvento(instance, Reflect.getMetadata('bindEvent', instance, property))

                        }
                    })
            }
        ```

        - Após isso, já podem ser removidas as associações e alias em `./app-src/app.js`

- [x] *Cap 20*: Webpack, Boas práticas em desenvolvimento e produção, Deploy no GithubPages

    - Questões a serem observadas antes da finalização projeto:
        - Otimização da quantidade de requisições ao servidor
        - NPM para baixar e gerenciar dependências do front-end
        - Minificação de scripts para o ambiente de produção
        - Como obter resultados, semelhantes ao alcançado no servidor disponibilizado, em ferramentas de mercado
    
    **Webpack**

    - Webpack é um *module bundler* (agrupador de módulos), permite tratar diversos recursos da aplicação como um módulo, inclusive CSS.
    - Tudo é organizado no processo de **_build_** e no final gera um arquivo `bundle.js` contendo todos os módulos necessários para a aplicação. Sendo assim, **dispensa o uso de um *loader* como o *System.js* utilizado no projeto**.
    - **Alteração** de `index.html` para remover as configurações de `system.js` e importar `bundle.js`
    - **Apagar** a pasta `.client/app` (onde estão os arquivos transpilados pelo babel)
    - **Remoção** de `babel-cli` (*npm uninstall babel-cli --save-dev*) e `Systemjs` (*npm uninstall systemjs --save*)
    - Mesmo não utilizando mais `babel-cli` ainda é necessário ter o *Babel* no projeto para utilizar Webpack
    - **Instalação** do *Babel Core* `npm install babel-core@6.25.0 webpack@3.1.0 --save-dev`

    **webpack.config.js**

    - Arquivo que centraliza as configurações do **webpack**
    - Precisamos definir neste arquivo:
        - **Entry**: O primeiro módulo a ser carregado
        - **Output**: Ponto de saída do *Bundle* criado
    - **Criação** de `./client/webpack.config.js`

    ```javascript
    //webpack.config.js

    const path = require('path')

    module.exports = {
        entry: './app-src/app.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }

    ```

    - **Adicionar** em `./client/package.json` o *npm script* do binário do Webpack
    - **Remover** todos os scripts adicionados, mantendo apenas *test*
    
    **Babel-loader**

    - A ponte de ligação entre Webpack e Babel-core
    - **Instalação**: `npm install babel-loader@7.1.0 --save-dev`
    - **Configurar** o *module* no `webpack.config.js`
    
    ```javascript
    //webpack.config.js
        module:{
            rules:[
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
    ```

    - `test` indica a condição na qual o loader será utilizado. Neste caso, todos os arquivos com extensão *.js* serão considerados
    - `exclude` indica que a pasta *node_modules* não será processada
    - `use` faz a indicação do loader

    - **Remoção** do módulo `babel-plugin-transform`, pois já não é mais necessário devido compatibilidade do webpack com módulos ES2015
    `./client: npm uninstall babel-plugin-transform-es2015-modules-systemjs --save-dev`
    - **Alteração** `.babelrc` removendo todos os plugins exceto *transform-decorators-legacy*

    - Neste ponto, ao realizar o **build** `./client: npm run build-dev`, é gerada a pasta *dist* contendo **bundle.js**. Agora, mesmo sem subir o servidor da aplicação, a aplicação estará funcionando. **BUILD DE DESENVOLVIMENTO**

    **Build de Produção**

    - **Criação** do *npm script* `build-prod` em `package.json`:  `"build-prod": "webpack -p --config webpack.config.js"`
    - O parâmetro `-p` indica ao webpack que queremos uma versão minificada de *bundle.js* para produção
    - Neste ponto, ao realizar o **build** `./client: npm run build-prod`, será gerada a versão para produção, mas teremos uma mensagem de erro.

    > ERROR in bundle.js from UglifyJs. Unexpected token: name (Negociacao)

    - Este erro acontece pela questão dos **módulos não serem compatíveis com ES2015**.
    - Então, não faremos mais uso do parâmetro `-p` e sim do plugin `babili-webpack-plugin`
    - **Instalação** do plugin `./client: npm install babili-webpack-plugin@0.1.1 --save-dev`
    - **Configurar** o plugin em `webpack.config.js` verificando se `process.env.NODE_ENV` está em `production`
    - **Configurar** `package.json` para atribuir `NODE_ENV = production` em toda chamada de `run build-prod`
        - Essa solução só funciona em ambientes *MAC e LINUX*, neste caso temos que utilizar uma solução *multiplataforma*
        - **Instalar** o módulo `cross-env`: `npm install --save-dev cross-env@5.0.1`
        - **Alterar** `package.json` para fazer uso do *cross-env*
        `"build-prod": "cross-env NODE_ENV=production webpack --config webpack.config.js"`
    - Neste ponto, `npm run build-prod` gerará o bundle.js minificado

    **Webpack Dev Server**

    - O problema aqui é que **a cada alteração no projeto**, um `npm run build-dev` precisa ser realizado para que a alteração seja passada para o ambiente de desenvolvimento.
    - **Instalar** o módulo `webpack-dev-server`, um servidor para o ambiente de desenvolvimento integrado ao Webpack. Dispara um build no projeto toda vez que um arquivo for alterado.
    - **Alterar** `./server/config/express.js` para desabilitar a disponibilização do projeto ao navegador
    - **Alterar** `./negociacao/NegociacaoService.js` e adicionar `http://localhost:3000` ao endereço de acesso da API
    - **Instalar** `./client: npm install webpack-dev-server@2.5.1 --save-dev`
    - **Incluir** o script `"start": "webpack-dev-server"` em `package.json`
    > Esqueci de realizar esta etapa e o terminal exibia um erro: *npm missing script start*
    - **Excluir** a pasta `dist`, que só deve existir quando executado `npm run build-dev` ou `build-prod`
    - Durante o uso do *webpack dev server* o `build` é realizando na memória do servidor
    - O novo *localhost* disponibilizado é o `localhost:8080`
    - Ao carregarmos a página (`./client: npm start`), o console do navegador exibe um aviso de erro por não ter encontrado `bundle.js`. Isso ocorre pois apontamos para o local antigo dele (que por sinal não existe mais)
    - **Alterar** `webpack.config.js`:
    
    ```javascript
    //webpack.config.js
    //...código omitido
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "dist" // adicionamos esta nova chave para o caminho público acessivel
    }
    //...
    ```

    > Não está carregando os dados do servidor!

    **CSS como módulos**

    - **Apagar** pasta `./client/css`
    - **Instalar** o bootstrap via npm: `npm install bootstrap@3.3.7 --save-dev`
    - **Remover** importações de CSS de `index.html`
    - **Importar** o bootstrap em `app.js`
    - Ainda precisamos de um *loader* para auxiliar o webpack a lidar com CSS como se fosse módulo
        - *css-loader*: transforma arquivos css importados em JSON
        - *style-loader*: utiliza a informação JSON para adicionar os estilos "inline" diretamente no HTML através da tag style
     - **Instalar**:
        - `npm install css-loader@0.28.4 style-loader@0.18.2 --save-dev`
    - **Configurar** o uso dos loaders em `webpack.config.json`

    ```javascript
        module:{
            rules:[
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader' //nova regra!
                }
            ]
        }
    ```

    - Neste momento, se subirmos a aplicação novamente, receberemos várias mensagens de erro devido dependências do bootstrap que o webpack não sabe como resolver durante o build.
    - Para isso, utilizaremos neste projeto o `url-loader` e `file-loader`
        - `npm install url-loader@0.5.9 file-loader@0.11.2 --save-dev`
    - **Adicionar** novas regras para o uso do *url-loader* e *file-loader*
    - **Criar** um arquivo CSS em `client/css/meucss.css`
    - **Importar** em `app.js`

    **FOUC - Flash of Unstyled Content**

    - Ao carregar a aplicação, durante uma fração de tempo *a página surge sem a implementação do CSS*. Isso ocorre pois os estilos importados são aplicados programaticamente pelo *bundle* 
    - Vamos **retornar** com a importação via *tag link* em `index.html`
    - **Instalar** o plugin `extract-text-webpack-plugin`
        `npm install extract-text-webpack-plugin@3.0.0 --save-dev`
    - **Importar** em `webpack.config.js` e guardar sua instância dentro da lista de plugins e **Alterar** as regras de CSS.

    **Minificação de CSS**
    
    - `dist/styles.css` é carregado, mas não está otimizado. Podemos solucionar esse problema da seguinte maneira:
        - **Instalar**: `npm install optimize-css-assets-webpack-plugin@2.0.0 --save-dev` e `npm install cssnano@3.10.0 --save-dev`
    
    **Importando Scripts**
    Ao realizarmos o *import* de `bootstrap/js/modal.js` em `app.js` não temos nenhuma notificação de erro no terminal, mas no console do navegador temos uma notificação de que este modal *depende* de **JQuery**
    - **Instalar** `npm install jquery@3.2.1 --save`
    - **Importar** em `app.js`
    - Mesmo fazendo essas alterações, continuamos com o mesmo problema, pois estamos lidando com uma **dependência global**
    - Para tornar o *JQuery* **globalmente disponível**, vamos utilizar `webpack.ProvidePlugin`. Ele carrega os módulos automaticamente ao invés de importá-los em qualquer lugar.
    - **Importar** `webpack` em `webpack.config.js`

    **SCOPE HOISTING**

    - Cada módulo do *bundle* é envolvido por um **wrapper**, que é uma função.
    - A existência de *wrappers* torna a execução no navegador **mais lenta**
    - **Scope Hoisting**: concatenar o escopo de todos os módulos em um único wrapper permitindo agilizar a execução no navegador
    - Este recurso será ativado apenas em produção
    - **Ativar** *Scope Hoisting* em `webpack.config.js` 
    
    > `ModuleConcatenationPlugin()` está setado como *depreciado*!

    **Separação de bibliotecas**

    - *Bundle.js* possui todo o código da aplicação, incluindo das bibliotecas que foram utilizadas no projeto. Porém, a cada alteração no projeto, um novo bundle é gerado e necessita ser novamente "cacheado".
    - Precisamos separar o código da aplicação das bibliotecas para otimizar esse processo
    - **Utilizar** `CommonsChunkPlugin` em `webpack.config.js`

    ```javascript
    
    if(process.env.NODE_ENV == 'production'){
        //...código omitido
        
        //utilizando CommonsChunkPlugin
        plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.bundle.js'
            })
        )
        
        //código omitido
    }
    
    ```

    - `vendor`: a parte da aplicação com essa identificação (todas as bibliotecas indicadas e que fazem parte de node_modules) farão parte de `vendor.bundle.js`
    - Agora vamos dividir a aplicação em duas partes editando `webpack.config.js`

    ```javascript
    module.exports = {
        entry: {
        app: './app-src/app.js', //aqui a aplicação tem a build dividida com dois pontos de entrada (app e vendor)
        vendor: ['jquery', 'bootstrap', 'reflect-metadata']
    },
    ``` 

    - **Alterar** `index.html` para carrear `vendor.bundle.js`

    > Ao dar o build do projeto após estes passos, o console exibe a seguinte mensagem de erro:

    ```console
    chunk vendor [entry]
    bundle.js
    Conflict: Multiple assets emit to the same filename bundle.js    
    ```
    *Pesquisar como resolver*

    **Gerar a página principal automáticamente**

    - **Instalar**: `npm install html-webpack-plugin@2.29.0 --save-dev`
    - **Renomear**: `index.html` para `main.html`
    - **Remover**: todas as tags *link* e *script* que importam CSS e Javascript de `main.html`
    - **Alterar**: `webpack.config.js`, o plugin recebe um objeto como parâmetro com suas configurações dentro:
        - `hash`: se *true* insere um hash no final da url de arquivos javascript e css importados no html. *Bom para Versionamento e Cache*
        - `minify`: recebe as configurações para minificar o html
        - `filename`: nome do arquivo HTML que será gerado
        - `template`: caminho do arquivo que servirá de template na geração de index.html
    - **Alterar**: o caminho dos imports dos scripts e estilos para atender o novo local de index.html (`./client/dist/index.html`)


    > O projeto avançou apenas até o **Cap.20.15** - alguns problemas no build impossibilitaram o avanço no projeto e, no momento, não sei como resolvê-los ou em que ponto estão concentrados. Em algum momento retorno para o projeto.


## Observações

- Os comentários nos códigos serão removidos na *branch main*, mas mantidos na branch de cada versão para facilitar o entendimento do passo a passo.