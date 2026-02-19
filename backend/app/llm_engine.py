import os
from openai import OpenAI

# Automatically reads from environment variable
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_report(data):
    prompt = f"""
    You are a pharmacogenomics expert.

    Based on this genetic analysis result:
    {data}

    Generate a clinical summary explaining:
    - Risk level
    - Drug implications
    - Clear explanation for doctor
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a pharmacogenomics expert."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    return response.choices[0].message.content
