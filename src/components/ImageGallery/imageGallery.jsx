import css from "./ImageGallery.module.css"

export const ImageGallery = ({ children, addBigPhoto }) => {

    return <ul className={css.ImageGallery} onClick={({target}) => addBigPhoto(target.dataset.action)}>{children}</ul>

}