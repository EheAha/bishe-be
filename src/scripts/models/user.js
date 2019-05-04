const register = ({
    data
}) => {
    return $.ajax({
        url: '/api/users/register',
        data,
        type: 'POST',
        success: (result) => {
            return result
        }
    })
}

const signin = (data) => {
    return $.ajax({
        url: '/api/users/signin',
        data,
        type: 'POST',
        success: (result) => {
            return result
        }
    })
}

const isSignin = () => {
    return $.ajax({
        url: '/api/users/isSignin',
        success: (result) => {
            return result
        }
    })
}

const signout = () => {
    return $.ajax({
        url: '/api/users/signout',
        success: (result) => {
            return result
        }
    })
}

const findone = ({
    username
}) => {
    return $.ajax({
        url: '/api/users/findone',
        type: 'POST',
        data: {
            username
        },
        success: (result) => {
            return result
        }
    })
}

const userupdate = () => {
    return new Promise((resolve, reject) => {
        var options = {
            "success": (result) => {
                resolve(result)
            },
            "resetForm": true,
            "dataType": "json"
        };
        $("#usersave").ajaxSubmit(options)
    })
}

export default {
    register,
    signin,
    isSignin,
    signout,
    findone,
    userupdate
}