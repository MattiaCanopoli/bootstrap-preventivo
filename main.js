'use strict'
//prendo elemento select dal DOM
const jobType = document.getElementById('form-job')

let jobCost // creo una variabile jobCost per determinare il costo orario a seconda del valore di job
let jobTime // creo una variabile jobTime per determinare il tempo di lavoro a seconda del valore di job

//entrambe le variabili cambieranno valore al cambiare della selezione del tipo di lavoro
jobType.addEventListener('change', function () {

    if (jobType.value === 'back') {
        jobCost = 20.5
        jobTime = 15
    } else if (jobType.value === 'front') {
        jobCost = 15.3
        jobTime = 12
    } else if (jobType.value === 'project') {
        jobCost = 33.6
        jobTime = 20
    }
})

const subBtn = document.getElementById('subBtn') //prendo elemento submit button dal DOM
const priceDiv = document.getElementById('price-div') //prendo div che contine la sezione prezzo dal DOM
const finalPrice = document.getElementById('final-price') //prendo elemento span con prezzo finale dal DOM

subBtn.addEventListener('click', function (event) {
    event.preventDefault() //blocco l'esecuzione default del submit per il prompt

    /*
    inserire validazione qui
    */

    let jobPrice = jobCost * jobTime //calcolo il prezzo del lavoro al lordo di sconti

    console.log(jobPrice.toFixed(2))

    finalPrice.innerText = jobPrice.toFixed(2) //stampo in pagina il prezzo jobPrice
    priceDiv.classList.remove('d-none') //rimuovo la classe d-none per mostrare l'elemento in pagina

})
