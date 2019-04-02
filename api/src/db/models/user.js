export default function(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      orgId: DataTypes.INTEGER,
      resetKey: DataTypes.STRING
    },
    {}
  )
  User.associate = function(models) {
    User.belongsTo(models.Organization, {
      foreignKey: 'orgId'
    })
    User.hasMany(models.ProjectUser, {
      foreignKey: 'userId'
    })
    // User.belongsToMany(models.Project, {
    //   as: 'Projects',
    //   through: models.ProjectUser,
    //   foreignKey: 'userId',
    //   otherKey: 'projectId'
    // })
  }
  return User
}