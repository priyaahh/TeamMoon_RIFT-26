def apply_rules(analyzed_data):
    """
    Takes analyzed gene data and returns drug rules
    REQUIRED RETURN FORMAT:
    [
      {
        "drug": "...",
        "recommendation": "...",
        "risk_level": "high/moderate/low"
      }
    ]
    """

    results = []

    for item in analyzed_data:
        phenotype = item.get("phenotype")

        # CYP2D6 + codeine rules (example)
        if phenotype == "PM":
            results.append({
                "drug": "codeine",
                "recommendation": "Avoid use — poor metabolizer",
                "risk_level": "high"
            })

        elif phenotype == "IM":
            results.append({
                "drug": "codeine",
                "recommendation": "Reduce dose",
                "risk_level": "moderate"
            })

        else:
            results.append({
                "drug": "codeine",
                "recommendation": "Standard dosing ok",
                "risk_level": "low"
            })

    return results
