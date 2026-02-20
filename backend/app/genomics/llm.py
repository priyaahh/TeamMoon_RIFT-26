# backend/app/genomics/llm.py

def generate_llm_explanation(data):
    """
    Temporary mocked LLM explanation for demo/testing.
    Replace with OpenAI version when billing is available.
    """

    risk_label = data.get("risk_assessment", {}).get("risk_label", "UNKNOWN")
    phenotype = data.get("pharmacogenomic_profile", {}).get("phenotype", "Unknown")
    drug = data.get("clinical_recommendation", {}).get("drug", "the prescribed drug")

    summary = f"Patient classified as {risk_label} based on pharmacogenomic profile."

    details = (
        f"The patient's phenotype is {phenotype}, which influences metabolism of {drug}. "
        f"Based on the computed pharmacogenomic risk assessment, the recommended clinical action "
        f"should follow the provided drug recommendation guidelines."
    )

    return {
        "summary": summary,
        "details": details
    }