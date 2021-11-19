const Class = (state = null, action) => {
    switch (action.type) {
        case "CLASS": return action.details;
        default: return state;
    }
}

export default Class