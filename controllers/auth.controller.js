const { response, request } = require("express");

const loginPost = ( req = request, res = response) => {
    res.json({
        msg: 'Login OK'
    })
}

module.exports = {
    loginPost
}