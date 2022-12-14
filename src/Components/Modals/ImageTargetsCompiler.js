import React, { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ImageTargetsCompiler = () => {
  const deleteImageCompiler = async () => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}imageTargets/files`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleChangeImageTargetsCompiler = async (e) => {
    const imageCompilerFile2 = document.querySelector("fieldset");
    await deleteImageCompiler();

    var formAdd = new FormData();

    if (
      e.target.files.length === 0 ||
      !e.target.files[0].name.includes(".mind")
    ) {
      toast.error("File tải lên phải là .mind");
      return;
    }

    formAdd.append("image_compiler", e.target.files[0]);
    await axios
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
          res.data.data.length > 0 && imageCompilerFile
            ? (imageCompilerFile.innerText =
                res.data.data[0].image_compiler.filename)
            : (imageCompilerFile.innerText = "Please choose file");
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
