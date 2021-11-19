const Logged = (state = null, action) => {
    switch (action.type) {
        case "LOGIN": return true;
        case "LOGOUT": return false;
        default: return state;
    }
}

export default Logged