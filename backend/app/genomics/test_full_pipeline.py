import json
from datetime import datetime, timezone

from parser import parse_vcf
from analyze import analyze_variants
from rules import apply_rules
from risk import calculate_risk_score


def build_final_json(variants, analyzed, rule_results, risk_score):
    """
    Builds final JSON output required by project spec
    """

    primary = analyzed[0] if analyzed else {}

    return {
        "patient_id": "PATIENT_001",

        "drug": rule_results[0].get("drug", "unknown") if rule_results else "unknown",

        "timestamp": datetime.now(timezone.utc).isoformat(),

        "risk_assessment": {
            "risk_label": risk_score.get("category", "UNKNOWN"),
            "confidence_score": risk_score.get("confidence", 0.0),
            "severity": risk_score.get("severity", "unknown")
        },

        "pharmacogenomic_profile": {
            "primary_gene": primary.get("gene"),
            "diplotype": "/".join(primary.get("stars", [])),
            "phenotype": primary.get("phenotype"),
            "detected_variants": variants
        },

        "clinical_recommendation": rule_results[0] if rule_results else {},

        "quality_metrics": {
            "vcf_parsing_success": bool(variants),
            "variants_detected": len(variants)
        }
    }


def main():
    # 🔴 UPDATED VCF PATH
    vcf_path = r"C:\Users\shakt\OneDrive\Desktop\RIFT\TeamMoon_RIFT-26\sample_vcfs\TC_P1_PATIENT_001_Normal.vcf"

    # STEP 1: Parse VCF
    variants = parse_vcf(vcf_path)

    # STEP 2: Analyze variants → gene + stars + phenotype
    analyzed = analyze_variants(variants)

    # STEP 3: Apply drug rules
    rule_results = apply_rules(analyzed)

    # STEP 4: Calculate risk
    risk_score = calculate_risk_score(rule_results)

    # STEP 5: Build final JSON
    final_output = build_final_json(variants, analyzed, rule_results, risk_score)

    # PRINT JSON
    print(json.dumps(final_output, indent=2))


if __name__ == "__main__":
    main()