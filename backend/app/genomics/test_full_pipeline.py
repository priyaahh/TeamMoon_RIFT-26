from parser import parse_vcf
from analyze import analyze_variants
from rules import apply_rules
from risk import calculate_risk_score


def main():

    # 🔴 CHANGE THIS PATH
    vcf_path = r"C:\Users\shakt\OneDrive\Desktop\RIFT\TeamMoon_RIFT-26\sample_vcfs\PGx_Test_600_Variants.vcf"

    print("\nSTEP 1: Parsing VCF")
    variants = parse_vcf(vcf_path)

    print("STEP 2: Analyzing")
    analyzed = analyze_variants(variants)

    print("STEP 3: Applying rules")
    rule_results = apply_rules(analyzed)

    print("STEP 4: Risk scoring")
    risk = calculate_risk_score(rule_results)

    print("\nFINAL RESULT")
    print(rule_results)
    print(risk)


if __name__ == "__main__":
    main()
