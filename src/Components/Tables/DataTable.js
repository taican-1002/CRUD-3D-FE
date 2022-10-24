import React, { useEffect, useRef } from "react";
import {
  Table,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ModalForm from "../Modals/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const DataTable = (props) => {
  const { tabValue, items, getData } = props;
  const videoRef = useRef(null);
  useEffect(() => {
    videoRef.current?.load();
  }, [items]);

  console.log(items);
  let URL = "";
  let TABLECELL = "";
  switch (tabValue) {
    case "1":
      URL = "face/files/";
      TABLECELL = "AVATAR";
      break;
    case "2":
      URL = "image/files/";
      TABLECELL = "IMAGE";
      break;
    case "3":
      URL = "video/files/";
      TABLECELL = "VIDEO";
      break;
    default:
      break;
  }
  const deleteItem = (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      axios
        .delete(process.env.REACT_APP_BASE_URL + URL + id)
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
          <TableCell>{TABLECELL}</TableCell>
          {tabValue !== "3" && (
            <>
              <TableCell>SCALE</TableCell>
              <TableCell>POSITION</TableCell>
              <TableCell>ROTATION</TableCell>
              <TableCell>IMAGE 3D</TableCell>
            </>
          )}
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
              <TableCell>
                {tabValue === "1" ? (
                  <img
                    alt={item?.avatar?.filename}
                    className="face_avatar"
                    src={
                      item?.avatar
                        ? process.env.REACT_APP_BASE_URL +
                          item?.avatar?.path.slice(4, item?.avatar?.path.length)
                        : ""
                    }
                  />
                ) : tabValue === "2" ? (
                  <img
                    alt={item?.image?.filename}
                    className="image_target"
                    src={
                      item?.image
                        ? process.env.REACT_APP_BASE_URL +
                          item?.image?.path.slice(4, item?.image?.path.length)
                        : ""
                    }
                  />
                ) : (
                  <video width="400" controls ref={videoRef}>
                    <source
                      src={
                        process.env.REACT_APP_BASE_URL +
                        item.video.path.slice(4, item.video.path.length)
                      }
                      type="video/mp4"
                    />
                  </video>
                )}
              </TableCell>
              {tabValue !== "3" && (
                <>
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
                </>
              )}
              <TableCell className="btn-action">
                <ModalForm
                  buttonLabel="Edit"
                  getData={getData}
                  item={item}
                  tabValue={tabValue}
                />
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
