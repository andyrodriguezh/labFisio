

frecuenciaCardiaca = 0
VO2mAX = 0.0
genero = ""

genero = input("Ingrese su género (M/F): ").upper()
frecuenciaCardiaca = int(input("Ingrese su frecuencia cardiaca: "))

def queens():
    if genero == "M":
        VO2mAX = 111.33 - (0.42 * frecuenciaCardiaca)
    elif genero == "F":
        VO2mAX = 65.81 - (0.1847 * frecuenciaCardiaca)
    else:
        print("Género no válido, por favor ingrese 'M' para masculino o 'F' para femenino.")
        return None
    return round(VO2mAX, 2)

print("Su VO2Max es: ", queens())