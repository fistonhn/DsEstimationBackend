import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class ProjectGroup extends Model {
    static associate(models) {
      // project
      ProjectGroup.hasMany(models.Projects, {
        foreignKey: {
          name: "groupId",
          allowNull: true,
        },
        as: "projects",
      });

      // users
      ProjectGroup.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        as: "user_group",
      });
    }
  }

  ProjectGroup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ProjectGroup",
      tableName: "project_groups",
      timestamps: false,
    }
  );
  return ProjectGroup;
};
