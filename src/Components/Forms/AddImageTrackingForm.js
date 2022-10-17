import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { initialValuesImage } from "../initialValue";
import { imageValidate } from "../validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";
import generateId from "../../func/randomHex";

const inputProps = { inputMode: "decimal", step: 0.01 };

const AddFaceTrackingForm = (props) => {
  const { getData, toggle } = props;
  const [file, setFile] = useState([]);
  const [image, setImage] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [id, setId] = useState(uuidv4());
  const [idImage, setIdImage] = useState(generateId());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValuesImage,
    resolver: yupResolver(imageValidate),
  });

  const onChangeImage = (e) => {
    setImage(e.target.files);
    file.length > 0 && setIsSubmit(false);
    if (e.target.files.length === 0) {
      setImage([]);
      setIsSubmit(true);
    }
  };

  const onChangeFile = (e) => {
    let output = document.getElementById("listing");
    for (const file of e.target.files) {
      let item = document.createElement("li");
      item.textContent = file.webkitRelativePath;
      output.appendChild(item);
      image.length > 0 && setIsSubmit(false);
    }
    if (e.target.files.length === 0) {
      output.innerHTML = "";
      setFile([]);
      setIsSubmit(true);
    }

    setFile(e.target.files);
  };
  const submitFormAdd = (data) => {
    var formAdd = new FormData();
    if (data.file.length === 0 || data.image.length === 0) {
      return;
    }
    formAdd.append("id", id);
    formAdd.append("idImage", idImage);
    formAdd.append("name", data.name);
    formAdd.append("scaleX", data.scaleX);
    formAdd.append("scaleY", data.scaleY);
    formAdd.append("scaleZ", data.scaleZ);
    formAdd.append("positionX", data.positionX);
    formAdd.append("positionY", data.positionY);
    formAdd.append("positionZ", data.positionZ);
    formAdd.append("rotationX", data.rotationX);
    formAdd.append("rotationY", data.rotationY);
    formAdd.append("rotationZ", data.rotationZ);
    formAdd.append("image", data.image[0]);
    for (let i = 0; i < data.file.length; i++) {
      formAdd.append("myFiles", data.file[i]);
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}image/files`, formAdd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        getData();
        toggle();
        setIsSubmit(false);
      })
      .catch((err) => toast.error(err.message ?? "Error"));
  };
  return (
    // <Form onSubmit={item ? submitFormEdit : submitFormAdd}>
    <form className="form-add" onSubmit={handleSubmit(submitFormAdd)}>
      <p>Id</p>
      <TextField disabled id="id" value={id} />
      <p>Id Image</p>
      <TextField disabled id="idImage" value={idImage} />
      <br />
      <p>
        Name <span className="required">*</span>
      </p>
      <TextField
        {...register("name")}
        error={!!errors.name}
        helperText={errors?.name?.message}
        type="text"
        id="text"
      />
      <br />
      <p>
        Scale <span className="required">*</span>
      </p>
      <Box className="face-point">
        <TextField
          {...register("scaleX")}
          type="number"
          error={!!errors.scaleX}
          helperText={errors?.scaleX?.message}
          inputProps={inputProps}
          placeholder="Scale X"
        />
        <TextField
          {...register("scaleY")}
          type="number"
          error={!!errors.scaleY}
          helperText={errors?.scaleY?.message}
          inputProps={inputProps}
          placeholder="Scale Y"
        />
        <TextField
          {...register("scaleZ")}
          error={!!errors.scaleZ}
          helperText={errors?.scaleZ?.message}
          type="number"
          inputProps={inputProps}
          placeholder="Scale Z"
        />
      </Box>
      <br />
      <p>
        Position <span className="required">*</span>
      </p>
      <Box className="face-point">
        <TextField
          {...register("positionX")}
          type="number"
          error={!!errors.positionX}
          helperText={errors?.positionX?.message}
          inputProps={inputProps}
          placeholder="Position X"
        />
        <TextField
          {...register("positionY")}
          type="number"
          error={!!errors.positionY}
          helperText={errors?.positionY?.message}
          inputProps={inputProps}
          placeholder="Position Y"
        />
        <TextField
          {...register("positionZ")}
          error={!!errors.positionZ}
          helperText={errors?.positionZ?.message}
          type="number"
          inputProps={inputProps}
          placeholder="Position Z"
        />
      </Box>
      <br />
      <p>
        Rotation <span className="required">*</span>
      </p>
      <Box className="face-point">
        <TextField
          {...register("rotationX")}
          type="number"
          error={!!errors.rotationX}
          helperText={errors?.rotationX?.message}
          inputProps={inputProps}
          placeholder="Rotation X"
        />
        <TextField
          {...register("rotationY")}
          type="number"
          error={!!errors.rotationY}
          helperText={errors?.rotationY?.message}
          inputProps={inputProps}
          placeholder="Rotation Y"
        />
        <TextField
          {...register("rotationZ")}
          error={!!errors.rotationZ}
          helperText={errors?.rotationZ?.message}
          type="number"
          inputProps={inputProps}
          placeholder="Rotation Z"
        />
      </Box>
      <br />
      <p>
        Image <span className="required">*</span>
      </p>
      <TextField
        {...register("image")}
        type="file"
        id="image"
        onChange={onChangeImage}
        error={isSubmit && !!(image.length === 0)}
        helperText={isSubmit && !!(image.length === 0) && "Vui lòng chọn file"}
      />
      <br />
      <p>
        File <span className="required">*</span>
      </p>
      <TextField
        {...register("file")}
        type="file"
        id="file"
        inputProps={{
          multiple: true,
          webkitdirectory: "true",
        }}
        onChange={onChangeFile}
        error={isSubmit && !!(file.length === 0)}
        helperText={isSubmit && !!(file.length === 0) && "Vui lòng chọn file"}
      />
      <ul id="listing"></ul>

      <Button
        variant="contained"
        type="submit"
        className="btn-submit"
        onClick={() => setIsSubmit(true)}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddFaceTrackingForm;
