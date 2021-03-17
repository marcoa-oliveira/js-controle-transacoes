var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade')
]

var tbody = document.querySelector('table tbody')

document.querySelector('.form').addEventListener('submit', function(event) {
    
    //preventDefault() impede que o formulário realize o submit e recarregue a página
    event.preventDefault()

    var tr = document.createElement('tr')

    //cria uma td, insere o valor do campo e adiciona a td na tr
    campos.forEach(function(campo) {
        var td = document.createElement('td')
        td.textContent = campo.value
        tr.appendChild(td)
    })

    //o campo volume representa o valor total da negociação e precisa ser calculado fora do foreach
    var tdVolume = document.createElement('td')
    tdVolume.textContent = campos[1].value * campos[2].value
    tr.appendChild(tdVolume)

    //adiciona a tr completa ao tbody
    tbody.appendChild(tr)

    //limpa os campos do form
    campos.forEach(function(campo){
        campo.value = ''
    })

    //define o foco para o primeiro campo novamente
    campos[0].focus()

})