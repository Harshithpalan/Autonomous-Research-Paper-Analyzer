from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List, Optional
import os

class EquationAnalysis(BaseModel):
    equation: str
    purpose: str
    variables: dict
    simplified: str

class ResearchAnalysis(BaseModel):
    abstract_summary: str
    methodology_explained: str
    equation_analysis: List[EquationAnalysis]
    key_contributions: List[str]
    limitations: List[str]
    improvement_suggestions: List[str]
    presentation_outline: List[str]

class Analyzer:
    def __init__(self):
        # We can also use LangChain's load_dotenv if needed
        self.llm = ChatOpenAI(model="gpt-4-turbo-preview", temperature=0)
        self.parser = JsonOutputParser(pydantic_object=ResearchAnalysis)
    
    async def analyze_paper(self, text: str):
        prompt = ChatPromptTemplate.from_template(
            "You are a PhD-level research assistant. Analyze the following research paper text and return a structured JSON response.\n\n"
            "Format requirements:\n{format_instructions}\n\n"
            "Paper Text:\n{text}"
        )
        
        chain = prompt | self.llm | self.parser
        
        result = await chain.ainvoke({
            "text": text[:15000],  # Truncate to avoid context window issues for now
            "format_instructions": self.parser.get_format_instructions()
        })
        
        return result
