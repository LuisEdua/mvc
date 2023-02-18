var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var findUserByName = async (req, res) => {
    var result = null;
    try{
        result = await userService.findUserByNameDBService(req.params);
        console.log(result);
        if(result.status){
            res.send({"status": true, "message": result.msg});
        } else{
            res.send({"status": false, "message": result.msg});
        }
    } catch(err){
        res.send({"status": false, "message": err.msg});
    }
}

var deleteUserByName = async (req, res) => {
    var result = null;
    try{
        result = await userService.deleteUserByNameService(req.params);
        if(result.status){
            res.send({"status": true, "message": result.msg});
        } else{
            res.send({"status": false, "message": result.msg});
        }
    }catch(err){
        res.send({"status": false, "message": err.msg})
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, findUserByName, deleteUserByName };