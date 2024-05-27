const jwt = require('jsonwebtoken');
const schema = require('./schema');

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        // Bearer ey1233......$a
        //  ['Bearer', 'ey1233......$a']
        const bearerToken = token.split(' ')[1];
        console.log(bearerToken);
        const decoded = jwt.verify(bearerToken, 'EXPENSE_TRACKER');
        console.log(decoded);
        const user = await schema.findById(decoded.id)
        if(user){
            req.user = decoded;
            next();
        }else{
            res.status(401).json({ error: 'Access denied' })
        }

    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
module.exports = verifyToken;
