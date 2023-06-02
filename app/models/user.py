from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.schema import ForeignKey
from flask_login import UserMixin
# from .style import Style
# from .song import Song
# from .album import Album
from .like import likes



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(255))
    alias = db.Column(db.String(40))
    profile_image = db.Column(db.String(40))
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    style_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('styles.id')))

    style = db.relationship('Style', back_populates='owners')

    songs = db.relationship('Song', back_populates='owner', cascade="all, delete-orphan")
    albums = db.relationship('Album', back_populates='owner', cascade="all, delete-orphan")
    # playlists = db.relationship('Playlist', back_populates='owner')


    song_likes = db.relationship('Song', secondary=likes, back_populates='user_likes')




    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'alias': self.alias,
            'bio': self.bio,
            'profileImage': self.profile_image,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'styleId': self.style_id,
            # 'likes': self.user_likes
        }
