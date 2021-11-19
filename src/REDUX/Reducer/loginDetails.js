const Info = (state = [], action) => {
    switch (action.type) {
        case "DATA": return action.details;
        default: return state;
    }
}

export default Info