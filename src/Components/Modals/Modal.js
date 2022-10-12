import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import AddFaceTrackingForm from "../Forms/AddFaceTrackingForm";
import AddImageTrackingForm from "../Forms/AddImageTrackingForm";
import { Close } from "@mui/icons-material";

const ModalForm = (props) => {
  const {
    buttonLabel,
    getFaceData,
    getImageData,
    className,
    item,
    updateState,
    active,
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  // if (buttonLabel === "Edit") {
  //   button = (
  //     <Button
  //       color="warning"
  //       onClick={toggle}
  //       style={{ float: "left", marginRight: "10px" }}
  //     >
  //       {buttonLabel}
  //     </Button>
  //   );
  //   title = "Edit Item";
  // } else {
  //   button = (
  //     <Button
  //       color="success"
  //       onClick={toggle}
  //       style={{ float: "left", marginRight: "10px" }}
  //     >
  //       {buttonLabel}
  //     </Button>
  //   );
  //   title = "Add New Item";
  // }

  return (
    <div>
      {/* {button} */}
      <Button
        color="success"
        variant="contained"
        onClick={toggle}
        sx={{ margin: " 0 0 20px" }}
      >
        {buttonLabel}
      </Button>
      <Dialog
        open={modal}
        onClose={toggle}
        className={className}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Add New Item
          <Close onClick={toggle} className="close-icon" />
        </DialogTitle>
        <DialogContent>
          {!active ? (
            <AddFaceTrackingForm
              getData={getFaceData}
              updateState={updateState}
              toggle={toggle}
              item={item}
            />
          ) : (
            <AddImageTrackingForm
              getData={getImageData}
              updateState={updateState}
              toggle={toggle}
              item={item}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalForm;
