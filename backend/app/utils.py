# backend/app/utils.py

import vcfpy

def parse_vcf(file_path):
    variants = []

    reader = vcfpy.Reader.from_path(file_path)

    for record in reader:
        genotype = None

        if record.calls:
            genotype = record.calls[0].data.get("GT", "0/0")

        variants.append({
            "CHROM": record.CHROM,
            "POS": record.POS,
            "RSID": record.ID if record.ID else "Unknown",
            "REF": record.REF,
            "ALT": [str(a) for a in record.ALT],
            "GENOTYPE": genotype
        })

    return variants
