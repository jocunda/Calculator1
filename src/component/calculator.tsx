
import styles from './calculator.module.scss'
import cx from 'classnames'
import { FiMoon, FiSun } from 'react-icons/fi'


import { useContext, useReducer } from 'react'
import { LightModeContext } from './lightModeContext'

import DigitButton from './digitButton'
import OperatorButton from './operatorButton'

const initialState = {
    curr: 0,
    prev: 0,
    operation: '',
};


function reducer(state: COUNTSTATE, { type, payload }: COUNTACTIONS) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (payload.digit === 0 && state.curr === 0) return state
            return {
                ...state,
                curr: `${state.curr || ""}${payload.digit}`
            };
        case ACTIONS.CHOOSE_OPERATOR:
            if (state.curr == null && state.prev == null) return state
            if (state.curr == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }
            if (state.prev == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    prev: state.curr,
                    curr: null,
                }
            }
            return {
                ...state,
                prev: evaluate(state),
                operation: payload.operation,
                curr: null
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.EVALUATE:
            if (state.operation == null || state.curr == null || state.prev == null) {
                return state
            }
            return {
                ...state,
                prev: null,
                operation: null,
                curr: evaluate(state)
            }

        default:
            return state
    }
}

function evaluate({ curr, prev, operation }: COUNTSTATE) {

    if (isNaN(prev) || isNaN(curr)) return ""
    let computation = 0
    switch (operation) {
        case "+":
            computation = prev + curr
            break;
        case "-":
            computation = prev - curr
            break;
        case "*":
            computation = prev * curr
            break;
        case "/":
            computation = prev / curr
            break;
    }
    return computation
}

export default function Calculator() {
    // theme
    const { lightMode, toogleLightMode } = useContext(LightModeContext);
    const handleClick = () => {
        toogleLightMode();
    }

    //calculator
    const [{ curr, prev, operation }, dispatch] = useReducer(reducer, initialState);

    return <>
        <div className={lightMode ? cx(styles.lightcalculator, styles.calculator) : styles.calculator}>
            <section className={styles.theme} onClick={handleClick}>
                {lightMode ? <FiSun className={styles.lighticon} /> : <FiMoon />}
            </section>
            <section className={styles.monitor}>
                <p className={styles.prevmonitor}>{prev}{operation}</p>
                <p>{curr}</p>
            </section>
            <section className={styles.calcbtnContainer}>
                <button onClick={() => dispatch({ type: ACTIONS.CLEAR)} className={lightMode ? styles.btnyellow : styles.btngrey}>AC</button>
                <button className={lightMode ? styles.btnyellow : styles.btngrey}>-/+</button>
                <button className={lightMode ? styles.btnyellow : styles.btngrey}>%</button>
                <OperatorButton dispatch={dispatch} operator={'/'} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={7} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={8} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={9} lightMode={lightMode} />
                <OperatorButton dispatch={dispatch} operator={'*'} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={4} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={5} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={6} lightMode={lightMode} />
                <OperatorButton dispatch={dispatch} operator={'-'} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={1} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={2} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={3} lightMode={lightMode} />
                <OperatorButton dispatch={dispatch} operator={'+'} lightMode={lightMode} />
                <DigitButton dispatch={dispatch} digit={0} lightMode={lightMode} />
                <button className={cx(lightMode ? styles.btnred : styles.btndavygrey, styles.btndot)}>.</button>
                <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className={lightMode ? cx(styles.btntotallight, styles.btntotal) : styles.btntotal}>=</button>
            </section>
        </div>
    </>
}