const ConnectionFactory = ( () => {

    const stores = ['negociacoes']  //armazena as stores disponíveis no indexedDB 'jscangaceiro'
    let connection = null //receberá a conexão para garantir que haja uma única conexão com o indexedDB
    let close = null //receberá a referência original do método close() da conexão
    
    return class ConnectionFactory{
    
        constructor(){
            throw new Error('Não é possivel instâncias desta classe')
        }
    
        static getConnection(){
            return new Promise((resolve, reject) => {
                
                if(connection) return resolve(connection)  
    
                const openRequest = indexedDB.open('jscangaceiro', 2)
                
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result)
                }
    
                openRequest.onsuccess = e => {
                    connection = e.target.result
                    close = connection.close.bind(connection) //referência original de close é atribuida à variável
                    connection.close = () => {
                        throw new Error('A conexão não pode ser encerrada diretamente!')
                    }
                    resolve(e.target.result)
                }
                openRequest.onerror = e => {
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

        static closeConnection(){
            if(connection){
                close() //chama o close original atribuido na variável 
            }
        }
    }

})() 