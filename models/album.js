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



    Album.sync({force: false}).then( () => {
        console.log('synced album table')
    })

    return Album
}