from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import os
import shutil
from dotenv import load_dotenv
from app.parser import PDFParser
from app.analysis import Analyzer
from app.generator import PresentationGenerator

load_dotenv()

app = FastAPI(title="Autonomous Research Paper Analyzer API")
analyzer = Analyzer()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Autonomous Research Paper Analyzer API"}

@app.post("/upload")
async def upload_paper(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Save the file temporarily
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    try:
        # Parse PDF
        parser = PDFParser(file_path)
        text = parser.extract_text()
        
        # Analyze with LLM
        analysis_result = await analyzer.analyze_paper(text)
        
        # Generate PPTX
        pptx_path = f"summary_{file.filename.replace('.pdf', '.pptx')}"
        generator = PresentationGenerator(analysis_result)
        generator.generate(pptx_path)
        
        return {
            "filename": file.filename,
            "status": "success",
            "analysis": analysis_result,
            "pptx_url": f"/download/{pptx_path}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@app.get("/download/{filename}")
async def download_file(filename: str):
    if os.path.exists(filename):
        return FileResponse(filename, filename=filename)
    raise HTTPException(status_code=404, detail="File not found")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
