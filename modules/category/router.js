const express = require('express');
const router = express.Router();

const categoryConstant = require('../../utils/constants/category.constants');  

router.get('/category', (request, response)=>{
    response.send({
        data: categoryConstant.CATEGORY,
        status: 200,
        message: "Data retrieved"    
    });
}); 

// get category by id
router.get('/category/:id', (request, response)=>{
    const data = categoryConstant.CATEGORY.find(v=> v.id === +request.params.id);
    if(!data){
        response.status(404).send({
            data: null,
            message:'Data not found',
            status: 404
        });
    }
    response.send({
        data: data,
        status: 200,
        message: "Data retrieved"    
    });
}); 

router.post('/category',(request, response)=>{
    response.send({
        data: request.body,
        message: 'Data created',
        status:201
    });
});

router.put('/category/:id',(request, response)=>{
    response.send({
        params: request.params.id,
        data: request.body,
        message: 'Data updated',
        status:200
    });
});

router.delete('/category/:id',(request, response)=>{
    response.send({
        params: request.params.id,
        message: 'Data deleted',
        status:200
    });
});

module.exports = router;