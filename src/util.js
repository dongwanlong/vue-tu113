let util = {
    ajax(url, data, cb){
        console.log(1111111111, url);
        $.ajax({
            type: "post",
            url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success : res=>{
                if(res.code==200){
                    cb({
                        result:0,
                        data:res,
                    })
                }else{
                    cb({
                        result:1,
                        data:res,
                    })
                }
            },
            error : err=>{
                cb({
                    result:1,
                    data:"AJAX错误",
                })  
            }
        });
    },
    notifyError(ref, msg){
        ref.$notify({
            message: msg,
            duration: 3000,
            type: "error"
        });
    },
    successError(ref, msg){
        ref.$notify({
            message: msg,
            duration: 3000,
            type: "success"
        });
    },
}

export default util;