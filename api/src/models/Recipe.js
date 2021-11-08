const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      get() {
        return `L${this.getDataValue('id')}`
      },
      set(value){
        this.setDataValue('id', value.slice(1) * 1)
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    points: {
      type: DataTypes.STRING,
    },
    healthScore: {
      type: DataTypes.STRING
    },
    steps: {
      type: DataTypes.TEXT
    },
  }, {timestamps: false} );
};
