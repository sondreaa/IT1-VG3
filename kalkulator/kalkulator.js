function regnUt(){
    let input = document.getElementById('input-field').value
    input = input.replace(',','.') //bytter ut alle komma med punktum slik at utregning med desimaler fungerer

    let ledd
    let result

    //.split()-funksjonen deler leddene i en array med to items. så legger den samme med den aktuelle regneoperasjonen
    
    if (input.includes('*')){
        ledd = input.split('*')
        result = Number(ledd[0]) * Number(ledd[1])

    } else if (input.includes('/')){
        ledd = input.split('/')

        //sjekker om brukeren forsøker å dele på null, og hindrer at det skjer
        if (Number(ledd[1])!=0){
            result = Number(ledd[0]) / Number(ledd[1])   
        } else{
            result = 'grr nulldivisjon >:('
        }
    } else if (input.includes('+')){
        ledd = input.split('+')
        result = Number(ledd[0]) + Number(ledd[1])        

    } else if (input.includes('-')){
        ledd = input.split('-')
        result = Number(ledd[0]) - Number(ledd[1])

    } else {
        result = ('NaN')
    }
    console.log(ledd)
    console.log(input, result)

    //setter resultatet rett tilbake inn i input-feltet
    document.getElementById('input-field').value = result

}