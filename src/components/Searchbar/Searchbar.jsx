import React, { Component } from 'react';
import propTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchText: '',
  };
  handleTextChange = evt => {
    this.setState({ searchText: evt.currentTarget.value.toLowerCase() });
  };
  onSubmit = e => {
    e.preventDefault();

    if (this.state.searchText.trim() === '') {
      alert('Please enter a search value');
      return;
    }
    this.props.onSubmit(this.state.searchText);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <button type="submit" className={css.SearchFormButton} onClick={this.onSubmit}>
          🔍
        </button>
        <form className={css.SearchbarForm} onSubmit={this.onSubmit}>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchText}
            onChange={this.handleTextChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
