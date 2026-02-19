def parse_info_field(info_str):
    info_dict = {}
    fields = info_str.split(";")
    for field in fields:
        if "=" in field:
            key, value = field.split("=", 1)
            info_dict[key] = value
    return info_dict


def parse_vcf(file_path):
    variants = []

    with open(file_path, "r") as file:
        for line in file:
            line = line.strip()

            if not line:
                continue
            if line.startswith("##"):
                continue
            if line.startswith("#CHROM"):
                continue

            parts = line.split("\t")
            if len(parts) < 8:
                continue

            chrom = parts[0]
            pos = parts[1]
            rsid = parts[2]
            ref = parts[3]
            alt = parts[4]
            info = parts[7]

            genotype = None
            if len(parts) > 9:
                genotype = parts[9]

            info_dict = parse_info_field(info)

            record = {
                "CHROM": chrom,
                "POS": pos,
                "RSID": rsid,
                "REF": ref,
                "ALT": alt,
                "GENE": info_dict.get("GENE"),
                "STAR": info_dict.get("STAR"),
                "GENOTYPE": genotype
            }

            variants.append(record)

    return variants
