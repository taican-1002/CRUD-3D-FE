import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";
import { Container, Stack, Pagination, Tab } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import ModalForm from "./Components/Modals/Modal";
import DataTable from "./Components/Tables/DataTable";
import ImageTargetsCompiler from "./Components/Modals/ImageTargetsCompiler";
import VideoTargetsCompiler from "./Components/Modals/VideoTargetsCompiler";
// import { CSVLink } from "react-csv";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [faces, setFaces] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [filterFace, setFilterFace] = useState({
    page: 1,
    totalPages: 1,
  });

  const [filterImage, setFilterImage] = useState({
    page: 1,
    totalPages: 1,
  });

  const [filterVideo, setFilterVideo] = useState({
    page: 1,
    totalPages: 1,
  });
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
        setFilterImage({
          page: res.data.current,
          totalPages: res.data.pages,
        });
      })
      .catch((err) => console.log(err));
  }, [filterImage.page]);

  const getVideoData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}video/files/${filterVideo.page}`)
      .then((res) => {
        setVideos(res.data.data);
        setFilterVideo({
          page: res.data.current,
          totalPages: res.data.pages,
        });
      })
      .catch((err) => console.log(err));
  }, [filterVideo.page]);

  const handleChangePageFace = (e, page) => {
    setFilterFace({ ...filterFace, page: page });
  };
  const handleChangePageImage = (e, page) => {
    setFilterImage({ ...filterImage, page: page });
  };
  const handleChangePageVideo = (e, page) => {
    setFilterVideo({ ...filterVideo, page: page });
  };

  useEffect(() => {
    getFaceData();
  }, [filterFace.page, filterFace.totalPages, getFaceData]);
  useEffect(() => {
    getImageData();
  }, [filterImage.page, filterImage.totalPages, getImageData]);
  useEffect(() => {
    getVideoData();
  }, [filterVideo.page, filterVideo.totalPages, getVideoData]);

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
            getVideoData={getVideoData}
            tabValue={tabValue}
          />
        </Col>
      </Row>
      <TabContext value={tabValue}>
        <TabList onChange={handleChangeTabs}>
          <Tab label="Face Tracking" value="1" />
          <Tab label="Image Tracking" value="2" />
          <Tab label="Video Tracking" value="3" />
        </TabList>
        <TabPanel value={tabValue}>
          <Row>
            <Col>
              {tabValue === "1" ? (
                ""
              ) : tabValue === "2" ? (
                <ImageTargetsCompiler />
              ) : (
                <VideoTargetsCompiler />
              )}
              <DataTable
                getData={
                  tabValue === "1"
                    ? getFaceData
                    : tabValue === "2"
                    ? getImageData
                    : getVideoData
                }
                tabValue={tabValue}
                items={
                  tabValue === "1" ? faces : tabValue === "2" ? images : videos
                }
              />
            </Col>
            <Stack spacing={2}>
              <Pagination
                count={
                  tabValue === "1"
                    ? filterFace.totalPages
                    : tabValue === "2"
                    ? filterImage.totalPages
                    : filterVideo.totalPages
                }
                page={
                  tabValue === "1"
                    ? filterFace.page
                    : tabValue === "2"
                    ? filterImage.page
                    : filterVideo.page
                }
                onChange={
                  tabValue === "1"
                    ? handleChangePageFace
                    : tabValue === "2"
                    ? handleChangePageImage
                    : handleChangePageVideo
                }
                boundaryCount={2}
              />
            </Stack>
          </Row>
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default App;
