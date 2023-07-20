import React, { useState, useEffect } from 'react';
import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button }  from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';




export const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [searchTotal, setSearchTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const PER_PAGE = 12;
  const key = 'key=35040832-5e7ee7e93ffcaf004ab10bdd7';

  const handlerFormSubmit = newImageName => {
    if (imageName !== newImageName) {
      setImageName(newImageName);
      setPage(1);
      setImages([]);
    }
    if (imageName === newImageName) {
      alert('There is the same name');
    }
  };

  const hendlerLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  const handleOpen = url => {
    setLargeImageURL(url)
  };

  const handleClose = () => {
    setLargeImageURL('');
  };

 useEffect(() => {
   if (imageName === '') {
     return;
   }
   setLoading(true);
   const fetchPhotos = () => {
     if (!imageName) {
       return;
     }
     return fetch(
       `https://pixabay.com/api/?q=${imageName}&page=${page}&${key}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
     )
       .then(res => {
         if (res.ok) {
           return res.json();
         }
         return Promise.reject(new Error());
       })
       .then(images => {
         if (!images.total) {
           alert('There is no images with this name');
         }
         return images;
       })
       .catch(error => setError(error))
       .finally(() => setLoading(false));
   };

   fetchPhotos().then(images => {
     setImages(prevImages => [...prevImages, ...images.hits]);
     setSearchTotal(images.total);
   });
 }, [imageName, page, error]);

    return (
      <div className={css.app}>
        <Searchbar onSubmit={handlerFormSubmit} page={page} />

        {images && (
          <ImageGallery imageName={images} onClick={handleOpen} />
        )}

        {largeImageURL && (
          <Modal closeModal={handleClose} url={largeImageURL} />
        )}
        {loading && <Loader />}
        {!loading && searchTotal > 12 && (
          <Button onClick={hendlerLoadMoreClick} />
        )}
      </div>
    );
  }
