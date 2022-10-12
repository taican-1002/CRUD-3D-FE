import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";
import { Container, Stack, Pagination, Tab } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import ModalForm from "./Components/Modals/Modal";
import DataTable from "./Components/Tables/DataTable";
import ImageTargetsCompiler from "./Components/Modals/ImageTargetsCompiler";
// import { CSVLink } from "react-csv";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [faces, setFaces] = useState([]);
  const [images, setImages] = useState([]);
  const [filterFace, setFilterFace] = useState({
    page: 1,
    totalPages: 1,
  });
  const [filterImage, setFilterImage] = useState({
    page: 1,
    totalPages: 1,
  });
  const [active, setActive] = useState(false);
  const [tabValue, setTabValue] = useState("1");

  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
  };

  const getFaceData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}face/files/${filterFace.page}`)
      .then((res) => {
        setFaces(res.data.data);
        setFilterFace({
          page: res.data.current,
          totalPages: res.data.pages,
        });
      })
      .catch((err) => console.log(err));
  }, [filterFace.page]);

  const getImageData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}image/files/${filterImage.page}`)
      .then((res) => {
        setImages(res.data.data);
        setFilterFace({
          page: res.data.current,
          totalPages: res.data.pages,
        });
      })
      .catch((err) => console.log(err));
  }, [filterImage.page]);

  const handleChangePageFace = (e, page) => {
    setFilterFace({ ...filterFace, page: page });
  };
  const handleChangePageImage = (e, page) => {
    setFilterImage({ ...filterImage, page: page });
  };

  useEffect(() => {
    getFaceData();
  }, [filterFace.page, filterFace.totalPages, getFaceData]);
  useEffect(() => {
    getImageData();
  }, [filterImage.page, filterImage.totalPages, getImageData]);

  return (
    <Container className="App" maxWidth="xl">
      <ToastContainer />

      <Row>
        <Col sm="6">
          <h1 style={{ margin: "20px 0" }}>CRUD MODEL</h1>
        </Col>
        <Col sm="6" style={{ margin: "auto" }}>
          {/* <CSVLink
            filename={"db.csv"}
            color="primary"
            style={{ float: "left", marginRight: "10px" }}
            className="btn btn-primary"
            data={items}
          >
            Download CSV
          </CSVLink> */}
          <ModalForm
            buttonLabel="Add Item"
            getFaceData={getFaceData}
            getImageData={getImageData}
            active={active}
          />
        </Col>
      </Row>
      <TabContext value={tabValue}>
        <TabList onChange={handleChangeTabs}>
          <Tab
            className={!active ? "active" : ""}
            onClick={() => setActive(false)}
            label="Face Tracking"
            value="1"
          />

          <Tab
            className={active ? "active" : ""}
            onClick={() => setActive(true)}
            label="Image Tracking"
            value="2"
          />
        </TabList>
        <TabPanel value="1">
          <Row>
            <Col>
              <DataTable active={active} items={faces} getData={getFaceData} />
            </Col>
            <Stack spacing={2}>
              <Pagination
                count={filterFace.totalPages}
                page={filterFace.page}
                onChange={handleChangePageFace}
                boundaryCount={2}
              />
            </Stack>
          </Row>
        </TabPanel>
        <TabPanel value="2">
          <ImageTargetsCompiler />
          <Row>
            <Col>
              <DataTable
                active={active}
                items={images}
                getData={getImageData}
              />
              <Stack spacing={2}>
                <Pagination
                  count={filterImage.totalPages}
                  page={filterImage.page}
                  onChange={handleChangePageImage}
                  boundaryCount={2}
                />
              </Stack>
            </Col>
          </Row>
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default App;
