import SMERouter from 'sme-router'

import positionControl from '../controller/position'
import homeControl from '../controller/home'

var router = null

const _render = () => {
    router = new SMERouter('router-view')
    router.route('/home', (req, res, next) => {
        homeControl.render({
            router,
            req,
            res,
            next
        })
    })
    router.route('/home_user', (req, res, next) => {
        homeControl.user({
            router,
            req,
            res,
            next
        })
    })
    router.route('/position', (req, res, next) => {
        positionControl.list({
            router,
            req,
            res,
            next
        })
    })
    router.route('/position_save', (req, res, next) => {
        positionControl.save({
            router,
            req,
            res,
            next
        })
    })
    router.route('/position_update', (req, res, next) => {
        positionControl.update({
            router,
            req,
            res,
            next
        })
    })
    router.route('*', (req, res, next) => {
        res.redirect('/home')
    })
    router.use((req) => {
        _activeLink(req.route)
    })
}

const _activeLink = (route) => {
    let $lis = $('#sidebar-menu li[to]')
    $lis
        .filter(`[to="${route}"]`)
        .addClass('active')
        .siblings()
        .removeClass('active')
}

const _navLink = () => {
    let $lis = $('#sidebar-menu li[to]')
    $lis.on('click', function () {
        let to = $(this).attr('to')
        router.go(to)
    })
}

export default {
    render: _render,
    navLink: _navLink
}