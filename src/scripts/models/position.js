const listall = ({
    keywords
}) => {
    return $.ajax({
        url: '/api/position/listall',
        data:{
            keywords
        },
        success: (result) => {
            return result
        }
    })
}

const list = ({
    pageNo,
    pageSize,
    keywords
}) => {
    return $.ajax({
        url: '/api/position/list',
        data: {
            pageNo,
            pageSize,
            keywords
        },
        success: (result) => {
            return result
        }
    })
}

const listone = (id) => {
    return $.ajax({
        url: '/api/position/listone',
        type: 'POST',
        data: {
            id
        },
        success: (result) => {
            console.log(result)
            return result
        }
    })
}

const save = () => {
    return new Promise((resolve, reject) => {
        var options = {
            "success": (result) => {
                resolve(result)
            },
            "resetForm": true,
            "dataType": "json"
        };
        $("#possave").ajaxSubmit(options)
    })
}

const remove = (data) => {
    return $.ajax({
        url: '/api/position/remove',
        data: {
            _id: data
        },
        success: (result) => {
            return result
        }
    })
}

const update = (data) => {
    return new Promise((resolve, reject) => {
        var options = {
            "success": (result) => {
                resolve(result)
            },
            "resetForm": true,
            "dataType": "json"
        };
        $("#posupdate").ajaxSubmit(options)
    })
}

export default {
    listall,
    listone,
    list,
    save,
    remove,
    update
}