import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-bar'>
			<li className='website-title'>
				<NavLink className="website-title" exact to="/">Vibillow</NavLink>
			</li>
			{isLoaded && (
				<li className='rightNav'>
					<NavLink className='allNav' exact to="/albums">Albums</NavLink> {" "}
					<NavLink className='allNav' exact to="/songs">Songs</NavLink>
					<ProfileButton  user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
