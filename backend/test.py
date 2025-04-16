# from utils.otp import OTPManager

# otp_manager = OTPManager()
# otp_manager.send_email_otp('user@example.com')  # Returns True/False
# otp_manager.send_sms_otp('+1234567890')  # Returns True/False

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/htsdb'
db = SQLAlchemy(app)

@app.route('/')
def test_db():
    result = db.session.execute('SELECT 1')
    return f"Database connection successful: {result}"

if __name__ == '__main__':
    app.run(debug=True)
