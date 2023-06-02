from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy import PickleType
from sqlalchemy.schema import ForeignKey
# from .user import User
# from .album import Album
# from .style import Style
from .like import likes


class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    album_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('albums.id')), nullable=True)
    name = db.Column(db.String(50), nullable=False)
    style_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('styles.id')))
    cover_image = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    # playlist_id = db.Column(db.PickleType(), ForeignKey(add_prefix_for_prod('playlists.id')))
    # runtime = db.Column(db.String) # Undecided on datatype. Date, datetime, or integer?

    owner = db.relationship('User', back_populates='songs')
    album = db.relationship('Album', back_populates='songs')
    # playlist = db.relationship('Playlist', back_populates='songs')
    style = db.relationship('Style', back_populates='songs')

    user_likes = db.relationship('User', secondary=likes, back_populates='song_likes')

    def to_dict(self):
        data = {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'styleId': self.style_id,
            # 'runtime': self.runtime,
            'coverImage': self.cover_image,
            'content': self.content,
            'likes': len(self.user_likes)
        }

        if self.album_id:
            data['albumId'] = self.album_id
        else:
            data['albumId'] = None

        # if self.playlist_id:
        #     data['playlistId'] = self.playlist_id
        # else:
        #     data['playlistId'] = None


        return data
