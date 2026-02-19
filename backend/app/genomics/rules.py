"""
rules.py

This file stores all pharmacogenomic drug rules.
We separate this so logic is clean and scalable.
"""

DRUG_RULES = {
    "CYP2D6": {
        "Poor Metabolizer": [
            {
                "drug": "Codeine",
                "recommendation": "Avoid – reduced activation"
            }
        ],
        "Intermediate Metabolizer": [
            {
                "drug": "Amitriptyline",
                "recommendation": "Consider lower dose"
            }
        ],
        "Normal Metabolizer": [
            {
                "drug": "Codeine",
                "recommendation": "Standard dosing"
            }
        ]
    },

    "CYP2C19": {
        "Poor Metabolizer": [
            {
                "drug": "Clopidogrel",
                "recommendation": "Use alternative drug"
            }
        ],
        "Rapid Metabolizer": [
            {
                "drug": "Omeprazole",
                "recommendation": "May need higher dose"
            }
        ],
        "Normal Metabolizer": [
            {
                "drug": "Clopidogrel",
                "recommendation": "Standard dosing"
            }
        ]
    }
}
