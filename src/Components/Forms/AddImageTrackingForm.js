import React, { useEffect, useState } from "react";
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
const inputPropsImage = {
  accept: "image/*",
};

const AddImageTrackingForm = (props) => {
  const { getData, toggle, item } = props;
  const [file, setFile] = useState([]);
  const [isBinFile, setIsBinFile] = useState(false);
  const [isGLTFFile, setIsGLTFFile] = useState(false);
  const [image, setImage] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [id, setId] = useState("");
  const [idImage, setIdImage] = useState(generateId());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValuesImage,
    resolver: yupResolver(imageValidate),
  });

  useEffect(() => {
    var output = document.getElementById("listing");
    const imageFieldset = document.querySelector(".image fieldset");
    const fileFieldset = document.querySelector(".file fieldset");
    !item && setId(uuidv4());
    !item && setIdImage(generateId());
    if (item) {
      setIsBinFile(true);
      setIsGLTFFile(true);
      reset(item);
      setId(item.id);
      setIdImage(item.idImage);
      setImage(item.image);
      setFile(item.fileList);
      imageFieldset.innerHTML = item.image.filename;
      fileFieldset.innerHTML = item.fileList.length + " files";
      for (const file of item.fileList) {
        let liFile = document.createElement("li");
        liFile.innerHTML = file.filename;
        output.appendChild(liFile);
      }
    }
  }, [item, reset]);

  const onChangeImage = (e) => {
    const imageFieldset = document.querySelector(".image fieldset");
    if (item) {
      imageFieldset.innerHTML = e.target.files[0].name;
    }
    setImage(e.target.files[0]);
    file.length > 0 && isBinFile && isGLTFFile && setIsSubmit(false);
    if (e.target.files.length === 0) {
      setImage([]);
      setIsSubmit(true);
    }
  };

  const onChangeFile = (e) => {
    setIsBinFile(false);
    setIsGLTFFile(false);
    let output = document.getElementById("listing");
    output.innerHTML = "";
    const fileFieldset = document.querySelector(".file fieldset");
    if (item) {
      fileFieldset.innerHTML = e.target.files.length + " files";
    }
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
    for (let i = 0; i < e.target.files.length; i++) {
      e.target.files[i].name.includes(".bin") && setIsBinFile(true);
      e.target.files[i].name.includes(".gltf") && setIsGLTFFile(true);
    }

    setFile(e.target.files);
  };
  const submitFormAdd = (data) => {
    var formAdd = new FormData();
    if (
      data.file.length === 0 ||
      data.image.length === 0 ||
      !isBinFile ||
      !isGLTFFile
    ) {
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

  const submitFormEdit = (data) => {
    console.log("Edit: ", props);
    console.log("Data: ", data);
    if (data.file.length > 0) {
      data.fileList = data.file;
    }
    var formEdit = new FormData();
    if (
      data.fileList.length === 0 ||
      data.image.length === 0 ||
      !isBinFile ||
      !isGLTFFile
    ) {
      return;
    }
    formEdit.append("id", id);
    formEdit.append("name", data.name);
    formEdit.append("index", data.index);
    formEdit.append("scaleX", data.scaleX);
    formEdit.append("scaleY", data.scaleY);
    formEdit.append("scaleZ", data.scaleZ);
    formEdit.append("positionX", data.positionX);
    formEdit.append("positionY", data.positionY);
    formEdit.append("positionZ", data.positionZ);
    formEdit.append("rotationX", data.rotationX);
    formEdit.append("rotationY", data.rotationY);
    formEdit.append("rotationZ", data.rotationZ);
    formEdit.append(
      "image",
      data.image[0] ? data.image[0] : JSON.stringify(data.image)
    );
    for (let i = 0; i < data.fileList.length; i++) {
      formEdit.append(
        "fileList",
        data.file.length > 0
          ? data.fileList[i]
          : JSON.stringify(data.fileList[i])
      );
    }
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}image/files/${data._id}`,
        formEdit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        getData();
        toggle();
        setIsSubmit(false);
      })
      .catch((err) => {
        toast.error(err.message ?? "Error");
      });
  };

  return (
    <form
      className="form-add"
      onSubmit={handleSubmit(item ? submitFormEdit : submitFormAdd)}
    >
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
        className={item ? "fieldset-file image" : "image"}
        onChange={onChangeImage}
        error={isSubmit && !!(image.length === 0)}
        helperText={isSubmit && !!(image.length === 0) && "Vui lòng chọn file"}
        inputProps={inputPropsImage}
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
        className={item ? "fieldset-file file" : "file"}
        onChange={onChangeFile}
        error={isSubmit && (!!(file.length === 0) || !isBinFile || !isGLTFFile)}
        helperText={
          (isSubmit && !!(file.length === 0) && "Vui lòng chọn file") ||
          (isSubmit &&
            (!isBinFile || !isGLTFFile) &&
            "File tải lên không đúng định dạng")
        }
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

export default AddImageTrackingForm;
