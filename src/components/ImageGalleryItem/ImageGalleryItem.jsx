import css from './ImageGalleryItem.module.css';


export const ImageGalleryItem = ({ src, action, name}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src={src} alt={name} data-action={action} />
    </li>
  );
};
