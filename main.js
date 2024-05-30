'use strict'

const jobType = document.getElementById('form-job') //prendo elemento select dal DOM
const promoCode = document.getElementById('form-promo') //prendo l'elemento promo code dal DOM

const subBtn = document.getElementById('subBtn') //prendo elemento submit button dal DOM
const priceDiv = document.getElementById('price-div') //prendo div che contine la sezione prezzo dal DOM
const finalPrice = document.getElementById('final-price') //prendo elemento span con prezzo finale dal DOM
const finalPriceDec = document.getElementById('final-price-dec') //prendo elemento span con prezzo finale dal DOM

const validationElement = document.querySelectorAll('.cust-validation') //prendo dal DOM tutti gli elementi con classe .cust-validation (che richiedono validazione)
const validationArray = Array.from(validationElement) //creo un array contenente tutti gli elementi del dom con classe .cust-validation

let jobCost = 0// creo una variabile jobCost per determinare il costo orario a seconda del valore di job
let jobTime = 0// creo una variabile jobTime per determinare il tempo di lavoro a seconda del valore di job

const discounts = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'] //creo un array contenente tutti i promo code validi

//le variabili jobCost e jobTime cambiano valore in funzione di jobType
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

subBtn.addEventListener('click', function (event) {
    event.preventDefault() //blocco l'esecuzione default del submit per il prompt

    const discount = promoCodeCalc(promoCode, discounts) //definisco la variabile discount. valore è determinato dalla funzione promoCodeCalc. contestualmente viene fatta la validazione del capo form-promo

    let rawPrice = 0 //definisco la variabile output, con valore default = 0

    if (!dataValidation(validationArray).includes(false)) { //effettuo la validazione dei campi di input. se nessuno è false, procedo con calcolo e stampa in pagina
        rawPrice = (jobCost * jobTime) - (jobCost * jobTime * (discount / 100)) //assegno alla variabile output il prezzo del lavoro, al netto di eventuali sconti
        const rawPriceArr = rawPrice.toFixed(2).split('.') //imposto i decimali a 2 e divido la stringa così ottenuta al punto, ricavando un array da 2 elementi

        //riduco i centesimi a 0 
        let decimal = rawPriceArr[1] //assegno il secondo elemento dell'array (i decimali) ad una varibile
        if (Number(decimal) !== 0) {
            decimal = (Math.floor(Number(rawPriceArr[1]) / 10) * 10) //traformo i decimali in un numero decimale e lo arrotondo per difetto. lo moltiplico poi per 10 per ottenere due cifre
        }

        finalPrice.innerText = `€ ${rawPriceArr[0]}` //stampo in pagina il prezzo output
        finalPriceDec.innerText = `,${decimal}` //stampo in pagina i decimali del prezzo output
        priceDiv.classList.remove('d-none') //rimuovo la classe d-none per mostrare l'elemento in pagina

    } else {
        priceDiv.classList.add('d-none') //aggiungo la classe d-none per mostrare l'elemento in pagina
    }
})

/*definisco la funzione per verificare la validità di campi inseriti di input.
ha un parametro inputArray: un array di elementi del DOM (campi di input) da verificare
la funzione ritorna un array di bool*/

function dataValidation(inputArray) {

    /*definisco una variabile che sarà popolata con i valori booleani restituiti da map.
    ad ogni iterazione viene:
    1.rimossa l'eventuale validazione precedente
    2.verificata la validità di input
    3.aggiunta una classe bootstrap che mostra la validazione in pagina*/

    const outputArray = inputArray.map(function (input) {

        //rimuovo le classi bootstrap is-valid e is-invalid per resettare eventuali validazioni preesistenti
        input.classList.remove('is-invalid')
        input.classList.remove('is-valid')

        if (!input.checkValidity()) { //se checkValidity restituisce false aggiugo la classe is-invalid all'elemento di input
            input.classList.add('is-invalid')
        } else {
            input.classList.add('is-valid') //altrimenti aggiungo la classe bootstrap is-valid all'elemento di input
        }

        return input.checkValidity()
    })
    return outputArray
}

/*definisco una funzione per verificare la validità del codice sconto inserito dall'utente e definire la percentuale di sconto
la funzione ha due parametri: 
1. inputCode: il codice sconto inserito dall'utente
2. discountCodesArray: un array di codici da confrontare con il codice inputCode
la funzione ritorna la percentuale di sconto da applicare*/

function promoCodeCalc(inputCode, discountCodesArray) {

    //rimuovo le classi bootstrap .is-valid e is-invalid
    inputCode.classList.remove('is-invalid')
    inputCode.classList.remove('is-valid')

    let discount = 0 //definisco una variabile discount con valore default di 0 (nessuno sconto applicato)

    if (discountCodesArray.includes(inputCode.value.toUpperCase())) {
        inputCode.classList.add('is-valid') //se inputCode è vuoto o presente in discountCodesArray aggiungo classe bootstrap is-valid all'input
        discount = 25 //assegno la percentuale di sconto alla variabile discount

    } else if (inputCode.value === '') {
        inputCode.classList.add('is-valid') //se inputCode è vuoto o presente in discountCodesArray aggiungo classe bootstrap is-valid all'input

    } else {
        inputCode.classList.add('is-invalid') //altrimenti aggiungo classe bootstrap is-invalid
    }
    return discount
}
