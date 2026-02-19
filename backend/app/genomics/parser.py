def parse_info_field(info_str):
    """
    Converts INFO column string into dictionary.
    Example:
    'GENE=CYP2D6;STAR=*4;RS=rs3892097'
    →
    {
        'GENE': 'CYP2D6',
        'STAR': '*4',
        'RS': 'rs3892097'
    }
    """
    info_dict = {}

    fields = info_str.split(";")
    for field in fields:
        if "=" in field:
            key, value = field.split("=", 1)
            info_dict[key] = value

    return info_dict


def parse_vcf(file_path):
    """
    Parses a VCF file and extracts:
    CHROM, POS, RSID, GENE, STAR allele, GENOTYPE
    """

    variants = []

    with open(file_path, "r") as file:
        for line in file:
            line = line.strip()

            # Skip empty lines
            if not line:
                continue

            # Skip metadata lines
            if line.startswith("##"):
                continue

            # Skip header line
            if line.startswith("#CHROM"):
                continue

            parts = line.split("\t")

            # Basic validation
            if len(parts) < 8:
                continue

            chrom = parts[0]

            try:
                pos = int(parts[1])
            except ValueError:
                pos = parts[1]

            rsid = parts[2]
            ref = parts[3]
            alt = parts[4]
            info = parts[7]

            genotype = None
            if len(parts) > 9:
                genotype = parts[9]

            # Parse INFO column
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


# Test block (optional, only runs if file is executed directly)
if __name__ == "__main__":
    vcf_path = r"C:\Users\shakt\OneDrive\Desktop\RIFT\TeamMoon_RIFT-26\sample_vcfs\PGx_Test_600_Variants.vcf"


    data = parse_vcf(vcf_path)

    print("VCF Loaded Successfully\n")

    for variant in data[:5]:
        print(variant)