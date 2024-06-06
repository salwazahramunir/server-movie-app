'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: "authorId" });
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.hasMany(models.History, { foreignKey: "movieId" });
      Movie.hasMany(models.Favorite, { foreignKey: "movieId" });
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title can't be null"
        },
        notEmpty: {
          msg: "title can't be empty"
        }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "synopsis can't be null"
        },
        notEmpty: {
          msg: "synopsis can't be empty"
        }
      }
    },
    trailerUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "trailerUrl can't be null"
        },
        notEmpty: {
          msg: "trailerUrl can't be empty"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imgUrl can't be null"
        },
        notEmpty: {
          msg: "imgUrl can't be empty"
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "rating can't be null"
        },
        notEmpty: {
          msg: "rating can't be empty"
        },
        min: {
          args: [1],
          msg: "rating minimal 1"
        }
      },
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "genreId can't be null"
        },
        notEmpty: {
          msg: "genreId can't be empty"
        }
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "status can't be null"
        },
        notEmpty: {
          msg: "status can't be empty"
        }
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "authorId can't be null"
        },
        notEmpty: {
          msg: "authorId can't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};