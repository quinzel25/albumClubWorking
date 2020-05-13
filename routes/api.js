let express = require('express')
let db = require('../models')
let Album = db.Album
//error handling
let Sequelize = require('sequelize')

let router = express.Router()
// ALBUM TABLE
router.get('/albums', function (req,res,next) {
    Album.findAll().then( albums => {
        return res.json(albums)
    }).catch(err => next(err) )
})
// grabbing the most current album
// router.get('/albums/current', function (req,res,next) {
//     Album.findOne({
//         where: {archive: true} },
//         { order: [['updatedAt']] ,
//             limit: 1, })
//         .then(
//         album => {
//             return res.json(album)
//         }).catch(err => next(err) )
// })

router.get('/albums/current', function (req,res,next) {
    Album.findAll({
        where: {archive: true},
        order: [ [ 'updatedAt', 'desc' ] ],
        limit: 1
    }).then(
        album => {
            return res.json(album)
        }).catch(err => next(err) )
})


router.post('/albums', function (req,res,next) {
    Album.create(req.body).then( (data) => {
        return res.status(201).send('ok')
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message )
            // 400 status = bad request from user
            return res.status(400).json(messages)
        }
        return next(err)
    } )
})



//updating the table
router.patch('/albums/:id', function(req, res, next){
    Album.update(
        req.body, {
            where: {
                id: req.params.id
            }
        }).then( rowsModified => {
        if (!rowsModified[0]) {
            return res.status(404).send('Not found')
        } else {
            return res.send('ok')
        }
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( (e) => e.message)
            return res.status(400).json(messages)
        }
        return next(err)
    })
})

// for deletion
router.delete('/albums/:id', function(req, res, next){
    Album.destroy({where: {id: req.params.id}}).then( rowsModified => {
        return res.send('ok')
    }).catch( err => next(err) )
})



// needed at bottom
module.exports = router