var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const urlc = "mongodb+srv://noaz:camilitoxd5647.@cluster0-ce7dd.azure.mongodb.net/test?retryWrites=true";

mongoose.connect(urlc, {useNewUrlParser: true});

var Schema = mongoose.Schema;

// USERS
//
//
var userDataSchema = new Schema({
    nombre : {type: String, required: true},
    dni : {type: String},
    celular : String,
    correo : {type: String, required: true},
    direccion : String,
    departamento : String,
    provincia : String,
    distrito : String,
    comentario : {type: String, required: true}
});
var UserData = mongoose.model('usuarios', userDataSchema);

// GET HOME PAGE
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express de Noa'});
});

// GET USER URL
router.get('/getUsers', function(req, res, next) {
    UserData.find()
    .then(function(doc) {
        res.send({items: doc})
    });
});

// INSERT USER URL
router.post('/insertUser', function(req, res, next) {
    var item = {
        nombre: req.body.nombre,
        dni : req.body.dni,
        celular : req.body.celular,
        correo : req.body.correo,
        direccion : req.body.direccion,
        departamento : req.body.departamento,
        provincia : req.body.provincia,
        distrito : req.body.distrito,
        comentario : req.body.comentario
    };

    var data = new UserData(item);
    data.save();
    res.send("OK");
});

// UPDATE USER URL
router.post('/updateUser', function(req, res, next) {
    var item = {
        nombre: req.body.nombre,
        dni : req.body.dni,
        celular : req.body.celular,
        correo : req.body.correo,
        direccion : req.body.direccion,
        departamento : req.body.departamento,
        provincia : req.body.provincia,
        distrito : req.body.distrito,
        comentario : req.body.comentario
    };
    var id = req.body.id;

    UserData.findById(id, function(err, doc){
        if(err) {
            console.error('error, no entry found');
        }
        doc.nombre = req.body.nombre;
        doc.dni = req.body.dni;
        doc.celular = req.body.celular;
        doc.correo = req.body.correo;
        doc.direccion = req.body.direccion;
        doc.departamento = req.body.departamento;
        doc.provincia = req.body.provincia;
        doc.distrito = req.body.distrito;
        doc.comentario = req.body.comentario;
        doc.save();
        res.send("OK");
    });
});

// DELETE USER URL
router.post('/deleteUser', function(req, res, next) {
    var id = req.body.id;
    UserData.findByIdAndRemove(id).exec();
    res.send("OK");
});

// COMPANY
//
//
var companyDataSchema = new Schema({
    nombre : {type: String},
    dni : {type: String},
    razon : {type: String, required: true},
    ruc : {type: String},
    celular : String,
    correo : {type: String, required: true},
    direccion : String,
    departamento : String,
    provincia : String,
    distrito : String,
    comentario : {type: String, required: true}
});
var CompanyData = mongoose.model('empresas', companyDataSchema);

// GET COMPANY URL
router.get('/getCompanies', function(req, res, next) {
    CompanyData.find()
    .then(function(doc) {
        res.send({items: doc})
    });
});

// INSERT COMPANY URL
router.post('/insertCompany', function(req, res, next) {
    var item = {
        nombre: req.body.nombre,
        razon : req.body.razon,
        ruc : req.body.ruc,
        celular : req.body.celular,
        correo : req.body.correo,
        direccion : req.body.direccion,
        departamento : req.body.departamento,
        provincia : req.body.provincia,
        distrito : req.body.distrito,
        comentario : req.body.comentario
    };

    var data = new CompanyData(item);
    data.save();
    res.send("OK");
});

// UPDATE COMPANY URL
router.post('/updateCompany', function(req, res, next) {
    var item = {
        nombre: req.body.nombre,
        razon : req.body.razon,
        ruc : req.body.ruc,
        celular : req.body.celular,
        correo : req.body.correo,
        direccion : req.body.direccion,
        departamento : req.body.departamento,
        provincia : req.body.provincia,
        distrito : req.body.distrito,
        comentario : req.body.comentario
    };
    var id = req.body.id;

    CompanyData.findById(id, function(err, doc){
        if(err) {
            console.error('error, no entry found');
        }
        doc.nombre = req.body.nombre;
        doc.razon = req.body.razon;
        doc.ruc = req.body.ruc;
        doc.dni = req.body.dni;
        doc.celular = req.body.celular;
        doc.correo = req.body.correo;
        doc.direccion = req.body.direccion;
        doc.departamento = req.body.departamento;
        doc.provincia = req.body.provincia;
        doc.distrito = req.body.distrito;
        doc.comentario = req.body.comentario;
        doc.save();
        res.send("OK");
    });
});

// DELETE COMPANY URL
router.post('/deleteCompany', function(req, res, next) {
    var id = req.body.id;
    CompanyData.findByIdAndRemove(id).exec();
    res.send("OK");
});

// ADMIN
//
//
var AdminDataSchema = new Schema({
    user : {type: String, unique: true, required: true},
    pass : {type: String, unique: true, required: true},
});
var AdminData = mongoose.model('administradores', AdminDataSchema);

// INSERT ADMIN URL
router.post('/insertAdmin', function(req, res, next) {
    var item = {
        user: req.body.user,
        pass : req.body.pass
    };

    var data = new AdminData(item);
    data.save();
    res.send("OK");
});

// LOOK FOR AN ADMIN URL
router.post('/isAdmin', function(req, res, next) {
    AdminData.find({
        'user': req.body.user,
        'pass': req.body.pass
    })
    .then(function(doc) {
        res.send({items: doc})
    });
});

// GET ADMIN URL
router.get('/getAdmins', function(req, res, next) {
    AdminData.find()
    .then(function(doc) {
        res.send({items: doc})
    });
});

module.exports = router;
