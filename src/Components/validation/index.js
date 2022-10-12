import * as yup from "yup";

const faceValidate = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  index: yup
    .number()
    .typeError("Anchor Index phải là 1 số")
    .required("Vui lòng nhập Anchor Index"),
  scaleX: yup
    .number()
    .typeError("scaleX phải là 1 số")
    .required("Vui lòng nhập scaleX"),
  scaleY: yup
    .number()
    .typeError("scaleY phải là 1 số")
    .required("Vui lòng nhập scaleY"),
  scaleZ: yup
    .number()
    .typeError("scaleZ phải là 1 số")
    .required("Vui lòng nhập scaleZ"),
  positionX: yup
    .number()
    .typeError("positionX phải là 1 số")
    .required("Vui lòng nhập positionX"),
  positionY: yup
    .number()
    .typeError("positionY phải là 1 số")
    .required("Vui lòng nhập positionY"),
  positionZ: yup
    .number()
    .typeError("positionZ phải là 1 số")
    .required("Vui lòng nhập positionZ"),
  rotationX: yup
    .number()
    .typeError("scaleX phải là 1 số")
    .required("Vui lòng nhập rotationX"),
  rotationY: yup
    .number()
    .typeError("scaleY phải là 1 số")
    .required("Vui lòng nhập rotationY"),
  rotationZ: yup
    .number()
    .typeError("scaleZ phải là 1 số")
    .required("Vui lòng nhập rotationZ"),
  // avatar: yup
  //   .array()
  //   .max(1, "Chỉ có thể tải lên tối đa 1 file")
  //   .required()
  //   .test((value) => console.log(value)),
  // file: yup.string().test((value) => console.log(value.length)),
  // .required("Vui lòng chọn file")
});

const imageValidate = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  scaleX: yup
    .number()
    .typeError("scaleX phải là 1 số")
    .required("Vui lòng nhập scaleX"),
  scaleY: yup
    .number()
    .typeError("scaleY phải là 1 số")
    .required("Vui lòng nhập scaleY"),
  scaleZ: yup
    .number()
    .typeError("scaleZ phải là 1 số")
    .required("Vui lòng nhập scaleZ"),
  positionX: yup
    .number()
    .typeError("positionX phải là 1 số")
    .required("Vui lòng nhập positionX"),
  positionY: yup
    .number()
    .typeError("positionY phải là 1 số")
    .required("Vui lòng nhập positionY"),
  positionZ: yup
    .number()
    .typeError("positionZ phải là 1 số")
    .required("Vui lòng nhập positionZ"),
  rotationX: yup
    .number()
    .typeError("scaleX phải là 1 số")
    .required("Vui lòng nhập rotationX"),
  rotationY: yup
    .number()
    .typeError("scaleY phải là 1 số")
    .required("Vui lòng nhập rotationY"),
  rotationZ: yup
    .number()
    .typeError("scaleZ phải là 1 số")
    .required("Vui lòng nhập rotationZ"),
  // avatar: yup
  //   .array()
  //   .max(1, "Chỉ có thể tải lên tối đa 1 file")
  //   .required()
  //   .test((value) => console.log(value)),
  // file: yup.string().test((value) => console.log(value.length)),
  // .required("Vui lòng chọn file")
});

export { faceValidate, imageValidate };
