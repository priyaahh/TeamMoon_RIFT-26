"""
TEST FULL PIPELINE
This file runs the entire genomics pipeline:

VCF → parser → analyzer → rules → risk score → output
"""

# Import functions from your other files
from parser import parse_vcf
from analyze import analyze_variants
from rules import apply_rules
from risk import calculate_risk_score
from llm_engine import generate_report



def main():
    # =========================================================
    # 🔴 CHANGE THIS PATH TO YOUR VCF FILE
    # =========================================================
    # Use ONE of the options below

    # OPTION 1 (BEST for Windows)
    vcf_path = r"C:\Users\shakt\OneDrive\Desktop\RIFT\TeamMoon_RIFT-26\sample_vcfs\PGx_Test_600_Variants.vcf"

    # OPTION 2 (if your VCF is inside project folder)
    # vcf_path = "../../sample_vcfs/PGx_Test_600_Variants.vcf"

    # OPTION 3 (forward slashes)
    # vcf_path = "C:/Users/shakt/OneDrive/Desktop/RIFT/TeamMoon_RIFT-26/sample_vcfs/PGx_Test_600_Variants.vcf"

    print("\n--- STEP 1: Parsing VCF ---")
    variants = parse_vcf(vcf_path)
    print(f"Parsed {len(variants)} variants")

    print("\n--- STEP 2: Analyzing variants ---")
    analyzed = analyze_variants(variants)
    print(f"Analyzed {len(analyzed)} variants")

    print("\n--- STEP 3: Applying rules ---")
    rule_results = apply_rules(analyzed)
    print(f"Rules applied to {len(rule_results)} variants")

    print("\n--- STEP 4: Calculating risk score ---")
    risk_score = calculate_risk_score(rule_results)

    print("\n==============================")
    print("FINAL RISK SCORE:", risk_score)
    print("==============================\n")

    print("\n--- STEP 5: Generating AI Report ---")
    ai_summary = generate_report(risk_score)

    print("\nAI CLINICAL SUMMARY:\n")
    print(ai_summary)



if __name__ == "__main__":
    main()
