function finnHvorMange(liste = [], element){
    if (!Array.isArray(liste))
        return null

    let counter = 0
    for (let i=0;i<liste.length;i++) {
        if (liste[i] === element) counter += 1
    }
    return counter
}
// console.log(finnHvorMange([2,2,"2",1,4], 2))

function finnStorstVerdi(liste = []) {
    if (!Array.isArray(liste))
        return null

    let biggestElement = liste[0]

    for (let i=0;i<liste.length;i++) {
        if (liste[i] > biggestElement) biggestElement = liste[i]
    }
    return biggestElement
}
// console.log(finnStorstVerdi([1,2,3]))

function finnMinstVerdi(liste = []) {
    if (!Array.isArray(liste))
        return null

    let smallestElement = liste[0]

    for (let i=0;i<liste.length;i++) {
        if (liste[i] < smallestElement) smallestElement = liste[i]
    }
    return smallestElement
}
// console.log(finnMinstVerdi([5,2,3]))

function sumAlleTall(liste = [], fromIndex=0) {
    if (!Array.isArray(liste))
        return null

    let total = 0

    for (let i=fromIndex;i<liste.length;i++) {
        if (typeof liste[i] === 'number') total += liste[i]
    }
    return total
}
// console.log(sumAlleTall([5,2,3, "asd"]))

function gjennomsnitt(liste=[]) {
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

    for (let i=0;i<liste.length;i++) {
        if (liste[i] === element) return i
    }
}

function reversert(liste=[], element) {
    if (!Array.isArray(liste))
        return null

    let nyListe = []
    for (let i=liste.length-1;i>-1;i--) {
        nyListe.push(liste[i])
    }
    return nyListe
}
// console.log(reversert([1,2,3,4,5]))

function listeInkluderer(liste=[], element) {
    if (!Array.isArray(liste))
        return null

    for (let i=0;i<liste.length;i++) {
        if (liste[i] === element) return true
    }
    return false
}

// MANGLER:
// sort, slice, splice, 

