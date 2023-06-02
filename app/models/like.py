from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
# from .user import User
# from .song import Song

likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('songs', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
)

if environment == "production":
    likes.schema = SCHEMA


# class Like(db.Model):
#     __tablename__ = 'likes'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
#     song_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('songs.id')))

#     owner = db.relationship('User', back_populates='likes')
#     song = db.relationship('Song', back_populates='likes')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'ownerId': self.owner_id,
#             'songId': self.song_id
#         }
