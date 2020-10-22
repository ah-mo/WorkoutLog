module.exports = function(sequelize, DataTypes) {
    const Log = sequelize.define('log', {
        desc:{
            type: DataTypes.STRING,
            allowNull: false
        },
        def:{
            type: DataTypes.STRING,
            allowNull: false
        },
        result:{
            type: DataTypes.STRING,
        },
        owner_id:{
            type: DataTypes.INTEGER
        }
    });
    return Log;
}
