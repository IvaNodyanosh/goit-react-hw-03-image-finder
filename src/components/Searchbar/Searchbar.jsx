import css from "./Searchbar.module.css"
import { FcSearch } from "react-icons/fc"

export const Searchbar = ({ submitForm }) => {

    return (

        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={(e) => { e.preventDefault(); return submitForm(e.target[1].value)}}>
    <button type="submit" className={css.SearchForm__button}>
            <FcSearch className={css.SearchForm__button__icon} />
    </button>

    <input
      className={css.SearchForm__input}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
    )
}