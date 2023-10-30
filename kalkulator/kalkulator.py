
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
    result = float(ledd[0]) / float(ledd[1])

print("RESULTAT:", result)


