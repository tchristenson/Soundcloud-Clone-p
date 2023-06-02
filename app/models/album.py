from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
# from .user import User
# from .style import Style
# from .song import Song


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(50), nullable=False)
    # total_runtime = db.Column(db.String)  #Undecided on datatype. Date, datetime, integer?
    style_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('styles.id')))
    cover_image = db.Column(db.String)

    owner = db.relationship('User', back_populates='albums')
    style = db.relationship('Style', back_populates='albums')

    songs = db.relationship('Song', back_populates='album')



    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            # 'totalRuntime': self.total_runtime,
            'styleId': self.style_id,
            'coverImage': self.cover_image

        }
