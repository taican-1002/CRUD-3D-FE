import React from "react";
import {
  Table,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
// import ModalForm from "../Modals/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const DataTable = (props) => {
  const { active, items, getData } = props;
  const deleteItem = (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      axios
        .delete(
          process.env.REACT_APP_BASE_URL +
            `${!active ? "face/files/" : "image/files/"}` +
            id
        )
        .then((res) => {
          toast.success(res.data.message);
          getData();
        })
        .catch((err) => toast.error(err.message ?? "Error"));
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>NAME</TableCell>
          {!active ? (
            <TableCell>AVATAR</TableCell>
          ) : (
            <TableCell>IMAGE</TableCell>
          )}
          <TableCell>SCALE</TableCell>
          <TableCell>POSITION</TableCell>
          <TableCell>ROTATION</TableCell>
          <TableCell>IMAGE</TableCell>
          <TableCell>ACTIONS</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items &&
          items.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {++index}
                {/* {{ (page - 1) * 10 + index + 1 }} */}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              {!active ? (
                <TableCell>
                  <img
                    alt={item.avatar.filename}
                    className="face_avatar"
                    src={
                      item?.avatar
                        ? process.env.REACT_APP_BASE_URL +
                          item?.avatar?.path.slice(4, item?.avatar?.path.length)
                        : ""
                    }
                  />
                </TableCell>
              ) : (
                <TableCell>
                  <img
                    alt={item.image.filename}
                    className="image_target"
                    src={
                      item?.image
                        ? process.env.REACT_APP_BASE_URL +
                          item?.image?.path.slice(4, item?.image?.path.length)
                        : ""
                    }
                  />
                </TableCell>
              )}
              <TableCell>
                <ul>
                  <li>Scale X: {item.scaleX}</li>
                  <li>Scale Y: {item.scaleY}</li>
                  <li>Scale Z: {item.scaleZ}</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul>
                  <li>Position X: {item.positionX}</li>
                  <li>Position Y: {item.positionY}</li>
                  <li>Position Z: {item.positionZ}</li>
                </ul>
              </TableCell>
              <TableCell>
                <ul>
                  <li>Rotation X: {item.rotationX}</li>
                  <li>Rotation Y: {item.rotationY}</li>
                  <li>Rotation Z: {item.rotationZ}</li>
                </ul>
              </TableCell>
              <TableCell>
                <model-viewer
                  src={
                    `${process.env.REACT_APP_BASE_URL}uploads/` +
                    item.id +
                    "/" +
                    item.fileList.filter((item) =>
                      item.filename.includes("gltf")
                    )[0].filename
                  }
                  camera-controls
                  touch-action="pan-y"
                  alt="A 3D model of a sphere"
                ></model-viewer>
              </TableCell>
              <TableCell>
                {/* {" "}
                  <ModalForm
                    buttonLabel="Edit"
                    item={item}
                    updateState={updateState}
                  />{" "} */}
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => deleteItem(item.id)}
                >
                  Del
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
