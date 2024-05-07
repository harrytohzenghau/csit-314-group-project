import { useRef, useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import Input from "./Input";
import clasess from "./ImageUploader.module.css";

function ImageToBase64Converter({ imageUploadHandler }) {
  const fileRef = useRef();
  const [base64Image, setBase64Image] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImageHandler = () => {
    setBase64Image("");
    fileRef.current.value = "";
  };

  const uploadImageHandler = () => {
    if (base64Image === "") {
      return toast.error("Please select an image to upload.");
    }

    imageUploadHandler(base64Image, removeImageHandler);
  };

  return (
    <div className={clasess["image-uploader-preview-wrapper"]}>
      <h5>Upload an image</h5>
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileRef}
      />
      {base64Image && (
        <div className={clasess["image-uploader-preview-wrapper"]}>
          <h5>Preview</h5>
          <img src={base64Image} alt="Base64 Image" />
        </div>
      )}
      {base64Image && (
        <div className={clasess["image-uploader-button-wrapper"]}>
          <Button type="button" onClick={uploadImageHandler}>
            Upload
          </Button>
          <Button type="button" style="underline" onClick={removeImageHandler}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default ImageToBase64Converter;
