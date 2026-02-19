def analyze_variants(variants):
    """
    Convert parsed variants → gene + star alleles + phenotype
    """

    star_alleles = []

    for v in variants:
        if v["GENOTYPE"] == "1/1":
            star_alleles.append("*6")
        elif v["GENOTYPE"] == "0/1":
            star_alleles.append("*1")

    if not star_alleles:
        star_alleles = ["*1"]

    # determine phenotype
    if "*6" in star_alleles:
        phenotype = "PM"
    else:
        phenotype = "NM"

    return [{
        "gene": "CYP2D6",
        "stars": star_alleles[:2],   # keep diplotype small
        "phenotype": phenotype
    }]
