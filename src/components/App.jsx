import React, { Component } from 'react';
import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button }  from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';



export class App extends Component {
  state = {
    page: 1,
    images: [],
    imageName: '',
    largeImageURL: '',
    searchTotal: null,
    loading: false,
    error: null,
  };

  handlerFormSubmit = imageName => {
    if (imageName !== this.state.imageName) {
      this.setState({ imageName, page: 1 });
      this.setState({ images: [] });
      return;
    }
    if (imageName === this.state.imageName) {
      alert('There is the same name');
    }
    else {
      alert('There is no images with this name');
    }
  };

  hendlerLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpen = url => {
    this.setState({
      largeImageURL: url,
    });
  };

  handleClose = () => {
    this.setState({
      largeImageURL: '',
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const prevPage = prevState.page;
    const { imageName, page } = this.state;
    const PER_PAGE = 12;
    const key = 'key=35040832-5e7ee7e93ffcaf004ab10bdd7';

    if (imageName !== prevName) {
      this.setState({ images: [] });
    }
    if (prevName !== imageName || prevPage !== page) {
      this.setState({ loading: true });

      fetch(
        `https://pixabay.com/api/?q=${imageName}&page=${page}&${key}&image_type=images&orientation=horizontal&per_page=${PER_PAGE}`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error());
        })
        .then(images =>
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            searchTotal: images.total,
          }))
        )
        .catch(error => this.setState({ error }))
        .finally(this.setState({ loading: false }));
    }
  }

  render() {
    const { page, images, largeImageURL, searchTotal, loading } =
      this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handlerFormSubmit} page={page} />

        {images && (
          <ImageGallery imageName={images} onClick={this.handleOpen} />
        )}

        {largeImageURL && (
          <Modal closeModal={this.handleClose} url={largeImageURL} />
        )}
        {loading && <Loader />}
        {!loading && searchTotal > 12 && (
          <Button onClick={this.hendlerLoadMoreClick} />
        )}
      </div>
    );
  }
}
