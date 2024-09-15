from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/nonogram")
def get_nonogram():
    f = open('../nonograms/test.nono', "r")
    returnArr = []
    for line in f:
        vals = line.split(',')
        vals[len(vals) - 1] = vals[len(vals) - 1][0] # strip newline
        returnArr.append(vals)
    return {"nonogram": returnArr}
    