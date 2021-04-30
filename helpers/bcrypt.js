const bcrypt = require('bcryptjs');

const hashStr = pass=>{
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(pass, salt);
    return hash
}

const comparePwd = (pass, pwd)=>{
   return bcrypt.compareSync(pass, pwd)
}


module.exports = {hashStr, comparePwd}