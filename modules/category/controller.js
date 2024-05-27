const categoryConstant = require('../../utils/constants/category.constants');

const getAll = (request, response) => {
    response.send({
        data: categoryConstant.CATEGORY,
        status: 200,
        message: "Data retrieved"
    });
}

const getById = (request, response) => {
    const data = categoryConstant.CATEGORY.find(v => v.id === +request.params.id);
    if (!data) {
        response.status(404).send({
            data: null,
            message: 'Data not found',
            status: 404
        });
    }
    response.send({
        data: data,
        status: 200,
        message: "Data retrieved"
    });
}

const create = (request, response) => {
    response.send({
        data: request.body,
        message: 'Data created',
        status: 201
    });
}

const update = (request, response) => {
    response.send({
        params: request.params.id,
        data: request.body,
        message: 'Data updated',
        status: 200
    });
}

const remove = (request, response) => {
    response.send({
        params: request.params.id,
        message: 'Data deleted',
        status: 200
    });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}