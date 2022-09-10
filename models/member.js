'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        static associate(models) {
            this.belongsTo(models.Team, { foreignKey: 'team', targetKey: 'id' });
            this.belongsTo(models.Player, { foreignKey: 'player', targetKey: 'id' });

            this.addScope('withDetails', {
                include: [{
                    required: false,
                    model: models.Player,
                    include: [{
                        required: false,
                        model: models.Country
                    }]
                }, {
                    required: false,
                    model: models.Team,
                    include: [{
                        required: false,
                        model: models.Region
                    }]
                }]
            })
        }
    }
    Member.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        player: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
                model: {
                    tableName: 'm_players',
                    key: 'id'
                }
            }
        },
        team: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
                model: {
                    tableName: 'm_teams',
                    key: 'id'
                }
            }
        },
        status: {
            type: Sequelize.ENUM('active', 'former', 'loan'),
            defaultValue: 'active'
        }
    }, {
        sequelize,
        tableName: 'm_members',
    });
    return Member;
};