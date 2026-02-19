def parse_vcf(file_path):
    variants = []

    with open(file_path, "r") as file:
        for line in file:
            if line.startswith("#"):
                continue

            parts = line.strip().split("\t")

            variant = {
                "CHROM": parts[0],
                "POS": parts[1],
                "RSID": parts[2],
                "REF": parts[3],
                "ALT": parts[4],
                "GENOTYPE": parts[-1]
            }

            variants.append(variant)

    return variants
