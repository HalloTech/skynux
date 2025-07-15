const { DataTypes } = require('sequelize');
const { sequelize } = require('./database');

const OTP = sequelize.define('OTP', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  recipient: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  otp_code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [4, 10]
    }
  },
  otp_type: {
    type: DataTypes.ENUM('email', 'sms'),
    allowNull: false,
    validate: {
      isIn: [['email', 'sms']]
    }
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'otps',
  timestamps: false,
  indexes: [
    {
      fields: ['recipient']
    },
    {
      fields: ['otp_code']
    },
    {
      fields: ['expires_at']
    },
    {
      fields: ['otp_type']
    }
  ]
});

// Instance methods
OTP.prototype.isExpired = function() {
  return new Date() > this.expires_at;
};

OTP.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = OTP; 