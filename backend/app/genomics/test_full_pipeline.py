"""
test_full_pipeline.py

This file tests the complete pipeline:
VCF → Parser → Analyzer → Risk → Output
"""

from parser import parse_vcf
from analyzer import analyze_variants
from risk import get_drug_recommendations


# 🔴 CHANGE THIS PATH IF NEEDED
# Make sure this path correctly points to your VCF file

vcf_path = "../../sample_vcfs/PGx_Test_600_Variants.vcf"


def main():
    print("\nStarting Full Pharmacogenomics Pipeline...\n")

    # Step 1: Parse VCF
    variants = parse_vcf(vcf_path)
    print("VCF parsed successfully.")

    # Step 2: Analyze gene phenotypes
    gene_results = analyze_variants(variants)
    print("Gene analysis complete.")

    # Step 3: Generate drug recommendations
    drug_results = get_drug_recommendations(gene_results)
    print("Drug recommendations generated.\n")

    print("FINAL OUTPUT:\n")

    for r in drug_results:
        print(r)


if __name__ == "__main__":
    main()
