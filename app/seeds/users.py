from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio='demo makes music', alias='MLK', profile_image="https://i.imgur.com/LcmtbtF.jpg", first_name='Martin', last_name='King', style_id=3)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', bio='demo makes bad music', alias='Demorgan2', profile_image="https://i.imgur.com/8LubJIO.jpg", first_name='Joe', last_name='Dirt', style_id=2)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', bio='demo makes good music', alias='Demorgan3', profile_image="https://i.imgur.com/l8ksKek.jpg", first_name='trailer', last_name='Park_Boys', style_id=1)
    demo_2 = User(
        username='DemoUser', email='Demo@demo.com', password='password', bio='mediocre bongo player', alias='Demo_lition', profile_image="https://i.imgur.com/dKGrAFb.jpg", first_name='Dem', last_name='moooooooo', style_id=5)


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(demo_2)
    db.session.commit()

    all_users = [demo, marnie, bobbie, demo_2]
    return all_users

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
