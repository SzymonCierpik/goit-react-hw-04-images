import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import getPicturesData from "../API/getData";
import styles from "./App.module.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [picturesData, setPicturesData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [clickedImg, setClickedImg] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleSubmit = (inputQuery) => {
    setInputValue(inputQuery);
    setPage(1);
  };

  const loaderClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (url) => {
    setIsModal(true);
    setClickedImg(url);
  };

  const onModalClose = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (inputValue !== "") {
      setPicturesData([]);
    }
  }, [inputValue]);

  useEffect(() => {
    setLoading(false);

    getPicturesData(inputValue, page)
      .then((response) => {
        if (response.data.hits.length === 0) {
          toast.error(
            "Przepraszamy, ale nie ma obrazów pasujących do Twojego zapytania.",
            { theme: "light" }
          );
        } else {
          setPicturesData((prevData) => [...prevData, ...response.data.hits]);
          setTotalPages(
            Math.ceil(response.data.totalHits / response.data.hits.length)
          );

          if (page === 1 && !isFirstLoad) {
            toast.info(
              `Zostało znalezione ${response.data.totalHits} plików graficznych.`,
              { theme: "light" }
            );
          }
        }
      })
      .catch((error) => {
        toast.error(error.message, { theme: "light" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [inputValue, page]);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  return (
    <div className={styles.container}>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}

      {picturesData.length !== 0 &&
        inputValue !== "" &&
        page !== totalPages && (
          <ImageGallery data={picturesData} onClickImg={handleImageClick} />
        )}
      {picturesData.length !== 0 &&
        inputValue !== "" &&
        page !== totalPages && <Button onClick={loaderClick} />}
      <ToastContainer autoClose={1500} />
      {isModal && <Modal onModalClose={onModalClose}>{clickedImg}</Modal>}
    </div>
  );
};

export default App;
