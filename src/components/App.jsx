import css from './App.module.css';
import { Component } from 'react';
import { Loader } from './Loader/Loader';

import { getImages } from './getImages';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchParameters: '',
    images: [],
    totalImages: '',
    page: 1,
    requestStatus: '',
    error: '',
    bigImgUrl: '',
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.searchParameters !== this.state.searchParameters ||
      prevState.page !== this.state.page
    ) {

      this.setState({requestStatus: "loading"})
      getImages(this.state)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
        .then(data => {
          console.log(data);

          if (prevState.searchParameters !== this.state.searchParameters) {
            this.setState({
              images: [...data.hits],
              totalImages: data.totalHits,
              requestStatus: 'ok',
            });
          } else {
            this.setState((prevState) => {
              return {
                images: [...prevState.images, ...data.hits],
                totalImages: data.totalHits,
                requestStatus: 'ok',
              }
            });
          }
        })
        .catch(error => {
          this.setState({
            error,
          });
        });
    }
  }

  submitForm = parameters => {
    this.setState({ searchParameters: parameters, page: 1, error: '' });
  };

  decrementPage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  addBigImg = bigImgUrl => {
    this.setState({ bigImgUrl });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar submitForm={this.submitForm} />

        <ImageGallery addBigImg={this.addBigImg} images={this.state.images}/>

        {this.state.requestStatus === 'loading' && <Loader />}

        {this.state.requestStatus === 'ok' &&
          Number(this.state.totalImages) / 12 >= this.state.page && (
            <Button decrementPage={this.decrementPage} />
          )}

        {this.state.bigImgUrl !== '' && (
          <Modal url={this.state.bigImgUrl} addBigImg={this.addBigImg} />
        )}
      </div>
    );
  }
}
