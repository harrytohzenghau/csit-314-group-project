import React, { useState, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import clasess from "./ImageUploader.module.css";

const ImageUploader = ({ imageUploadHandler }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileRef = useRef();

  const removeImageHandler = () => {
    setSelectedFile("");
    setPreviewUrl(null);

    fileRef.current.value = "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedFile) {
      imageUploadHandler(selectedFile, previewUrl, removeImageHandler);
    }
  };

  return (
    <div className={clasess["image-uploader-preview-wrapper"]}>
      <h5>Upload an image</h5>
      <Input ref={fileRef} type="file" onChange={handleFileChange} />
      {previewUrl && (
        <div className={clasess["image-uploader-preview-wrapper"]}>
          <h5>Preview</h5>
          <img src={previewUrl} alt="Preview" />
        </div>
      )}
      {selectedFile && (
        <Button type="button" onClick={handleImageUpload}>
          Upload Image
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
