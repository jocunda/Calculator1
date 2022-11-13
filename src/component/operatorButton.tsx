
import styles from './calculator.module.scss'


export default function OperatorButton({ dispatch, operator, lightMode }: OPERATORTYPE) {


    return <>
        <button className={lightMode ? styles.btnyellow : styles.btngrey}
            onClick={() => dispatch({ type: Actions.chooseOperator, payload: { operator } })}>
            {operator}
        </button>
    </>
}