# utils.py
import vcfpy
import pandas as pd

def parse_vcf(file_path):
    reader = vcfpy.Reader.from_path(file_path)
    variants = []

    for record in reader:
        gene = record.INFO.get("GENE", ["Unknown"])[0] if "GENE" in record.INFO else "Unknown"
        rsid = record.ID if record.ID else "Unknown"
        variants.append({
            "rsid": rsid,
            "gene": gene,
            "chrom": record.CHROM,
            "pos": record.POS,
            "ref": record.REF,
            "alt": [str(a) for a in record.ALT]
        })

    return pd.DataFrame(variants)
