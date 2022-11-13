
import styles from './calculator.module.scss'
import cx from 'classnames'

export default function DigitButton({ dispatch, digit, lightMode }: DIGITTYPE) {


    return <>{digit === 0 ?
        <button className={cx(lightMode ? styles.btnred : styles.btndavygrey, styles.btnzero)}
            onClick={() => dispatch({ type: Actions.AddDigit, payload: { digit } })}>
            {digit}
        </button> : <button className={lightMode ? styles.btnred : styles.btndavygrey}
            onClick={() => dispatch({ type: Actions.AddDigit, payload: { digit } })}>
            {digit}
        </button>
    }

    </>
}