from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_email(form, field):
# Checking if username is already in use
    email = field.data
    email_error = '@' not in email
    if email_error:
        raise ValidationError('Email is not valid.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired()])
    alias = StringField('alias')
    bio = StringField('bio')
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    style_id = IntegerField('style')
    profile_image = StringField('profile_picture')
