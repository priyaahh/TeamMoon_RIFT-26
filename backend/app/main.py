# backend/app/main.py

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
from .genomics.parser import parse_vcf
from .genomics.analyze import analyze_variants
from .genomics.rules import apply_rules
from .genomics.risk import calculate_risk_score

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "PharmaGuard Backend Online"}

@app.post("/process-vcf")
async def process_vcf(file: UploadFile = File(...)):
    file_location = f"backend/app/temp_{file.filename}"
    print("Uploaded file:", file.filename)
    print("Saved as:", file_location)
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)
    
    # Parse VCF
    try:
        variants = parse_vcf(file_location)
        # STEP 2: Analyze genetics
        analyzed = analyze_variants(variants)

        # STEP 3: Apply drug rules
        rules = apply_rules(analyzed)

        # STEP 4: Calculate risk
        risk_result = calculate_risk_score(rules)

        final_output = {
            "pipeline_status": "success",
            "variants_found": len(variants),
            "analysis": analyzed,
            "drug_rules": rules,
            "risk_assessment": risk_result
        }

    except Exception as e:
        return JSONResponse(content={"status": "Error parsing VCF", "detail": str(e)}, status_code=400)
    finally:
        if os.path.exists(file_location):
            os.remove(file_location)  # Clean up temp file
         # For now, just return parsed variants as JSON
        return JSONResponse(content={"status": "VCF processed", "analysis": analyzed,"drug_rules": rules,"risk_assessment": risk_result})