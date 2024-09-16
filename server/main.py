from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import date

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

startDate = date(2024,9,15)
cachedDay = -1
cachedPuzzle = []

def puzzleFromFile(dayNumber):
    f = open(f'../nonograms/{dayNumber}.nono', "r")
    returnArr = []
    for line in f:
        vals = line.split(',')
        vals[len(vals) - 1] = vals[len(vals) - 1][0] # strip newline
        returnArr.append(vals)
    return returnArr

@app.get("/nonogram")
def get_nonogram():
    global cachedDay
    global cachedPuzzle
    dayNumber = (date.today() - startDate).days
    if cachedDay != dayNumber:
        cachedPuzzle = puzzleFromFile(dayNumber)
        cachedDay = dayNumber
    return {"nonogram": cachedPuzzle}
    