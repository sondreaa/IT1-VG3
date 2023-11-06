print("SKRIV INN REGNESTYKKET DITT:")
regnestykke = input(">").replace(",", ".")

if "+" in regnestykke:
    ledd = regnestykke.split("+")
    result = float(ledd[0]) + float(ledd[1])

elif "-" in regnestykke:
    ledd = regnestykke.split("-")
    result = float(ledd[0]) - float(ledd[1])

elif "*" in regnestykke:
    ledd = regnestykke.split("*")
    result = float(ledd[0]) * float(ledd[1])

elif "/" in regnestykke:
    ledd = regnestykke.split("/")
    if float(ledd[1]) != 0:
        result = float(ledd[0]) / float(ledd[1])
    else:
        result = 'Kan ikke dele på 0!'
        
else:
    result = 'error'

print("RESULTAT:", result)