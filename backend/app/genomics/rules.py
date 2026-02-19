"""
RULE DEFINITIONS
Maps phenotype → drug risk
"""

DRUG_RULES = {
    "CYP2C19": {
        "Poor Metabolizer": {"drug": "clopidogrel", "risk": "high"},
        "Intermediate Metabolizer": {"drug": "clopidogrel", "risk": "moderate"},
        "Normal Metabolizer": {"drug": "clopidogrel", "risk": "low"},
    },
    "CYP2D6": {
        "Poor Metabolizer": {"drug": "codeine", "risk": "high"},
        "Intermediate Metabolizer": {"drug": "codeine", "risk": "moderate"},
        "Normal Metabolizer": {"drug": "codeine", "risk": "low"},
    }
}


def apply_rules(analyzed_variants):
    results = []

    for item in analyzed_variants:
        gene = item["gene"]
        phenotype = item["phenotype"]

        rule = DRUG_RULES.get(gene, {}).get(phenotype)

        if rule:
            results.append({
                "gene": gene,
                "drug": rule["drug"],
                "risk_level": rule["risk"]
            })

    return results
