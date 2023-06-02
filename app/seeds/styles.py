from app.models import db, Style, environment, SCHEMA
from sqlalchemy.sql import text

def seed_styles():
    reggae = Style(genre='reggae')
    rock = Style(genre='rock')
    punk = Style(genre='punk')
    pop = Style(genre='pop')
    electronic = Style(genre='electronic')
    jazz = Style(genre='jazz')
    blues = Style(genre='blues')
    country = Style(genre='country')
    metal = Style(genre='metal')
    folk = Style(genre='folk')
    funk = Style(genre='funk')
    soul = Style(genre='soul')
    classical = Style(genre='classical')

    styles_list = [reggae, rock, punk, pop, electronic, jazz, blues, country, metal, folk, funk, soul, classical]

    for style in styles_list:
        db.session.add(style)
        db.session.commit()

def undo_styles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.styles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM styles"))

    db.session.commit()
