import css from "./App.module.css"
import { Component } from "react";
import { Loader } from "./Loader/Loader";

import { getPhotos } from "./getPhotos";

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/imageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Button } from "./Button/Button";
import {Modal} from "./Modal/Modal"

export class App extends Component {

  state = {
    searchParameters: "",
    photos: [],
    totalPhotos: "",
    page: 1,
    requestStatus: "",
    error: "",
    bigPhotoUrl: ""
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.searchParameters !== this.state.searchParameters || (prevState.page !== this.state.page)) {
      this.setState({ requestStatus: "loading" })
      if (prevState.searchParameters !== this.state.searchParameters && this.state.page !== 1) {
        this.setState({page: 1})
      } else if (prevState.searchParameters !== this.state.searchParameters && this.state.page === 1) {
        getPhotos(this.state)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.status);
          }
        })
        .then(data => {
          console.log(data)
            
          this.setState({ photos: [...data.hits ], totalPhotos: data.totalHits, requestStatus: "ok" })
        })
        .catch(error => {
          this.setState({
            error
          })
        })
      } else if (prevState.page !== this.state.page && this.state.page !== 1) {
      getPhotos(this.state)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.status);
          }
        })
        .then(data => {
          console.log(data)
            this.setState(({ photos }) => { return { photos: [...photos, ...data.hits], requestStatus: "ok" } })
          
        })
        .catch(error => {
          this.setState({
            error
          })
        })
      } else {
             getPhotos(this.state)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.status);
          }
        })
        .then(data => {
          console.log(data)


          this.setState({ photos: [...data.hits], totalPhotos: data.totalHits, requestStatus: "ok" })
        })
        .catch(error => {
          this.setState({
            error
          })
        })
      }
 
    }
  }

  submitForm = (parameters) => {
    console.log(parameters)
    this.setState({ searchParameters: parameters})
  }

  addNextPage = () => {
    this.setState(prevState => {return {page: prevState.page + 1}})
  }

  addBigPhoto = (bigPhotoUrl) => {
    this.setState({bigPhotoUrl})
  }

  render() {
    return (
      <div className={css.App}>

        <Searchbar submitForm={this.submitForm} />

        <ImageGallery addBigPhoto={this.addBigPhoto}>
          <ImageGalleryItem photos={this.state.photos} />
        </ImageGallery>

        {this.state.requestStatus === "loading" && (<Loader />)}

        {this.state.requestStatus === "ok" && Number(this.state.totalPhotos) / 12 >= this.state.page && (<Button addNextPage={this.addNextPage} />)}
        
        {this.state.bigPhotoUrl !== "" && (<Modal url={this.state.bigPhotoUrl} addBigPhoto={this.addBigPhoto} />)}
        
      </div>
    );
  }
};
