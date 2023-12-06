let navn = localStorage.getItem("navnIT1Afagdag")
let poeng = localStorage.getItem("poengIT1Afagdag")
// console.log(poeng)
// console.log(document.getElementById("poeng"))

if (navn) {
    document.getElementById("navn").innerHTML = navn
}

document.getElementById("poeng").innerHTML = poeng
