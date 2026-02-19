# backend/app/main.py

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
from dotenv import load_dotenv

from .utils import parse_vcf
from .analyze import analyze_variants
from .rules import apply_rules
from .risk import calculate_risk_score
from .test_full_pipeline import build_final_json
from .LLM.llm_engine import generate_report

load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "PharmaGuard Backend Online"}


@app.post("/process-vcf")
async def process_vcf(file: UploadFile = File(...)):
    file_location = f"temp_{file.filename}"

    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    try:
        # STEP 1: Parse VCF
        variants = parse_vcf(file_location)

        # STEP 2: Analyze
        analyzed = analyze_variants(variants)

        # STEP 3: Apply Rules
        rule_results = apply_rules(analyzed)

        # STEP 4: Risk Calculation
        risk_score = calculate_risk_score(rule_results)

        # STEP 5: Build Base JSON
        final_output = build_final_json(
            variants,
            analyzed,
            rule_results,
            risk_score
        )

        # STEP 6: Prepare LLM input
        llm_input = {
            "risk_assessment": final_output["risk_assessment"],
            "pharmacogenomic_profile": final_output["pharmacogenomic_profile"],
            "clinical_recommendation": final_output["clinical_recommendation"]
        }

        # STEP 7: Generate LLM Explanation
        llm_output = generate_report(llm_input)

        final_output["llm_generated_explanation"] = llm_output

        return JSONResponse(content=final_output)

    except Exception as e:
        return JSONResponse(
            content={"status": "Error", "detail": str(e)},
            status_code=500
        )

    finally:
        if os.path.exists(file_location):
            os.remove(file_location)
