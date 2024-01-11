import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ addBigImg, images }) => {
  return (
    <ul
      className={css.ImageGallery}
      onClick={({ target }) => addBigImg(target.dataset.action)}
    >
      {images.map(({ webformatURL, largeImageURL, tags, id }) => (
        <ImageGalleryItem
          src={webformatURL}
          action={largeImageURL}
          name={tags}
          key={nanoid()}
        />
      ))}
    </ul>
  );
};
