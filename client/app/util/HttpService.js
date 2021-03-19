System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            let HttpService = class HttpService {

                _handleErrors(res) {
                    if (!res.ok) throw new Error(res.statusText);
                    //se não estiver ok, lança uma exceção, caso contrário retorna a própria resposta
                    return res;
                }

                get(url) {
                    return fetch(url).then(res => this._handleErrors(res)) //verifica se a requisição será realizada
                    .then(res => res.json()); //res.json() retorna automáticamente para a próxima chamada encadeada a .then
                }

                //reescrito no cap.19.6 para utilizar API FETCH
                // get (url) {
                //     return new Promise((resolve, reject) => {
                //         const xhr = new XMLHttpRequest()
                //         xhr.open('GET', url)
                //         xhr.onreadystatechange = () => {
                //             if(xhr.readyState == 4){
                //                 if(xhr.status == 200){
                //                     //resultado passado já parseado para o RESOLVE
                //                     resolve(JSON.parse(xhr.responseText))
                //                 } else {
                //                     reject(xhr.responseText)
                //                 }
                //             }
                //         }
                //         xhr.send()
                //     })
                // }
            };

            _export("HttpService", HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map