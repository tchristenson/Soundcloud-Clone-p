import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getAllUsersThunk } from "../../store/users";
import './UserSearchPage.css'


function UserSearchPage() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("")

    useEffect(() => {
      dispatch(getAllUsersThunk());
    }, [dispatch]);

    const users = useSelector((state) => Object.values(state.users));

    if(!users) {
        return null
    }

    return (
        <div id="UserSearchPage">
            <h1>Find Artist By Artist Name</h1>
        <input id="searchBar" placeholder="Enter Artist Alias" onChange={event => setQuery(event.target.value)}/>
        {users?.filter(user => {
            if (query === '') {
              return user;
          } else if (user?.alias.toLowerCase().includes(query.toLocaleLowerCase())) {
              return user
          } else if (user?.firstName.toLowerCase().includes(query.toLocaleLowerCase())) {
              return user
          } else if (user?.lastName.toLowerCase().includes(query.toLocaleLowerCase())) {
            return user
        }
        }).map(({alias, profileImage, id, firstName, lastName})=>(
          <NavLink to={`/users/${id}`} key={id}>
            <div className="user-div">
              <div className="user-picture-div">
                <img className="user-picture" src={profileImage}/>
              </div>

              <div>
                <div className="playlogo"></div>
                <div className="user-name">Artist name: {alias}</div>
                <div>{firstName} ,{lastName}</div>
                {/* <div>album alias? album id: {albumId}</div> */}
              </div>
            </div>
          </NavLink>
        ))}
          </div>
    )

}

export default UserSearchPage;
