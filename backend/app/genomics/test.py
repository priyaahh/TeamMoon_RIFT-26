def parse_vcf(file_path):
    variants = []

    target_genes = ["CYP2D6", "CYP2C19", "TPMT"]

    with open(file_path, "r") as file:
        for line in file:
            if line.startswith("##"):
                continue
            
            if line.startswith("#"):
                continue

            parts = line.strip().split("\t")

            chrom = parts[0]
            pos = parts[1]
            rsid = parts[2]
            ref = parts[3]
            alt = parts[4]
            genotype = parts[-1]

            variant_data = {
                "rsid": rsid,
                "genotype": genotype,
                "ref": ref,
                "alt": alt
            }

            variants.append(variant_data)

    return variants


if __name__ == "__main__":
    data = parse_vcf("sample_vcfs/yourfile.vcf")
    
    print("Parsed Variants:")
    for v in data[:5]:
        print(v)