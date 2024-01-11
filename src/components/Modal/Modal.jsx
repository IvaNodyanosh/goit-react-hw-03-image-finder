import css from './Modal.module.css';
import { Component } from 'react';

const body = document.querySelector('body');

export class Modal extends Component {

  clickEsc = event => {
    if (event.code === 'Escape') {
      this.props.addBigImg('');
      console.log(event);
    }
  };

  componentDidMount() {
    body.addEventListener('keydown', this.clickEsc);

    body.style.position = 'fixed';
    body.style.top = '0';
    body.style.bottom = '0';
    body.style.left = '0';
    body.style.right = '0';
  }

  componentWillUnmount() {
    body.removeEventListener('keydown', this.clickEsc);

    body.style.position = 'static';
  }

  render() {
    return (
      <div
        className={css.Modal__backdrop}
        onClick={() => this.props.addBigImg('')}
      >
        <img
          src={this.props.url}
          alt=""
          width="600px"
          onClick={e => e.stopPropagation()}
        />
      </div>
    );
  }
}
