import homeTpl from '../views/home.html'
import userTpl from '../views/user.html'
import homeuserTpl from '../views/homeuser.html'

import userModel from '../models/user'
// import { __await } from 'tslib';

//页面三个按钮的操作
const _btnClick = ({
    router
}) => {

    console.log(111);

    $('#btn_sign_up').on('click', async (at) => {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
        document.querySelector('.cont_form_sign_up').style.display = "block";
        document.querySelector('.cont_form_login').style.opacity = "0";
        await setTimeout(function () {
            document.querySelector('.cont_form_sign_up').style.opacity = "1";
        }, 100);
        await setTimeout(function () {
            document.querySelector('.cont_form_login').style.display = "none";
        }, 400);
    })

    $('.ocultar').on('click', () => {
        document.querySelector('.cont_forms').className = "cont_forms";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        document.querySelector('.cont_form_login').style.opacity = "0";
        setTimeout(function () {
            document.querySelector('.cont_form_sign_up').style.display = "none";
            document.querySelector('.cont_form_login').style.display = "none";
        }, 500);
    })

    $('.btn_login').on('click', () => {
        _btnlogin()
    })
}

const _btnlogin = () => {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    document.querySelector('.cont_form_login').style.display = "block";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";
    setTimeout(function () { document.querySelector('.cont_form_login').style.opacity = "1"; }, 400);
    setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.display = "none";
    }, 200);
}


const _registerbtnClick = ({
    router
}) => {
    $('#register').on('click', async () => {
        let phone = $('#phone').val()
        let username = $('#username').val()
        let password = $('#password').val()
        let data = {
            phone,
            username,
            password
        }
        let result = await userModel.register({
            data
        })
        console.log(result)
        if (!result.ret) {
            _btnlogin()
            $('#phone').val('')
            $('#username').val('')
            $('#password').val('')
            $('#passwords').val('')
        } else {
            // alert("登录失败~~")
            alert(result.data.msg)
        }

    })
}

const _signinbtnClick = ({ router }) => {
    $('#signin').on('click', async () => {
        var username = $('#signuser').val()
        var password = $('#signpas').val()
        let result = await userModel.signin({ username, password })
        if (result.ret) {
            let username = result.data.username
            let isSignin = true
            $('#user').html(template.render(userTpl, { isSignin, username }))
            _removeClick({ router })
            router.go('/home_user', { username })
        } else {
            alert(result.data.msg)
        }
    })
}

const _removeClick = ({
    router
}) => {
    $('#remove').on('click', async () => {
        let result = await userModel.signout()

        $('#usersave').modal('hide');

        router.go('/haha')
    })
}

const _userupdate = ({
    router
}) => {
    $('#usersubmit').on('click', async () => {
        //let data = $('#usersave').serialize()
        let result = await userModel.userupdate()
        setTimeout(() => {
            router.go('/home')
        }, 300)
    })

    $('#userLogo').change(function () {
        var reader = new FileReader()
        var file = this.files[0]
        reader.onload = function (e) {
            var img = document.getElementById("previewuser");
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    })
}

const render = async ({
    router,
    req,
    res,
    next
}) => {
    //判断是否登录
    let result = await userModel.isSignin()
    if (!result.ret) {
        let isSignin = false
        let userLogo = ''
        $('#user').html(template.render(userTpl, {
            isSignin,
            userLogo
        }))

        res.render(homeTpl)
        _btnClick({ router })
        _registerbtnClick({ router })
        _signinbtnClick({ router })
    } else {
        let isSignin = true
        let username = result.data.username
        let { userLogo, userStylename } = result.data.result

        $('#user').html(template.render(userTpl, {
            isSignin,
            username,
            userLogo,
            userStylename
        }))
        _removeClick({ router })
        router.go('/home_user', {
            username
        })
    }
}

const user = async ({
    router,
    req,
    res,
    next
}) => {
    $('#btn_sign_up').on('click', () => { })
    $('.ocultar').on('click', () => { })
    $('.btn_login').on('click', () => { })
    let { username } = req.body
    let result = await userModel.findone({ username })
    let { userStyle, phone, userStylename, userLogo, _id } = result.data

    let isSignin = true
    $('#user').html(template.render(userTpl, {
        isSignin,
        username,
        userLogo,
        userStylename
    }))
    _removeClick({ router })

    res.render(template.render(homeuserTpl, {
        userStyle,
        phone,
        userStylename,
        userLogo,
        _id
    }))
    _userupdate({
        router
    })
}

export default {
    render,
    user
}