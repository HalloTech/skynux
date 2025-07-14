const nodemailer = require('nodemailer');
const twilio = require('twilio');
const config = require('../config');
const { OTP } = require('../models');

class OTPManager {
  constructor() {
    this.otpExpiryMinutes = config.OTP_EXPIRY_MINUTES;
    
    // Initialize email transporter
    if (config.MAIL_USERNAME && config.MAIL_PASSWORD) {
      this.emailTransporter = nodemailer.createTransporter({
        host: config.MAIL_HOST,
        port: config.MAIL_PORT,
        secure: false,
        auth: {
          user: config.MAIL_USERNAME,
          pass: config.MAIL_PASSWORD
        }
      });
    }
    
    // Initialize Twilio client
    if (config.TWILIO_ACCOUNT_SID && config.TWILIO_AUTH_TOKEN) {
      this.twilioClient = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
    }
  }

  generateOTP(length = 6) {
    return Math.random().toString().substr(2, length);
  }

  async sendEmailOTP(email) {
    if (!this.emailTransporter) {
      throw new Error('Email configuration not set up');
    }

    const otpCode = this.generateOTP();
    const expiration = new Date(Date.now() + this.otpExpiryMinutes * 60 * 1000);

    try {
      // Store in database
      await OTP.create({
        recipient: email,
        otp_code: otpCode,
        otp_type: 'email',
        expires_at: expiration
      });

      // Send email
      const mailOptions = {
        from: config.MAIL_USERNAME,
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${otpCode}\nThis code expires in ${this.otpExpiryMinutes} minutes.`
      };

      await this.emailTransporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email OTP error:', error);
      // Clean up failed OTP record
      await OTP.destroy({ where: { recipient: email, otp_code: otpCode } });
      return false;
    }
  }

  async sendSMSOTP(phoneNumber) {
    if (!this.twilioClient) {
      throw new Error('Twilio configuration not set up');
    }

    const otpCode = this.generateOTP();
    const expiration = new Date(Date.now() + this.otpExpiryMinutes * 60 * 1000);

    try {
      // Store in database
      await OTP.create({
        recipient: phoneNumber,
        otp_code: otpCode,
        otp_type: 'sms',
        expires_at: expiration
      });

      // Send SMS
      await this.twilioClient.messages.create({
        body: `Your verification code is: ${otpCode}`,
        from: config.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });

      return true;
    } catch (error) {
      console.error('SMS OTP error:', error);
      // Clean up failed OTP record
      await OTP.destroy({ where: { recipient: phoneNumber, otp_code: otpCode } });
      return false;
    }
  }

  async verifyOTP(recipient, otpCode) {
    try {
      const otpRecord = await OTP.findOne({
        where: {
          recipient: recipient,
          otp_code: otpCode
        }
      });

      if (!otpRecord) {
        return false;
      }

      if (otpRecord.expires_at < new Date()) {
        await OTP.destroy({ where: { id: otpRecord.id } });
        return false;
      }

      // Clean up used OTP
      await OTP.destroy({ where: { id: otpRecord.id } });
      return true;
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    }
  }

  async cleanupExpiredOTPs() {
    try {
      const expiredCount = await OTP.destroy({
        where: {
          expires_at: {
            [require('sequelize').Op.lt]: new Date()
          }
        }
      });
      return expiredCount;
    } catch (error) {
      console.error('Cleanup expired OTPs error:', error);
      return 0;
    }
  }
}

module.exports = new OTPManager(); 