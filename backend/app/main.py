# backend/app/main.py

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
from .utils import parse_vcf

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "PharmaGuard Backend Online"}

@app.post("/process-vcf")
async def process_vcf(file: UploadFile = File(...)):
    file_location = f"temp_{file.filename}"
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)
    
    # Parse VCF
    try:
        variants_df = parse_vcf(file_location)
    except Exception as e:
        return JSONResponse(content={"status": "Error parsing VCF", "detail": str(e)}, status_code=400)
    finally:
        os.remove(file_location)  # Clean up temp file

    # For now, just return parsed variants as JSON
    return JSONResponse(content={"status": "VCF processed", "variants": variants_df.to_dict(orient="records")})