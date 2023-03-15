import React, { useState } from 'react';
import './uploadForm.css';
// import { useHistory } from 'react-router-dom';

function UploadForm() {
    const [inputType, setInputType] = useState("text");
    const [fileInput, setFileInput] = useState("");
    const [textInput, setTextInput] = useState("");
    const [sentences, setSentences] = useState([]);
    const [labels,setLabels] = useState([]);
    // const history = useHistory();


  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/helinivan/english-sarcasm-detector",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  function handleInputTypeChange(event) {
    setInputType(event.target.value);
  }

  function handleFileInputChange(event) {
    setFileInput(event.target.files[0].name);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result.split("\n");
      const sentences = lines.filter((line) => line.trim() !== "")
                            .map((line) => line.split(",")[0]);
      setSentences(sentences);
    };
    reader.readAsText(file);
  }

  function handleTextInputChange(event) {
    setTextInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(inputType === "text"){
        const input = inputType === "file" ? fileInput : textInput;
        query({ "inputs": input }).then((response) => {
            console.log(response)
            if(response[0][0].label === "LABEL_0"){
                console.log("Regular")
            }else{
                console.log("Sarcasm")
            }
            window.location.href = '/dashboard';
        });
    }else{
        console.log(sentences)
        const classLabels = []
        sentences.forEach(line => {
            query({ "inputs": line }).then((response) => {
                if(response){

                }
                if(response[0][0].label === "LABEL_0"){
                    console.log("Regular")
                    classLabels.push("Regular")
                }else{
                    console.log("Sarcasm")
                    classLabels.push("Sarcasm")
                }
            });
        });
        setLabels(classLabels)
        console.log("labels- ",labels)
        window.location.href = '/dashboard';
    }

    
  }

  return (
    <div className="upload__container">
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    className="upload__input"
                    type={inputType}
                    placeholder={inputType === "file" ? fileInput : "Enter text..."}
                    onChange={inputType === "file" ? handleFileInputChange : handleTextInputChange}
                />
                <select
                    className="upload__select"
                    onChange={handleInputTypeChange}
                >
                    <option value="text">Text</option>
                    <option value="file">Dataset File</option>
                </select>
            </div>

            <div>
                <button type="submit" className="upload__button">
                Start Classification
                </button>
            </div>
        </form>
    </div>
  );
}

export default UploadForm;