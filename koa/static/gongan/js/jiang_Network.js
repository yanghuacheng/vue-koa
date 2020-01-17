function j_NetWork() {
}
//post请求
j_NetWork.prototype.postWay = function (url, parm, req) {
    //json序列化
    parm = JSON.stringify(parm);
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: parm,
        success: function (data) {
            req(data);
        },
        error: function (err) {
            console.log(err);
            req(false);

        }
    })
}
// get请求
j_NetWork.prototype.getWay = function (url, req) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",  //推荐写这个
        dataType: "json",
        success: function (data) {
            req(data);
        },
        error: function (err) {
            req(false)
        }
    })
}

//上传图片专用
j_NetWork.prototype.postImage = function (url, file, req) {
    //先把拿到的图片数据form格式化一下
    let form = new FormData()
    form.append('file', file)
    form.enctype = "multipart/form-data"
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        processData: false,
        contentType: false,
        data: form,
        success: function (data) {
            req(data)
        },
        error: function (err) {
            console.log(err)
            req(false)
        }

    })
}

//DELETE 删除
j_NetWork.prototype.delete = function (url, req) {
    //删除
    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            req(data);
        },
        error: function (err) {
            console.log(err);
            req(false);

        }
    })

}

//PUT 修改
j_NetWork.prototype.putChange = function (url,parm,req) {
    //json序列化
    parm = JSON.stringify(parm);
    $.ajax({
        type: "PUT",
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: parm,
        success: function (data) {
            req(data);

        },
        error: function (err) {
            console.log(err);
            // req(false);

        }
    })
}