"""
RULE DEFINITIONS
This file contains rule mappings for pharmacogenomics
"""

# Example rule database
DRUG_RULES = {
    "CYP2C19": {
        "high": {"drug": "clopidogrel", "risk": "high"},
        "moderate": {"drug": "clopidogrel", "risk": "moderate"},
        "low": {"drug": "clopidogrel", "risk": "normal"},
    },
    "TPMT": {
        "high": {"drug": "azathioprine", "risk": "high"},
        "moderate": {"drug": "azathioprine", "risk": "moderate"},
        "low": {"drug": "azathioprine", "risk": "normal"},
    }
}


def apply_rules(analyzed_variants):
    """
    Apply rule mapping to analyzed variants
    """
    results = []

    for variant in analyzed_variants:
        gene = variant.get("gene")
        impact = variant.get("impact", "low")

        rule_info = DRUG_RULES.get(gene, {}).get(impact)

        if rule_info:
            results.append({
                "gene": gene,
                "drug": rule_info["drug"],
                "risk_level": rule_info["risk"]
            })
        else:
            results.append({
                "gene": gene,
                "drug": "unknown",
                "risk_level": "normal"
            })

    return results
