import css from "./Button.module.css"


export const Button = ({addNextPage}) => {


    return <button type="button" className={css.Button} onClick={addNextPage}>Load more</button>
}