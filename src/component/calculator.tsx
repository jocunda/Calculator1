
import styles from './calculator.module.scss'
import cx from 'classnames'
import { FiMoon, FiSun } from 'react-icons/fi'


import { useContext, useReducer } from 'react'
import { LightModeContext } from './lightModeContext'

import DigitButton from './digitButton'
import OperatorButton from './operatorButton'

const initialState = {
    current: 0,
    previous: 0,
    operation: '',
};

function reducer(state: CountState, action: Action): CountState {

    switch (action.type) {
        //for digit button
        case Actions.AddDigit:
            //start with zero
            if (action.payload.digit === 0 && state.current === 0) return state
            return {
                ...state,
                current: Number(`${state.current || ""}${action.payload.digit}`)
            };

        //for operation button
        case Actions.chooseOperator:
            if (state.current == null && state.previous == null) return state
            if (state.current == null) {
                return {
                    ...state,
                    operation: action.payload.operation,
                }
            }
            if (state.previous == null) {
                return {
                    ...state,
                    operation: action.payload.operation,
                    previous: state.current,
                    current: 0,
                }
            }
            return {
                ...state,
                previous: Number(evaluate(state)),
                operation: action.payload.operation,
                current: 0
            }

        //for AC button
        case Actions.clear:
            return initialState

        //for = button
        case Actions.evaluate:
            if (state.operation == null || state.current == null || state.previous == null) {
                return state
            }
            return {
                ...state,
                previous: 0,
                operation: '',
                current: Number(evaluate(state))
            }

        default:
            return state
    }
}

//for =
function evaluate({ current, previous, operation }: CountState) {

    if (isNaN(previous) || isNaN(current)) return ""
    let computation = 0
    switch (operation) {
        case "+":
            computation = previous + current
            break;
        case "-":
            computation = previous - current
            break;
        case "*":
            computation = previous * current
            break;
        case "/":
            computation = previous / current
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
    const [{ current, previous, operation }, dispatch] = useReducer(reducer, initialState);

    return <>
        <div className={lightMode ? cx(styles.lightcalculator, styles.calculator) : styles.calculator}>
            <section className={styles.theme} onClick={handleClick}>
                {lightMode ? <FiSun className={styles.lighticon} /> : <FiMoon />}
            </section>
            <section className={styles.monitor}>
                <p className={styles.prevmonitor}>{previous}{operation}</p>
                <p>{current}</p>
            </section>
            <section className={styles.calcbtnContainer}>
                <button onClick={() => dispatch({ type: Actions.clear })}
                    className={lightMode ? styles.btnyellow : styles.btngrey}>AC
                </button>
                <button onClick={() => dispatch({ type: Actions.deleteDigit })}
                    className={lightMode ? styles.btnyellow : styles.btngrey}>DEL</button>
                <button className={lightMode ? styles.btnyellow : styles.btngrey}>-/+</button>
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
                <button onClick={() => dispatch({ type: Actions.evaluate })}
                    className={lightMode ? cx(styles.btntotallight, styles.btntotal) : styles.btntotal}>=</button>
            </section>
        </div>
    </>
}