import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import AddFaceTrackingForm from "../Forms/AddFaceTrackingForm";
import AddImageTrackingForm from "../Forms/AddImageTrackingForm";
import AddVideoTrackingForm from "../Forms/AddVideoTrackingForm";
import { Close } from "@mui/icons-material";

const ModalForm = (props) => {
  const { buttonLabel, getData, className, item, tabValue } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  var button;
  var title;

  if (buttonLabel === "Edit") {
    button = (
      <Button
        color="warning"
        variant="contained"
        onClick={toggle}
        sx={{ margin: " 0 0 20px" }}
      >
        {buttonLabel}
      </Button>
    );
    title = "Edit Item";
  } else {
    button = (
      <Button
        color="success"
        variant="contained"
        onClick={toggle}
        sx={{ margin: " 0 0 20px" }}
      >
        {buttonLabel}
      </Button>
    );
    title = "Add New Item";
  }

  return (
    <div>
      {button}
      <Dialog
        open={modal}
        onClose={toggle}
        className={className}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {title}
          <Close onClick={toggle} className="close-icon" />
        </DialogTitle>
        <DialogContent>
          {tabValue === "1" ? (
            <AddFaceTrackingForm
              getData={getData}
              toggle={toggle}
              item={item}
            />
          ) : tabValue === "2" ? (
            <AddImageTrackingForm
              getData={getData}
              toggle={toggle}
              item={item}
            />
          ) : (
            <AddVideoTrackingForm
              getData={getData}
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
