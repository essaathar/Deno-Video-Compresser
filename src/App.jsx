import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Index from "./pages/index.jsx";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState(null);
  const [data, setData] = useState("");

  async function handleUpload() {
    console.log("Handle Upload called...");
    if (files) {
      console.log("files: ", files);
      const fd = new FormData();
      fd.append("file", files);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: fd,
        // method: "POST",
        // headers: {
        //   "Content-Type": "application/json", // Specify content type as JSON
        // },
        // body: JSON.stringify({ message: "Hello from Frontend!" }),
      });
      if (response.ok) {
        const msg = await response.json();
        setData(msg.message);
      } else {
        setData("error in response...");
      }
    } else {
      console.log("No file selected");
    }
  }

  return (
    <>
      <h1>Video Compresser</h1>
      <input
        onChange={(e) => {
          setFiles(e.target.files[0]);
        }}
        type="file"
      />
      <button className="click-btn" onClick={handleUpload}>Upload</button>
      <h2>Message from Backend: {data}</h2>
    </>
  );
}

export default App;