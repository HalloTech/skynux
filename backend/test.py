from utils.otp import OTPManager

otp_manager = OTPManager()
otp_manager.send_email_otp('user@example.com')  # Returns True/False
otp_manager.send_sms_otp('+1234567890')  # Returns True/False