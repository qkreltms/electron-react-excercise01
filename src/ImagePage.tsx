import React, { useState, useEffect } from "react";
const { ipcRenderer } = window.require("electron");

const ImagePage: React.FC<{}> = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    ipcRenderer.on("image", (event: any, arg: any) => {
      console.log(arg)
      setImageUrl(arg);
    });
  }, []);

  return (
    <>
      <img src={imageUrl} alt="image" style={{ maxWidth: "100%" }} />
    </>
  );
};

export default ImagePage;
