from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text


def seed_albums():
    Dream = Album(
        name="Dream", owner_id=1, style_id=3, cover_image="https://i.imgur.com/LcmtbtF.jpg"
    )
    album2 = Album(
        name="album2", owner_id=2, style_id=2, cover_image="https://i.imgur.com/hKimbER.jpg"
    )
    album3 = Album(
        name="album3", owner_id=3, style_id=3, cover_image="https://i.imgur.com/gXC0USv.jpg"
    )
    album4 = Album(
        name="album4", owner_id=2, style_id=4, cover_image="https://i.imgur.com/fywlFjC.jpg"
    )
    album5 = Album(
        name="album5", owner_id=1, style_id=5, cover_image="https://i.imgur.com/WulZkLi.jpg"
    )

    db.session.add(Dream)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
