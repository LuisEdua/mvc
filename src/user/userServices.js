const { findOne } = require('./userModel');
var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
      var userModelData = new userModel();

      userModelData.firstname = userDetails.firstname;
      userModelData.lastname = userDetails.lastname;
      userModelData.email = userDetails.email;
      userModelData.password = userDetails.password;
      var encrypted = encryptor.encrypt(userDetails.password);
      userModelData.password = encrypted;

      userModel.findOne({email : userDetails.email}, function getresult(errorvalue, result){
         if(errorvalue){
            reject({status : false, msg : "Datos Invalidos"});
         } else {
            if(result == null || result == undefined){
               userModelData.save(function resultHandle(error, result) {

                  if (error) {
                     reject(false);
                  } else {
                     resolve(true);
                  }
               });
            } else {
               resolve(false);
            }
         }
      })
   });
}

module.exports.loginuserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         }
         else {
            if (result != undefined && result != null) {
               var decrypted = encryptor.decrypt(result.password);

               if (decrypted == userDetails.password) {
                  resolve({ status: true, msg: "Usuario Validado" });
               }
               else {
                  reject({ status: false, msg: "Falla en validacion de usuario" });
               }
            }
            else {
               reject({ status: false, msg: "Detalles de usuario invalido" });
            }
         }
      });
   });
}

module.exports.findUserByNameDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({firstname: userDetails.name}, function getresult(errorvalue, result){
         if(errorvalue) {
            reject({status : false, msg : "Datos invalidos"});
         }
         else {
            if(result != null){
               resolve({status : true, msg : result});
            } else {

               resolve({status : false, msg : "No encontrado"});
            }
         }
      });
   });
}

module.exports.deleteUserByNameService = (userDetails) => {
   return new Promise(function myFn(resolve, reject){
      userModel.findOneAndDelete({firstname : userDetails.name}, function getresult(errorvalue, result){
         if(errorvalue){
            reject({status : false, msg : "Datos invalidos"});
         } else {
            if(result != null){
               resolve({status : true, msg : result});
            } else {
               resolve({status : false, msg : result});
            }
         }
      });
   });
}