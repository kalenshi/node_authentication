
module.exports = {
    ensureAuthenticated: (req, res, next) =>{
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error_msg', "Please Log in to view this resource");
            res.redirect('/users/login');
        }
    }
};