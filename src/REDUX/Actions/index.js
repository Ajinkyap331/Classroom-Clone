export const _login = () => {
    return {
        type: "LOGIN"
    }
}

export const _logout = () => {
    return {
        type: "LOGOUT"
    }
}

export const _Data = (data) => {
    return {
        type: "DATA",
        details: data,
    }
}

export const _Class = (data) => {
    return {
        type: "CLASS",
        details: data,
    }
}

