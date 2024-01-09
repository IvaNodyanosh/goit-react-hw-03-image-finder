import css from "./ImageGalleryItem.module.css";
import { nanoid } from 'nanoid'

export const ImageGalleryItem = ({ photos }) => {
    return <>{photos.map(({webformatURL, largeImageURL}) => {
        return (<li className={css.ImageGalleryItem} key={nanoid()}>
            <img src={webformatURL} alt="" data-action={largeImageURL} />
        </li>)
    })}</>
}