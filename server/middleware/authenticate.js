const jwt = require('jsonwebtoken');
const db = require('../db/conn');

const Authenticate = async (req, res, next) => {
    try {

        var list = {},
        rc = req.headers.cookie;
        rc && rc.split(';').forEach(function( cookie ) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
        //console.log(list['jwtoken']);
        //console.log(req.headers.cookie);

        var token = req.headers.cookie.split(' ')[1];
        //var idToken = (token.split('=')[1].replace(/;+$/, ''));
        var idToken = list['jwtoken'];

        var verifyToken = jwt.verify(idToken, 'SECRETKEY');
        //console.log(verifyToken);
        const rootUser = db.query(
            `SELECT * FROM tai_user_master WHERE id = ${verifyToken.id} AND jwt_token = '${idToken}'`,
            (err, result) => {
                if (err) {
                    return res.json({
                      success: 0,
                      message: "'User not found'"
                    });
                } else {
                    req.decoded = result;
                    next();
                }

                // console.log(result.id);
                // console.log(rootUser);
                // if(!rootUser){
                //     throw new Error ('User not found');
                // }
                // req.idToken = idToken;
                // req.rootUser = rootUser;
                // req.id = rootUser.id;
                // console.log();
                // next();
            }
        );         
        
    } catch (error) {
        res.status(401).send('Unauthorized: No token provided');
        console.log('Unauthorized: No token provided');
    }
}

module.exports = {Authenticate};