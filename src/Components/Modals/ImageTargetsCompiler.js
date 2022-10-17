import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ImageTargetsCompiler = () => {
  const [imageCompiler, setImageCompiler] = useState("");
  const handleChangeImageTargetsCompiler = (e) => {
    const imageCompilerFile2 = document.querySelector("fieldset");
    console.log(e.target.files);
    setImageCompiler(e.target.files);

    var formAdd = new FormData();
    if (e.target.files.length === 0) {
      imageCompilerFile2.innerText = imageCompiler[0].name;
      return;
    }
    formAdd.append("image_compiler", e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}imageTargets/files`, formAdd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        imageCompilerFile2.innerText = e.target.files[0].name;
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.message ?? "Error"));
  };

  useEffect(() => {
    const imageCompilerFile = document.querySelector("fieldset");
    const getImageCompiler = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}imageTargets/files`)
        .then((res) => {
          console.log(imageCompilerFile);
          res.data.data.length > 0 && imageCompilerFile
            ? (imageCompilerFile.innerText =
                res.data.data[0].image_compiler.filename)
            : (imageCompilerFile.innerText = "Please choose file");
          console.log(imageCompilerFile);
        })
        .catch((err) => console.log(err));
    };
    getImageCompiler();
  }, []);

  return (
    <Box className="image-compiler">
      <Button variant="contained">
        <a
          href={`${process.env.REACT_APP_IMAGE_COMPILER}`}
          target="_blank"
          rel="noreferrer"
        >
          Image Targets Compiler
        </a>
      </Button>
      <TextField
        type="file"
        onChange={handleChangeImageTargetsCompiler}
        id="image_file"
      />
    </Box>
  );
};

export default ImageTargetsCompiler;
