const { Sequelize } = require('sequelize');
const sequelize = require('./../server/database/database');

const Shopify_custom_session_storage = sequelize.define("shopify_custom_session_storage", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  sessionId: {
      type: Sequelize.TEXT,
      allowNull: true
  },
  shopId: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  shop: {
      type: Sequelize.TEXT,
      allowNull: true,
      unique: true
  },
  state: {
      type: Sequelize.TEXT,
      allowNull: true
  },
  scope: {
      type: Sequelize.TEXT,
      allowNull: true
  },
  expires: {
      type: Sequelize.TEXT,
      allowNull: true
  },
  isOnline: {
      type: Sequelize.TEXT,
      allowNull: true
  },
  accessToken: {
      type: Sequelize.TEXT,
      allowNull: true
  },
  onlineAccessInfo: {
      type: Sequelize.TEXT,
      allowNull: true
  }
}, {
  timestamps: true
});

const Shopify_billings = sequelize.define("shopify_billings", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    chargeId: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    shop: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    gid: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true
});

module.exports = {
    Shopify_custom_session_storage,
    Shopify_billings
};