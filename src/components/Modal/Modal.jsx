import { Component } from 'react';
import propTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  state = {
    url: this.props.url,
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleOverlayClick  = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleOverlayClick }>
        <div className={css.Modal}>
          <img src={this.state.url} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: propTypes.string,
  closeModal: propTypes.func,
}.isRequired;
