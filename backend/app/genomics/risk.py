"""
risk.py

This file maps phenotype → drug recommendations
"""


def get_drug_recommendations(gene_results):
    """
    Input:
        [
            {"gene": "CYP2D6", "phenotype": "Poor Metabolizer"},
            {"gene": "CYP2C19", "phenotype": "Rapid Metabolizer"}
        ]

    Output:
        [
            {"gene": "CYP2D6", "drug": "Codeine", "recommendation": "Avoid"},
            {"gene": "CYP2C19", "drug": "Clopidogrel", "recommendation": "Increase Dose"}
        ]
    """

    recommendations = []

    for result in gene_results:
        gene = result["gene"]
        phenotype = result["phenotype"]

        # ========================
        # CYP2D6 Drug Rules
        # ========================
        if gene == "CYP2D6":
            if phenotype == "Poor Metabolizer":
                recommendations.append({
                    "gene": gene,
                    "drug": "Codeine",
                    "recommendation": "Avoid – reduced activation"
                })

            if phenotype == "Intermediate Metabolizer":
                recommendations.append({
                    "gene": gene,
                    "drug": "Amitriptyline",
                    "recommendation": "Consider lower dose"
                })

        # ========================
        # CYP2C19 Drug Rules
        # ========================
        if gene == "CYP2C19":
            if phenotype == "Poor Metabolizer":
                recommendations.append({
                    "gene": gene,
                    "drug": "Clopidogrel",
                    "recommendation": "Use alternative drug"
                })

            if phenotype == "Rapid Metabolizer":
                recommendations.append({
                    "gene": gene,
                    "drug": "Omeprazole",
                    "recommendation": "May need higher dose"
                })

    return recommendations
