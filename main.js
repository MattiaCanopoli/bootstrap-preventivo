'use strict'
//prendo elemento select dal DOM
const job = document.getElementById('form-job')

//creo variabili costo orario per ogni job
const backCost = 20.5
const frontCost = 15.3
const projectCost = 33.6

//creo variabili tempo espresso in ore per ogni job
const backTime = 15
const frontTime = 12
const projectTime = 20

//prendo elemento submit button dal DOM
const subBtn = document.getElementById('subBtn')

//prendo elemento span con prezzo finale dal DOM
const priceDiv = document.getElementById('price-div')
const finalPrice = document.getElementById('final-price')

subBtn.addEventListener('click', function (event) {
    event.preventDefault()

    let jobPrice

    if (job.value === 'back') {
        jobPrice = backCost * backTime
    } else if (job.value === 'front') {
        jobPrice = frontCost * frontTime
    } else if (job.value === 'project') {
        jobPrice = projectCost * projectTime
    }

    console.log(jobPrice.toFixed(2))

    finalPrice.innerText = jobPrice.toFixed(2)
    priceDiv.classList.remove('d-none')

})
