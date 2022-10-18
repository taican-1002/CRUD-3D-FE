import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const VideoTargetsCompiler = () => {
  const [videoCompiler, setVideoCompiler] = useState("");
  const handleChangeVideoTargetsCompiler = (e) => {
    const videoCompilerFile2 = document.querySelector("fieldset");
    setVideoCompiler(e.target.files);

    var formAdd = new FormData();
    if (e.target.files.length === 0) {
      videoCompilerFile2.innerText = videoCompiler[0].name;
      return;
    }
    formAdd.append("video_compiler", e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}videoTargets/files`, formAdd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        videoCompilerFile2.innerText = e.target.files[0].name;
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.message ?? "Error"));
  };

  useEffect(() => {
    const videoCompilerFile = document.querySelector("fieldset");
    const getVideoCompiler = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}videoTargets/files`)
        .then((res) => {
          res.data.data.length > 0 && videoCompilerFile
            ? (videoCompilerFile.innerText =
                res.data.data[0].video_compiler.filename)
            : (videoCompilerFile.innerText = "Please choose file");
        })
        .catch((err) => console.log(err));
    };
    getVideoCompiler();
  }, []);

  return (
    <Box className="video-compiler">
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
        onChange={handleChangeVideoTargetsCompiler}
        id="image_file"
      />
    </Box>
  );
};

export default VideoTargetsCompiler;
