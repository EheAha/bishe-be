import positionListTpl from '../views/position.list.html'
import positionSaveTpl from '../views/position.save.html'
import positionUpdateTpl from '../views/position.update.html'
import positionMondel from '../models/position'

import userModel from '../models/user'

// var socket = io('http://localhost:5000');

const _genToken = () => {
    return new Date().getTime() + Math.random()
}

const _bindListEvents = ({
    router,
    req
}) => {
    $("#addbtn").on('click', () => {
        router.go('/position_save')
    })

    $(".pos-update").on('click', function () {
        var id = $(this).attr('posid')
        router.go('/position_update', {
            id
        })
    })

    $("#possearch").on('click', function () {
        let keywords = $('#keywords').val()
        let query = {
            ...req.query,
            pageNo: 1,
            keywords,
            _: _genToken()
        }
        router.go(`/position?${$.param(query)}`)
    })
}

const _bindSaveEvents = (router) => {
    $("#posback").on('click', () => {
        router.back()
    })

    $('#possubmit').on('click', async () => {

        let result = await positionMondel.save()
        if (result.ret) {
            $('#possave').get(0).reset()
            // socket.emit('sendMsg', "222");
        } else {
            alert(result.data.msg)
        }
    })
}

const _bindRemoveEvent = ({
    router,
    req,
    pageSize
}) => {

    $(".positionRemove").on('click', async function () {
        var data = $(this).attr('posid')
        let result = await positionMondel.remove(data)
        if (result.ret) {
            let { keywords = '', pageNo = '' } = req.query || {}

            if (pageNo == '') {
                pageNo = 1
            } else {
                ~~pageNo
            }

            let total = (await positionMondel.listall({
                keywords
            })).data.total
            let pageCount = Math.ceil(total / ~~pageSize)
            if (pageNo > pageCount && pageNo != 1) {
                pageNo = pageNo - 1
            }
            router.go(`/position?_=${data}&pageNo=${pageNo}&keywords=${keywords || ''}`)
        } else {
            alert(result.data.msg)
        }
    })
}

const _bindUpdateEvents = (router) => {
    $('#posback').on('click', () => {
        router.back()
    })

    $('#possubmit').on('click', async () => {
        let result = await positionMondel.update()
        if (result.ret) {
            router.back()
        } else {
            alert(result.data.msg)
        }
    })

    $('#updateimg').change(function () {
        var reader = new FileReader()
        var file = this.files[0]
        reader.onload = function (e) {
            var img = document.getElementById("preview");
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    })
}

const list = async ({
    router,
    res,
    req
}) => {
    let {
        pageNo = 1, pageSize = 5, keywords = ''
    } = req.query || {}

    let result = await positionMondel.list({
        pageNo,
        pageSize,
        keywords
    })
    if (!result.ret) {
        alert("你没有权限访问")
        router.go('/home')
        return
    }

    let { list, total } = result.data

    let pageCount = Math.ceil(total / ~~pageSize)
    let html = template.render(positionListTpl, {
        list,
        pageArray: new Array(pageCount),
        pageNo: ~~pageNo,
        pageCount: ~~pageCount,
        pageSize: ~~pageSize,
        keywords
    })
    res.render(html)

    _bindListEvents({
        router,
        req
    })
    _bindRemoveEvent({
        router,
        req,
        pageSize
    })
}

const save = ({
    router,
    res
}) => {
    res.render(positionSaveTpl)

    _bindSaveEvents(router)
}

const update = async ({
    router,
    req,
    res
}) => {
    let id = req.body.id
    let html = template.render(positionUpdateTpl, {
        data: (await positionMondel.listone(id)).data
    })
    res.render(html)

    _bindUpdateEvents(router)
}

export default {
    list,
    save,
    update
}