from .db import db, environment, SCHEMA
# from .user import User
# from .song import Song
# from .album import Album



class Style(db.Model):
    __tablename__ = 'styles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String(30), nullable=False)

    owners = db.relationship('User', back_populates='style')
    songs = db.relationship('Song', back_populates='style')
    albums = db.relationship('Album', back_populates='style')

    def to_dict(self):
        return {
            'id': self.id,
            'genre': self.genre
        }
