const schema = require('./schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (request, response) => {
    const user = await schema.findOne({
        email: request.body.email
    });
    
    if(!user){
        response.status(404).send({
            message:'User does not exist',
            status: 404
        })
    }

    const isPasswordSame = await bcrypt.compare(request.body.password, user.password);

    if(isPasswordSame){
        const token = await jwt.sign({id: user._id}, 'EXPENSE_TRACKER',{
            expiresIn: '30d'
        });

        response.send({
            data: {
                user: user,
                token: token
            },
            message:'Signed in successfully',
            status: 200
        })
    }
}

const getAll = async (request, response) => {
    // select * from table

    const data = await schema.find({});

    response.send({
        // data: categoryConstant.CATEGORY,
        data: data,
        status: 200,
        message: "Data retrieved"
    });
}

const getById = async (request, response) => {
  try{
    const data = await schema.findById(request.params.id);
    response.send({
        data: data,
        status: 200,
        message: "Data retrieved"
    });
  }catch(e){
    response.status(404).send({
        data: null,
        message: 'Data not found',
        status: 404
    });
  }
}

const create = async (request, response) => {
    const password = request.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    // insert into table 
    const data = await schema.create({
        ...request.body,
        password: hashedPassword
    });
    response.send({
        // data: request.body,
        message: 'Data created',
        status: 201
    });
}

const update = async (request, response) => {
    const password = request.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    await schema.findByIdAndUpdate( request.params.id, {
        // title: request.body.title
        ...request.body,
        password: hashedPassword
    })
    response.send({
        // params: request.params.id,
        // data: request.body,
        message: 'Data updated',
        status: 200
    });
}

const remove = async (request, response) => {
    await schema.findByIdAndDelete(request.params.id);
    response.send({
        // params: request.params.id,
        message: 'Data deleted',
        status: 200
    });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    loginUser
}