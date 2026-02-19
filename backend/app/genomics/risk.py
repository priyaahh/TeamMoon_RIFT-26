"""
risk.py

This file converts gene phenotype results
into drug recommendations using rules.py
"""

from rules import DRUG_RULES


def get_drug_recommendations(gene_results):
    """
    Input:
        [
            {"gene": "CYP2D6", "stars": [...], "phenotype": "Poor Metabolizer"}
        ]

    Output:
        [
            {"gene": "CYP2D6", "drug": "Codeine", "recommendation": "Avoid"}
        ]
    """

    recommendations = []

    for result in gene_results:
        gene = result.get("gene")
        phenotype = result.get("phenotype")

        # Check if gene exists in rules
        if gene in DRUG_RULES:

            gene_rules = DRUG_RULES[gene]

            # Check if phenotype exists for that gene
            if phenotype in gene_rules:

                for drug_rule in gene_rules[phenotype]:
                    recommendations.append({
                        "gene": gene,
                        "phenotype": phenotype,
                        "drug": drug_rule["drug"],
                        "recommendation": drug_rule["recommendation"]
                    })

    return recommendations
