import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ data, onClickImg }) => {
  const handleClick = () => {
    onClickImg(data.largeImageURL);
  };

  return (
    <li className={styles.galleryItem} onClick={handleClick}>
      <img
        className={styles.image}
        src={data.webformatURL}
        alt={data.id}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
