module.exports = (req, res, next) => {
    let reqpath = req.path.toLowerCase()
    // 放行路由
    let reu = ["/login", '/userpass']
    if (reu.includes(reqpath)) {
        next();
    } else {
        if (req.session.userInfo) {
            next();
        } else {
            res.redirect("/login")
            return
        }
    }
}