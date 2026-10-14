import os
import re

TARGET_DIR = "/home/tarun/projects/slatout-agency/src"

REPLACEMENTS = [
    # Hex replacements
    (r"#FFDBBB", r"#F97432"),
    (r"#ffdbbb", r"#f97432"),
    (r"#F26522", r"#F97432"),
    (r"#f26522", r"#f97432"),
    (r"#FE7004", r"#F97432"),
    (r"#fe7004", r"#f97432"),
    
    # RGB replacements
    (r"255, 219, 187", r"249, 116, 50"),
    (r"255,219,187", r"249,116,50"),
    (r"242, 101, 34", r"249, 116, 50"),
    (r"242,101,34", r"249,116,50"),
    (r"254, 112, 4", r"249, 116, 50"),
    (r"254,112,4", r"249,116,50")
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in REPLACEMENTS:
        new_content = re.sub(old, new, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith((".tsx", ".ts", ".css", ".js")):
            process_file(os.path.join(root, file))
