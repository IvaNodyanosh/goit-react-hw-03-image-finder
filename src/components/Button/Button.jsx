import css from "./Button.module.css"


export const Button = ({decrementPage}) => {


    return <button type="button" className={css.Button} onClick={decrementPage}>Load more</button>
}