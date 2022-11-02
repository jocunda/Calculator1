enum ACTIONS {
    ADD_DIGIT = 'add-digit',
    CHOOSE_OPERATOR = 'choose-operation',
    CLEAR = 'clear',
    DELETE_DIGIT = 'delete-digit',
    EVALUATE = 'evaluate',
}
// An interface for our actions
interface COUNTACTIONS {
    type: ACTIONS;
    payload: {
        digit: number
        operation: string
    };
}

// An interface for our state
interface COUNTSTATE {
    curr: number
    prev: number
    operation: string
}

type OPERATORTYPE = {
    dispatch: any
    operator: string
    lightMode: boolean
}

type DIGITTYPE = {
    dispatch: any
    digit: number
    lightMode: boolean
}

