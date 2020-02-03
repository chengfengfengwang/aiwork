const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const config = require('./config');
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
class Project extends Model{};
Project.init({
  id:{
    type:Sequelize.STRING,
    primaryKey: true
  },
  name:{
    type:Sequelize.STRING
  }
},{
  sequelize,
  modelName: 'class',
  timestamps: false
});
// Project.findByPk(1).then(project => {
//   console.log(project)
// })
const project = Project.create({name:'ccdd'}).then(task => {
  console.log(task)
});
//project.save();