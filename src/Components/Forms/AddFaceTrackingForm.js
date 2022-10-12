import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { initialValuesFace } from "../initialValue";
import { faceValidate } from "../validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box } from "@mui/material";

const inputProps = { inputMode: "decimal", step: 0.01 };

const AddFaceTrackingForm = (props) => {
  const { getData, toggle } = props;
  const [file, setFile] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [id, setId] = useState(uuidv4());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValuesFace,
    resolver: yupResolver(faceValidate),
  });

  const onChangeAvatar = (e) => {
    setAvatar(e.target.files);
    file.length > 0 && setIsSubmit(false);
    if (e.target.files.length === 0) {
      setAvatar([]);
      setIsSubmit(true);
    }
  };

  const onChangeFile = (e) => {
    let output = document.getElementById("listing");
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

    // for (let i = 0; i < e.target.files.length; i++) {
    //   if (
    //     e.target.files[i].name.includes(".bin") ||
    //     e.target.files[i].name.includes(".gltf")
    //   ) {
    //     setIsCorrectFormat(true);
    //   } else {
    //     setIsCorrectFormat(false);
    //   }
    // }
    setFile(e.target.files);
  };
  // console.log("isCorrectFormat: ", isCorrectFormat);
  const submitFormAdd = (data) => {
    console.log("Data: ", data);
    var formAdd = new FormData();
    if (data.file.length === 0 || data.avatar.length === 0) {
      return;
    }
    formAdd.append("id", uuidv4());
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
  // const submitFormEdit = (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:3000/crud", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       // id: state.id,
  //       // first: state.first,
  //       // last: state.last,
  //       // email: state.email,
  //       // phone: state.phone,
  //       // location: state.location,
  //       // hobby: state.hobby,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((item) => {
  //       // if (Array.isArray(item)) {
  //       //   // console.log(item[0])
  //       //   updateState(item[0]);
  //       //   toggle();
  //       // } else {
  //       //   console.log("failure");
  //       // }
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    // <Form onSubmit={item ? submitFormEdit : submitFormAdd}>
    <form className="form-add" onSubmit={handleSubmit(submitFormAdd)}>
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
        {...register("avatar")}
        type="file"
        onChange={onChangeAvatar}
        error={isSubmit && !!(avatar.length === 0)}
        helperText={isSubmit && !!(avatar.length === 0) && "Vui lòng chọn file"}
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
