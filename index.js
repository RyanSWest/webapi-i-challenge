// implement your API here
// implement your API here
const express = require('express');

const db = require ('./data/db');

const server = express();

server.use(express.json())

server.get('/',( req, res) => {
    res.send('Hello EEEEE')
});

 

 
////HERE!!

server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {

        res.status(500).json({success: false, err})
    });
});


server.post('/users', (req,res) => {
    const userInfo = req.body;
    console.log(userInfo)


    db.insert(userInfo)
    .then(user => {
        res.status(201).json({success: true, user})
    })
    .catch(err => {
        res.status(500).json({success: false, err})
    });
})



server.put('/users/:id', (req, res)=> {
    const {id} = req.params;
    const userInfo = req.body;
    console.log(userInfo);

    db.update(id, userInfo)
    .then(updated => {
        if(updated){
            res.status(200).json({success: true, updated});
        }else {
            res.status(404).json({success: false, message: 'Cannot find the user you are looking for'})
        }
    })
    .catch (err => {
        res.status(500).json({success: false, err })
    })


});

server.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(deleted => {
        if (deleted){
            res.status(204).end();
        } else {
            res.status(404).json({success: false, message: 'cannot find the user you are looking for'} )
        }
    })
    .catch(err => {
        res.status(500).json({success: false, err})
    })
})
 

server.get('/now',(req, res)=> {
    const now = new Date().toISOString();
    res.send(now);
})

 
 
server.listen(8000, () => console.log('API running on port 8000'));

 