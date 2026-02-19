# backend/app/main.py

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
from dotenv import load_dotenv

from .genomics.parser import parse_vcf
from .genomics.analyze import analyze_variants
from .genomics.rules import apply_rules
from .genomics.risk import calculate_risk_score

from .genomics.test_full_pipeline import build_final_json
from .LLM.llm_engine import generate_report

load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "PharmaGuard Backend Online"}


@app.post("/process-vcf")
async def process_vcf(file: UploadFile = File(...)):

    file_location = f"backend/app/temp_{file.filename}"
    
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

        final_output = build_final_json(variants, analyzed, rules, risk_result )
        llm_input = {
            "risk_assessment": final_output["risk_assessment"],
            "pharmacogenomic_profile": final_output["pharmacogenomic_profile"],
            "clinical_recommendation": final_output["clinical_recommendation"]
        }

        # STEP 7: Generate LLM Explanation
        llm_output = generate_report(llm_input)
        final_output["llm_generated_explanation"] = llm_output        

    
        return JSONResponse(content={"status": "Error", "detail": str(e)},
            status_code=500
        )  
    except Exception as e:
        return JSONResponse(content={"status": "Error parsing VCF", "detail": str(e)}, status_code=400)
    finally:
        if os.path.exists(file_location):
            os.remove(file_location)  # Clean up temp file
         # For now, just return parsed variants as JSON  

    
        

    