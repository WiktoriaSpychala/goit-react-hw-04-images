import React from 'react';
import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  images: { webformatURL, tags, largeImageURL },
  onClick,
}) => (
  <li className={css.ImageGalleryItem}>
    <img
      className={css.ImageGalleryItemImage}
      src={webformatURL}
      alt={tags}
      onClick={() => onClick(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  images: propTypes.shape({
    webformatURL: propTypes.string,
    tags: propTypes.string,
    largeImageURL: propTypes.string,
  }).isRequired,
  onClick: propTypes.func.isRequired,
};
