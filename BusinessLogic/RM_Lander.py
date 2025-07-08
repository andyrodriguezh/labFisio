from tkinter.constants import ROUND

RM = 0
pesoLevantado = float(input("Ingrese el peso levantado: "))
repeticionesEjecutadas = int(input("Ingrese el número de repeticiones ejecutadas: "))

def Lander():
    RM = 100 * pesoLevantado / (101.3 - 2.67123 * repeticionesEjecutadas)
    return round(RM, 2)

print("El RM Estimado es: ", Lander())


