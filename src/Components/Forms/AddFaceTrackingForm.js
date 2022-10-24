import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { initialValuesFace } from "../initialValue";
import { faceValidate } from "../validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";

const inputProps = { inputMode: "decimal", step: 0.01 };
const inputPropsAvatar = {
  accept: "image/*",
};

const AddFaceTrackingForm = (props) => {
  const { getData, toggle, item } = props;
  const [file, setFile] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [id, setId] = useState("");
  const [isBinFile, setIsBinFile] = useState(false);
  const [isGLTFFile, setIsGLTFFile] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValuesFace,
    resolver: yupResolver(faceValidate),
  });

  useEffect(() => {
    var output = document.getElementById("listing");
    const avatarFieldset = document.querySelector(".avatar fieldset");
    const fileFieldset = document.querySelector(".file fieldset");
    !item && setId(uuidv4());
    if (item) {
      setIsBinFile(true);
      setIsGLTFFile(true);
      reset(item);
      setId(item.id);
      setAvatar(item.avatar);
      setFile(item.fileList);
      avatarFieldset.innerHTML = item.avatar.filename;
      fileFieldset.innerHTML = item.fileList.length + " files";
      for (const file of item.fileList) {
        let liFile = document.createElement("li");
        liFile.innerHTML = file.filename;
        output.appendChild(liFile);
      }
    }
  }, [item, reset]);

  const onChangeAvatar = (e) => {
    const avatarFieldset = document.querySelector(".avatar fieldset");
    if (item) {
      avatarFieldset.innerHTML = e.target.files[0].name;
    }
    setAvatar(e.target.files[0]);
    file.length > 0 && isBinFile && isGLTFFile && setIsSubmit(false);
    if (e.target.files.length === 0) {
      setAvatar([]);
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
      avatar.length > 0 && setIsSubmit(false);
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
      data.avatar.length === 0 ||
      !isBinFile ||
      !isGLTFFile
    ) {
      return;
    }
    formAdd.append("id", id);
    formAdd.append("name", data.name);
    formAdd.append("index", data.index);
    formAdd.append("scaleX", data.scaleX);
    formAdd.append("scaleY", data.scaleY);
    formAdd.append("scaleZ", data.scaleZ);
    formAdd.append("positionX", data.positionX);
    formAdd.append("positionY", data.positionY);
    formAdd.append("positionZ", data.positionZ);
    formAdd.append("rotationX", data.rotationX);
    formAdd.append("rotationY", data.rotationY);
    formAdd.append("rotationZ", data.rotationZ);
    formAdd.append("avatar", data.avatar[0]);
    for (let i = 0; i < data.file.length; i++) {
      formAdd.append("myFiles", data.file[i]);
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}face/files`, formAdd, {
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
    if (data.file.length > 0) {
      data.fileList = data.file;
    }
    var formEdit = new FormData();
    if (
      data.fileList.length === 0 ||
      data.avatar.length === 0 ||
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
      "avatar",
      data.avatar[0] ? data.avatar[0] : JSON.stringify(data.avatar)
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
        `${process.env.REACT_APP_BASE_URL}face/files/${data._id}`,
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
      <br />
      <p>
        Name <span className="required">*</span>
      </p>
      <TextField
        {...register("name")}
        error={!!errors.name}
        helperText={errors?.name?.message}
        type="text"
      />
      <br />
      <p>
        Anchor Index <span className="required">*</span>
      </p>
      <TextField
        {...register("index")}
        error={!!errors.index}
        helperText={errors?.index?.message}
        type="number"
      />
      <br />
      <p>
        Avatar <span className="required">*</span>
      </p>
      <TextField
        id="avatar"
        className={item ? "fieldset-file avatar" : "avatar"}
        {...register("avatar")}
        type="file"
        onChange={onChangeAvatar}
        error={isSubmit && !!(avatar.length === 0)}
        helperText={isSubmit && !!(avatar.length === 0) && "Vui lòng chọn file"}
        inputProps={inputPropsAvatar}
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
        File <span className="required">*</span>
      </p>
      <TextField
        {...register("file")}
        type="file"
        id="file"
        className={item ? "fieldset-file file" : "file"}
        inputProps={{
          multiple: true,
          webkitdirectory: "true",
        }}
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
        className="btn-submit"
        variant="contained"
        type="submit"
        onClick={() => setIsSubmit(true)}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddFaceTrackingForm;
