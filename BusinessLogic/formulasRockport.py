
edad = 0
peso = 0.0
tiempoIngresado = 0.0
tiempo = 0.0
frecuenciaCardiaca = 0
genero = ""
VO2Max = 0.0



edad= int(input("Ingrese su edad: "))
if edad > 79 or edad < 18:
    print("No se puede calcular el VO2Max con los datos ingresados, el rango de edad es de 18 a 79 años")
    exit()#Termina el programa en caso de ingresar una edad fuera del rango, se debe ajsutar a futuro para que vuelva a pedir la edad

peso= float(input("Ingrese su peso en LB: "))
genero= input("Ingrese su género (M/F): ").upper()
frecuenciaCardiaca= int(input("Ingrese su frecuencia cardiaca: "))
tiempoIngresado = input("Ingrese el tiempo en formato mm:ss: ")
minutos, segundos = map(float, tiempoIngresado.split(':'))
tiempo = minutos + (segundos / 60)


def rockport():
    if genero == "M" and edad >= 30 and edad <= 79:
        VO2Max = 139.168 - (0.3877 * edad) - (0.1692 * peso) - (3.2649 * tiempo) -(0.1565 * frecuenciaCardiaca)
    elif genero == "M" and edad >= 18 and edad <= 29:
        VO2Max = 97.660 - (0.0957 * peso) - (1.4537 * tiempo) - (0.1194 * frecuenciaCardiaca)
    elif genero == "F" and edad >= 30 and edad <= 79:
        VO2Max = 132.853 - (0.3877 * edad) - (0.1692 * peso) - (3.2649 * tiempo) - (0.1565 * frecuenciaCardiaca)
    elif genero == "F" and edad >= 18 and edad <= 29:
        VO2Max = 88.768 - (0.0957 * peso) - (1.4537 * tiempo) - (0.1194 * frecuenciaCardiaca)
    else:
        print("No se puede calcular el VO2Max con los datos ingresados, el rango de edad es de 18 a 79 años")
        return None
    return round (VO2Max, 3)

print("Su VO2Max es: ", rockport())

