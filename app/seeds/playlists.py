# from app.models import db, Playlist, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_playlists():
#     playlist1 = Playlist(
#         name="playlist one: user 1", owner_id=1
#     )
#     playlist2 = Playlist(
#         name="playlist two: user 1", owner_id=1
#     )
#     playlist3 = Playlist(
#         name="playlist three: user 1", owner_id=1
#     )
#     playlist4 = Playlist(
#         name="playlist one: user 2", owner_id=2
#     )
#     playlist5 = Playlist(
#         name="playlist two: user 2", owner_id=2
#     )
#     playlist6 = Playlist(
#         name="playlist one: user 3", owner_id=3
#     )

#     db.session.add(playlist1)
#     db.session.add(playlist2)
#     db.session.add(playlist3)
#     db.session.add(playlist4)
#     db.session.add(playlist5)
#     db.session.add(playlist6)
#     db.session.commit()

# def undo_playlists():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM playlists"))

#     db.session.commit()
