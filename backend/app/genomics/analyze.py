"""
analyzer.py

This file:
1️⃣ Groups variants by gene
2️⃣ Determines metabolizer phenotype based on STAR alleles
3️⃣ Returns structured results for API or testing
"""

# Import the parser function
# If this file is inside the same folder as parser.py, this works:
from parser import parse_vcf


def group_by_gene(variants):
    """
    Groups STAR alleles by gene.

    Input:
        variants → list of dictionaries from parse_vcf()

    Output:
        {
            "CYP2D6": ["*4", "*4"],
            "CYP2C19": ["*1", "*17"]
        }
    """

    genes = {}

    for v in variants:
        gene = v.get("GENE")
        star = v.get("STAR")
        genotype = v.get("GENOTYPE")

        # Skip if gene or star not found
        if not gene or not star:
            continue

        # Initialize gene list if not present
        if gene not in genes:
            genes[gene] = []

        # Only count variant if genotype shows mutation
        # 0/0 → no mutation
        # 0/1 → one copy
        # 1/1 → two copies
        if genotype in ["0/1", "1/1"]:
            genes[gene].append(star)

            # If homozygous mutation, add twice
            if genotype == "1/1":
                genes[gene].append(star)

    return genes


def get_phenotype(gene, stars):
    """
    Determines metabolizer phenotype for a gene
    based on STAR allele combination.

    ⚠️ You can modify rules here later if needed.
    """

    stars = sorted(stars)

    # ========================
    # CYP2D6 Rules
    # ========================
    if gene == "CYP2D6":
        if stars.count("*4") >= 2:
            return "Poor Metabolizer"

        if "*10" in stars or "*17" in stars:
            return "Intermediate Metabolizer"

        return "Normal Metabolizer"

    # ========================
    # CYP2C19 Rules
    # ========================
    if gene == "CYP2C19":
        if stars.count("*2") >= 2:
            return "Poor Metabolizer"

        if "*17" in stars:
            return "Rapid Metabolizer"

        return "Normal Metabolizer"

    # If gene not defined above
    return "Unknown Phenotype"


def analyze_variants(variants):
    """
    Main analyzer function.

    Input:
        variants (output of parse_vcf)

    Output:
        [
            {
                "gene": "CYP2D6",
                "stars": ["*4", "*4"],
                "phenotype": "Poor Metabolizer"
            }
        ]
    """

    gene_map = group_by_gene(variants)

    results = []

    for gene, stars in gene_map.items():
        phenotype = get_phenotype(gene, stars)

        results.append({
            "gene": gene,
            "stars": stars,
            "phenotype": phenotype
        })

    return results


# ==========================================================
# TEST BLOCK (runs only if you execute this file directly)
# ==========================================================
if __name__ == "__main__":

    # 🔴 CHANGE THIS PATH IF NEEDED
    # If your VCF is inside backend/sample_vcfs:
    vcf_path = r"C:\Users\shakt\OneDrive\Desktop\RIFT\TeamMoon_RIFT-26\sample_vcfs\PGx_Test_600_Variants.vcf"


    # If running from a different folder, update this path accordingly

    # Step 1: Parse VCF
    data = parse_vcf(vcf_path)

    # Step 2: Analyze variants
    result = analyze_variants(data)

    print("\nAnalysis Result:\n")

    for r in result:
        print(r)