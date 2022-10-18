import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { initialValuesVideo } from "../initialValue";
import { videoValidate } from "../validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

const AddVideoTrackingForm = (props) => {
  const { getData, toggle } = props;
  const [video, setVideo] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [id, setId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValuesVideo,
    resolver: yupResolver(videoValidate),
  });

  useEffect(() => {
    setId(uuidv4());
  }, []);

  const onChangeVideo = (e) => {
    setVideo(e.target.files);
    if (e.target.files.length === 0) {
      setVideo([]);
    }
  };

  const submitFormAdd = (data) => {
    var formAdd = new FormData();
    if (data.video.length === 0) {
      return;
    }
    formAdd.append("id", id);
    formAdd.append("name", data.name);
    formAdd.append("video", data.video[0]);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}video/files`, formAdd, {
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
        Video <span className="required">*</span>
      </p>
      <TextField
        {...register("video")}
        type="file"
        id="video"
        onChange={onChangeVideo}
        error={isSubmit && !!(video.length === 0)}
        helperText={isSubmit && !!(video.length === 0) && "Vui lòng chọn file"}
      />

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

export default AddVideoTrackingForm;
