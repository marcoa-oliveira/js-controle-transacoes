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

- [ ] *Cap 11*: Exceções
- [ ] *Cap 12*: XMLHttpRequest e conexão com API
- [ ] *Cap 13*: Callback Hell e Padrão de Projeto Promise
- [ ] *Cap 14*: Persistência de dados com IndexedDB
- [ ] *Cap 15*: IndexedDB e Boas Práticas na conexão
- [ ] *Cap 16*: Padrão de Projeto DAO
- [ ] *Cap 17*: Sistema de Módulos JS e Babel
- [ ] *Cap 18*: Promises, Async/await e padrões de projetos
- [ ] *Cap 19*: Padrão de Projeto Decorator, Fetch API, Metaprogramação com `reflect-metadata`
- [ ] *Cap 20*: Webpack, Boas práticas em desenvolvimento e produção, Deploy no GithubPages

## Observações

- Os comentários nos códigos serão removidos na *branch main*, mas mantidos na branch de cada versão para facilitar o entendimento do passo a passo.