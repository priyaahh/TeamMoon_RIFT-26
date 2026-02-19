import os
import json
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_report(data):

    prompt = f"""
    You are a clinical pharmacogenomics expert.

    Based on this patient pharmacogenomic result:

    {json.dumps(data, indent=2)}

    Return ONLY valid JSON in this exact format:

    {{
      "summary": "Short clinical summary",
      "details": "Detailed physician explanation including risk level and drug implications"
    }}

    Do not include markdown.
    Do not include extra text.
    Only return valid JSON.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a pharmacogenomics expert."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    content = response.choices[0].message.content

    try:
        return json.loads(content)
    except:
        return {
            "summary": "LLM generation failed.",
            "details": content
        }
