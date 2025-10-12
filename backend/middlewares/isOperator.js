const { ERR } = require("../utils/response")

const isOperator  = (req, res, next) => {
    if (!req.user || !["admin", "operator"].includes(req.user.role)) {
        return ERR(res, 403, "Akses hanya untuk role admin dan operator");
    };
    next();
}

module.exports = isOperator;