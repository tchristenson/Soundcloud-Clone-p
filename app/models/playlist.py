# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.schema import ForeignKey


# class Playlist(db.Model):
#     __tablename__ = 'playlists'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
#     name = db.Column(db.String(50), nullable=False)

#     owner = db.relationship('User', back_populates='playlists')
#     songs = db.relationship('Song', back_populates='playlist')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'ownerId': self.owner_id,
#             'name': self.name
#         }
