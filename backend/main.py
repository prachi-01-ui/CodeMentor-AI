# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import openai
from dotenv import load_dotenv
import os

# Load .env if present
load_dotenv()

OPENAI_API_KEY = os.getenv("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")
if not OPENAI_API_KEY:
    raise RuntimeError("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 not found. Set it in environment or .env file.")
openai.api_key = OPENAI_API_KEY

app = FastAPI(title="CodeMentor AI - Backend")

# CORS - allow local dev origins (tighten in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str | None = ""
    error: str

@app.get("/")
def root():
    return {"status": "ok", "message": "CodeMentor AI backend is running."}

@app.post("/explain")
async def explain_error(request: CodeRequest):
    if not request.error or request.error.strip() == "":
        raise HTTPException(status_code=400, detail="Please provide an 'error' string in the request body.")
    prompt = f"""
You are a friendly coding mentor. The user pasted an optional code snippet and an error message below.
Explain the error in simple terms, give up to 3 concise steps to fix it, and show a short corrected example if possible.

Code:
{request.code}

Error:
{request.error}
"""
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=600,
        )
        explanation = resp["choices"][0]["message"]["content"].strip()
        return {"explanation": explanation}
    except openai.error.OpenAIError as e:
        raise HTTPException(status_code=502, detail=f"OpenAI API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

