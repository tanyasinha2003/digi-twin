import React, { useState } from "react";
 
import fullscreen from "../assets/images/full-screen.png"
 
const Graph = () => {
  const [graphSrc, setGraphSrc] = useState(null); // No default graph source
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
 
  const handleFileChange = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
 
    setIsLoading(true); // Set loading to true before the API call
 
    try {
      // Replace with your local API endpoint
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });
 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
 
        const data = await response.json();
     
     
      setGraphSrc(data.graphUrl); // Update according to your API response
    //   setGraphSrc("/graph.html")
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false); // Reset loading state after the API call
    }
  };
 
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileChange(file);
    }
  };
 
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
    setIsDragging(false);
  };
 
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };
 
  const handleDragLeave = () => {
    setIsDragging(false);
  };
 
  return (
    <>
    <div className="w-[51rem] h-[45rem] absolute bg-[#31363F] opacity-80 rounded-lg left-[2rem] top-[7rem] "></div>
    <div
      className={`mt-[3rem] relative bg-[#ececec] ml-[3rem] w-[49rem] h-[43rem] rounded-lg flex flex-col items-center justify-center border ${
        isDragging ? "border-dashed border-blue-500" : "border-gray-300"
      }  `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".json,.png,.jpg,.csv,.pdf" // Adjust accepted file types as needed
        onChange={handleFileInputChange}
        className="mb-4 border rounded p-2 hidden" // Hide default file input
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className={`cursor-pointer  border border-gray-300 rounded-lg text-gray-700 ${
          graphSrc ? "p-1 mr-auto ml-[1rem]  text-sm mb-[1rem]" : "p-4 "
        }`}
      >
        {graphSrc ? "Change the current file" : "Choose or Drag a file here"}
      </label>
      {graphSrc && (
        <button
          onClick={() => window.open(graphSrc, "_blank")}
          className="absolute top-2 right-[1rem] p-1 border border-gray-300 rounded-lg cursor-pointer"
        >
          <img
            src={fullscreen}
            alt="Open in full screen"
            className="w-6 h-6"
          />
        </button>
      )}
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Fetching your graph...</p>
        </div>
      ) : graphSrc ? (
        <iframe
          src={graphSrc}
          width="95%"
          height="90%" // Adjust to fit the input above
          style={{ border: "none" }}
          title="Knowledge Graph"
        />
      ) : (
        ""
      )}
    </div>
    </>
  );
};
 
export default Graph;