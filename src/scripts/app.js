import router from './router'
import bodyTpl from './views/body.html'
// import userTpl from './views/user.html'
// import userController from './controller/user'
import '../styles/app.scss'


$('#root').html(bodyTpl)

// $('#user').html(userTpl)

// userController.render()

router.render()


router.navLink()