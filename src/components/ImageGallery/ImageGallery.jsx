import React from 'react';
import propTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ imageName, onClick }) => (
  <ul className={css.ImageGallery}>
    {imageName.map(images => (
      <ImageGalleryItem key={images.id} images={images} onClick={onClick} />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: propTypes.arrayOf({
    id: propTypes.number,
  }).isRequired,
  imageName: propTypes.array.isRequired,
  onClick: propTypes.func.isRequired,
};
