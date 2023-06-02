from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Song
from app.api.aws_song_helpers import ALLOWED_SONG_EXTENSIONS
from app.api.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS


# def user_doesnt_exist(form, field):
#     username = field.data
#     user = User.query.filter(User.username != username).first()
#     if user:
#         raise ValidationError('Must be signed in to create a song!')

def song_exists(form, field):
    new_song_name = field.data
    song = Song.query.filter(Song.name == new_song_name).first()
    if song:
        raise ValidationError('This song already exists!')

class NewSong(FlaskForm):
    name = StringField("Song Name", validators=[DataRequired()])
    # runtime = StringField("Run Time")
    cover_image = FileField("Cover Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_IMAGE_EXTENSIONS))])
    content = FileField("Content", validators=[FileRequired(), FileAllowed(list(ALLOWED_SONG_EXTENSIONS))])
    album_id = SelectField("Album", choices=[], validate_choice=False)
    style_id = SelectField("Style", validators=[DataRequired()], choices=[(1, "Reggae"), (2, "Rock"),
                                          (3, "Punk"), (4, "Pop"),
                                          (5, "Electronic"), (6, "Jazz"), (7, "Blues"),
                                          (8, "Country"), (9, "Metal"), (10, "Folk"),
                                          (11, "Funk"), (12, "Soul"),
                                          (13, "Classical")])
