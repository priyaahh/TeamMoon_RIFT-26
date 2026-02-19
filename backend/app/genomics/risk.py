def calculate_risk_score(rule_results):

    score = 0

    for r in rule_results:
        level = r.get("risk_level")

        if level == "high":
            score += 3
        elif level == "moderate":
            score += 2
        else:
            score += 1

    if score >= 3:
        category = "HIGH RISK"
        severity = "high"
        confidence = 0.9
    elif score == 2:
        category = "MODERATE RISK"
        severity = "moderate"
        confidence = 0.7
    else:
        category = "LOW RISK"
        severity = "low"
        confidence = 0.5

    return {
        "category": category,
        "confidence": confidence,
        "severity": severity
    }
