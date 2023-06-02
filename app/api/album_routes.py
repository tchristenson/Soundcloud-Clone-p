from flask import Blueprint, request
from ..models import Album, Style, db
from flask_login import current_user, login_required
from ..forms.album_form import NewAlbum
from ..forms.edit_album_form import EditAlbum
from ..api.aws_image_helpers import get_unique_image_filename, upload_image_file_to_s3


album_routes = Blueprint('albums', __name__)

@album_routes.route('')
def get_all_albums():
    """Query for all albums and return them in a list of dictionaries"""
    albums = Album.query.all()
    return {'Albums': [album.to_dict() for album in albums]}


@album_routes.route('/current')
@login_required
def user_albums():
    """Query for albums owned by the current user"""
    albums = Album.query.filter(Album.owner_id == current_user.id).all()
    return {'Albums': [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>')
def get_album_by_id(id):
    """
    Query for an album by id and returns that album in a dictionary
    """
    album = Album.query.get(id)
    # print('album inside of Get Album by ID route', album)
    return album.to_dict()

@album_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_album(id):
    """
    Handles deletion of an album by its id and owned by current user
    """
    album = Album.query.get(id)
    if album.owner_id == current_user.id:
        db.session.delete(album)
        db.session.commit()
        return 'Delete Successful'
    else:
        return "Must be album owner to delete this album."


@album_routes.route('/new', methods = ['POST'])
@login_required
def add_album():
    """Handles validating submitted data for new posted albums"""

    form = NewAlbum()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print("form.data inside New Album Route ======>>", form.data)

    if form.validate_on_submit():
        # style_name = form.data['style']
        # print("style_name =========>  :", style_name)
        # print("Style.genre =========>  :", Style.genre)
        # style_instance = (Style.query.filter(Style.genre == style_name)).first().to_dict()

        cover_image = form.data["cover_image"]
        cover_image.filename = get_unique_image_filename(cover_image.filename)
        image_upload = upload_image_file_to_s3(cover_image)

        # print("IMAGE UPLOAD DATA HERE =========>  :", image_upload)

        album = Album(name = form.data['name'],
                      owner_id = current_user.id,
                      cover_image = image_upload["url"],
                      style_id = form.data['style_id'])

        db.session.add(album)
        db.session.commit()
        return album.to_dict()

    return { "errors": form.errors}


@album_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_album(id):
    """Handles editing an album's details if the album owner is the logged in user"""
    album = Album.query.get(id)
    if not album:
        return {"error": "Album not found."}

    form = EditAlbum()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print("form.data ======>>", form.data)

    if form.validate_on_submit():
        album.name = form.data['name']
        album.style_id = form.data['style_id']

        db.session.commit()
        return album.to_dict()

    return { "errors": form.errors}
