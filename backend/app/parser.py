import fitz  # PyMuPDF
import re

class PDFParser:
    def __init__(self, file_path):
        self.file_path = file_path
        self.doc = fitz.open(file_path)
    
    def extract_text(self):
        full_text = ""
        for page in self.doc:
            full_text += page.get_text()
        return full_text
    
    def extract_sections(self, text):
        # Basic heuristic for section detection
        sections = {
            "Abstract": "",
            "Introduction": "",
            "Methodology": "",
            "Results": "",
            "Conclusion": ""
        }
        
        patterns = {
            "Abstract": re.compile(r"Abstract\s*(.*?)\s*(?:Introduction|1\.)", re.S | re.I),
            "Introduction": re.compile(r"Introduction\s*(.*?)\s*(?:Related Work|Methodology|2\.)", re.S | re.I),
            "Methodology": re.compile(r"(?:Methodology|Methods)\s*(.*?)\s*(?:Experiments|Results|3\.)", re.S | re.I),
            "Results": re.compile(r"Results\s*(.*?)\s*(?:Conclusion|Discussion|4\.)", re.S | re.I),
            "Conclusion": re.compile(r"Conclusion\s*(.*?)$", re.S | re.I),
        }
        
        for section, pattern in patterns.items():
            match = pattern.search(text)
            if match:
                sections[section] = match.group(1).strip()
        
        return sections

    def extract_equations(self):
        # PyMuPDF can sometimes detect math if it's in specific fonts or symbols
        # For now, we'll use a regex for common LaTeX-like patterns if they exist
        # or simple heuristic for single-letter variables followed by equals
        equations = []
        full_text = self.extract_text()
        
        # Look for things like $...$ or \[ ... \] or standard equations
        # This is a placeholder; real equation extraction is complex
        equation_pattern = re.compile(r"(\$.*?\$|\\\[.*?\\\])", re.S)
        found = equation_pattern.findall(full_text)
        equations.extend(found)
        
        return list(set(equations))
