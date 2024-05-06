function finnHvorMange(liste = [], element){
    if (!Array.isArray(liste)) //hvis parameteren ikke er en liste, vil ikke funksjonen kjøre
        return null

    let counter = 0
    for (let i=0;i<liste.length;i++) {
        if (liste[i] === element) counter += 1 //teller antall av ett element i en liste
    }
    return counter
}
// console.log(finnHvorMange([2,2,"2",1,4], 2))

function finnStorstVerdi(liste = []) { //finner største element i en liste
    if (!Array.isArray(liste))
        return null

    let biggestElement = liste[0]

    for (let i=0;i<liste.length;i++) { //sammenligner alle elementene
        if (liste[i] > biggestElement) biggestElement = liste[i]
    }
    return biggestElement
}
// console.log(finnStorstVerdi([1,2,3]))

function finnMinstVerdi(liste = []) { //finner minste element i liste
    if (!Array.isArray(liste))
        return null

    let smallestElement = liste[0]

    for (let i=0;i<liste.length;i++) { //sammenligner alle elementene
        if (liste[i] < smallestElement) smallestElement = liste[i]
    }
    return smallestElement
}
// console.log(finnMinstVerdi([5,2,3]))

function sumAlleTall(liste = [], fromIndex=0) { 
    //finner summen av alle tall i en liste fra en definert indeks
    //standard startIndeks er 0
    if (!Array.isArray(liste))
        return null

    let total = 0

    for (let i=fromIndex;i<liste.length;i++) {
        if (typeof liste[i] === 'number') total += liste[i]
    }
    return total
}
// console.log(sumAlleTall([5,2,3, "asd"]))

function gjennomsnitt(liste=[]) {//finner gjennomsnittet av tall i en liste
    if (!Array.isArray(liste)) 
        return null

    let total = 0
    let counter = 0

    for (let i=0;i<liste.length;i++) {
        if (typeof liste[i] === 'number'){
            total += liste[i]
            counter += 1
        } 
    }
    return total/counter
}
// console.log(gjennomsnitt([1,2,3,4]))

function finnIndex(liste=[], element) {
    if (!Array.isArray(liste))
        return null

    for (let i=0;i<liste.length;i++) { //finner første instans av et gitt element og returnerer indeksen
        if (liste[i] === element) return i
    }
}

function reversert(liste=[], element) {
    if (!Array.isArray(liste))
        return null

    let nyListe = []
    for (let i=liste.length-1;i>-1;i--) { // går baklengs gjennom en liste og returnerer dermed en reversert liste
        nyListe.push(liste[i])
    }
    return nyListe
}
// console.log(reversert([1,2,3,4,5]))

function listeInkluderer(liste=[], element) { //sjekker om en liste inneholder et gitt element
    if (!Array.isArray(liste))
        return null

    for (let i=0;i<liste.length;i++) {
        if (liste[i] === element) return true
    }
    return false
}

// MANGLER:
// sort, slice, splice, 

