
function regnUt(){
    let input = document.getElementById("input-field").value
    let ledd;

    if (input.includes("+")){
        ledd = input.split("+")
    }

    console.log(input, ledd)
}