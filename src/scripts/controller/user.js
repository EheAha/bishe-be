const userTpl = require('../views/user.html')

let isSignin = false

const render = () => {
    $('#user').html(template.render(userTpl, {
        isSignin
    }))
}

export default {
    render
}
