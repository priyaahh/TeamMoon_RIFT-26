"""
RISK SCORING MODULE
"""

from rules import DRUG_RULES


def calculate_risk_score(rule_results):
    """
    Convert rule results into numeric risk score
    """

    score = 0

    for item in rule_results:
        risk = item.get("risk_level")

        if risk == "high":
            score += 3
        elif risk == "moderate":
            score += 2
        else:
            score += 1

    return {
        "total_score": score,
        "category": get_category(score)
    }


def get_category(score):
    if score >= 8:
        return "HIGH RISK"
    elif score >= 4:
        return "MODERATE RISK"
    else:
        return "LOW RISK"
