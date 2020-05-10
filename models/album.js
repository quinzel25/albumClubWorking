module.exports = (sequelize, DataTypes) => {

    let Album = sequelize.define('Album', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        suggester: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imgURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        openLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        archive: {
            type: DataTypes.BOOLEAN,


        }
    })


    // TODO remember to change force: to false
    Album.sync({force: true}).then( () => {
        console.log('synced album table')
    })

    return Album
}