//function tmp(){ alterado para o uso de funções imediatas (IIFE)
const ConnectionFactory = ( () => {
    //a classe ConnectionFactory está envolvida pela função tmp() para garantir que as stores e conexões sejam acessadas apenas
    //no escopo da própria classe.

    const stores = ['negociacoes']  //armazena as stores disponíveis no indexedDB 'jscangaceiro'
    let connection = null //receberá a conexão para garantir que haja uma única conexão com o indexedDB
    let close = null //receberá a referência original do método close() da conexão
    
    return class ConnectionFactory{ //retornando a definição da classe, tornamos ela acessível globalmente, mas preservamos stores e connection
    
        constructor(){
            throw new Error('Não é possivel instâncias desta classe')
        }
    
        static getConnection(){
            //conexões com o banco são realizadas de maneira assincrona, então este médoto deve retornar uma promise
            return new Promise((resolve, reject) => {
                
                if(connection) return resolve(connection) //se já houver uma conexão, retorna para resolve 
    
                const openRequest = indexedDB.open('jscangaceiro', 2)
                
                openRequest.onupgradeneeded = e => {
                    //passa a conexão para o método privado
                    ConnectionFactory._createStores(e.target.result)
                }
    
                openRequest.onsuccess = e => {
                    //passa o resultado (a conexão) para a promise
                    //só será executado na primeira vez que a conexão for criada
                    connection = e.target.result
                    close = connection.close.bind(connection) //referência original de close é atribuida à variável
                    connection.close = () => {
                        throw new Error('A conexão não pode ser encerrada diretamente!')
                    }
                    resolve(e.target.result)
                }
                openRequest.onerror = e => {
                    //passa o erro para reject da promise
                    console.warn(e.target.error)
                    reject(e.target.error.name)
                }
            })
        }
    
        //_createStores é um método privado e por convenção só faz sentido ser chamado pela própria classe
        static _createStores(connection){
            stores.forEach(store => {
                if(connection.objectStoreNames.contains(store))
                    connection.deleteObjecStore(store)
                
                connection.createObjectStore(store, { autoIncrement: true })
            })
        }

        // static closeConnection(){
        //     if(connection){
        //         connection.close()
        //     }
        // }----------------- deste jeito, o método retornava uma msg de erro semelhante a de acesso externo pois o close padrão
        // foi alterado.

        static closeConnection(){
            if(connection){
                close() //chama o close original atribuido na variável 
            }
        }
    }

})() //torna a atribuição abaixo desnecessária.

//const ConnectionFactory = tmp() //chama a função e armazena a chamada da classe 