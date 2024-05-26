from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from catGPT.Assistant import createMessageForAI

class RequestBody(BaseModel):
    message: str

app = FastAPI()

# Handle CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/getCatImage")
def read_root(req: RequestBody):
    return createMessageForAI(req.message)