
import styles from './calculator.module.scss'


export default function OperatorButton({ dispatch, operator, lightMode }: OPERATORTYPE) {


    return <>
        <button className={lightMode ? styles.btnyellow : styles.btngrey}
            onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator } })}>
            {operator}
        </button>
    </>
}