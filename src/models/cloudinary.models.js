import { sequelize, DataTypes} from '../database/config.js';


const Image = sequelize.define('Image', {
    original_filename: DataTypes.STRING,
    format: DataTypes.STRING,
    resource_type: DataTypes.STRING,
    url: DataTypes.TEXT,
    secure_url: DataTypes.TEXT,
    asset_id: DataTypes.STRING,
    public_id: DataTypes.STRING,
    version_id: DataTypes.STRING,
    creation: DataTypes.DATE
}, {
    sequelize,
    paranoid: true,
    modelName: 'Image',
    tableName: 'images',
    underscored: true
});

const localImage = sequelize.define('Image', {
    name: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    code: DataTypes.TEXT,
    creation: DataTypes.DATE
}, {
    sequelize,
    paranoid: true,
    modelName: 'Image',
    tableName: 'imagenes',
    underscored: true
});

Image.sync()
localImage.sync()

export {Image, localImage};

