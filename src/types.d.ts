enum Actions {
    AddDigit = 'add-digit',
    chooseOperator = 'choose-operation',
    clear = 'clear',
    deleteDigit = 'delete-digit',
    evaluate = 'evaluate',
}

// An interface for our actions 
type Action = {
    type: Actions.AddDigit;
    payload: {
        digit: number
    };
} | {
    type: Actions.chooseOperator;
    payload: {
        operation: string
    };
} | {
    type: Actions.clear;
} | {
    type: Actions.deleteDigit;
}
    | {
        type: Actions.evaluate;
    };

// An interface for our state
interface CountState {
    current: number
    previous: number
    operation: string
}


type OPERATORTYPE = {
    dispatch: Dispatch<Action>
    operator: string
    lightMode: boolean
}

type DIGITTYPE = {
    dispatch: Dispatch<Action>
    digit: number
    lightMode: boolean
}

