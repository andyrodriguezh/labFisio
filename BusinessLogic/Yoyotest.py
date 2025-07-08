from BusinessLogic.formulasQueens import VO2Max

VO2Max = 0.0
Distancia = 0

def YoyoTest():
    global VO2Max, Distancia
    Distancia = int(input("Ingrese la distancia recorrida en metros: "))

    if Distancia < 0:
        print("La distancia no puede ser negativa.")
        return None

    VO2Max = Distancia * 0.0084 + 36.4
    return round(VO2Max, 2)

print("Su VO2Max es: ", YoyoTest())