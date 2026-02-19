def parse_vcf(filepath):
    variants = []

    with open(filepath, "r") as f:
        for line in f:
            if line.startswith("#"):
                continue

            cols = line.strip().split("\t")
            chrom, pos, vid, ref, alt, qual, flt, info, fmt, sample = cols

            info_dict = {}
            for item in info.split(";"):
                if "=" in item:
                    k, v = item.split("=")
                    info_dict[k] = v

            variant = {
                "gene": info_dict.get("GENE"),
                "rsid": info_dict.get("RS"),
                "star": info_dict.get("STAR"),
                "genotype": sample
            }

            variants.append(variant)

    return variants
