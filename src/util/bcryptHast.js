const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports={

encrypt:async(password)=>{    
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptReady = await bcrypt.hash(password,salt);
    return encryptReady;
},
desEncrypt:async(password,passwordSave)=>{    
    return await bcrypt.compare(password,passwordSave);
}
}