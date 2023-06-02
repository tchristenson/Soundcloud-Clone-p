from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Album
from app.api.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS

def album_exists(form, field):
    new_album_name = field.data
    album = Album.query.filter(Album.name == new_album_name).first()
    if album:
        raise ValidationError('This album already exists!')

class EditAlbum(FlaskForm):
    name = StringField("Album Name", validators=[DataRequired()])
    style_id = SelectField("Style", validators=[DataRequired()], choices=[(1, "Reggae"), (2, "Rock"),
                                          (3, "Punk"), (4, "Pop"),
                                          (5, "Electronic"), (6, "Jazz"), (7, "Blues"),
                                          (8, "Country"), (9, "Metal"), (10, "Folk"),
                                          (11, "Funk"), (12, "Soul"),
                                          (13, "Classical")])
