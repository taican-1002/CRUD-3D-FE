import React from "react";
import { Button } from "@mui/material";

const ImageTargetsCompiler = () => {
  return (
    <Button variant="contained" sx={{ margin: " 0 0 20px" }}>
      <a
        href={`${process.env.REACT_APP_IMAGE_COMPILER}`}
        target="_blank"
        rel="noreferrer"
      >
        Image Targets Compiler
      </a>
    </Button>
  );
};

export default ImageTargetsCompiler;
