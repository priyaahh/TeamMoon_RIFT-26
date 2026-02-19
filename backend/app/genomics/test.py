def parse_vcf(file_path):
    variants = []

    with open(file_path, "r") as file:
        headers = None
        for line in file:
            line = line.strip()
            if not line:
                continue
            if line.startswith("##"):
                continue
            if line.startswith("#CHROM"):
                headers = line.split("\t")
                continue

            parts = line.split("\t")
            if len(parts) < 5:
                continue

            chrom = parts[0]
            try:
                pos = int(parts[1])
            except ValueError:
                pos = parts[1]

            ref = parts[3]
            alt = parts[4]
            record = {
                "CHROM": chrom,
                "POS": pos,
                "ID": parts[2] if len(parts) > 2 else ".",
                "REF": ref,
                "ALT": alt
            }

            # If FORMAT + at least one sample present, extract genotype(s)
            if len(parts) >= 9:
                fmt = parts[8]
                samples = parts[9:]
                # return FORMAT and first sample genotype (or all)
                record["FORMAT"] = fmt
                record["SAMPLES"] = samples
                record["GENOTYPE"] = samples[0] if samples else None
            else:
                record["GENOTYPE"] = None

            variants.append(record)

    return variants


if __name__ == "__main__":
    vcf_path = r"C:\Users\Blessy\Desktop\RIFTHACK\TeamMoon_RIFT-26\sample_vcfs\PGx_Test_600_Variants.vcf"
    # or use forward slashes:
    # vcf_path = "C:/Users/Blessy/Desktop/RIFTHACK/TeamMoon_RIFT-26/sample_vcfs/PGx_Test_600_Variants.vcf"

    data = parse_vcf(vcf_path)

    print("VCF Loaded Successfully\n")

    for variant in data[:5]:
        print(variant)