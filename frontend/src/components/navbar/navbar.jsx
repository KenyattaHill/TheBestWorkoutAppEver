import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ user, setUser, logout }) {
  return (
    <Menu>
      <Menu.Item exact name='home' as={NavLink} to='/' />
      {user && (
        <>
          <Menu.Item exact name='exercises' as={NavLink} to='/exercises' />
          <Menu.Item exact name='workouts' as={NavLink} to='/workouts' />
        </>
      )}
      <Menu.Menu position='right'>
        {user ? (
          <Menu.Item name='logout' onClick={logout} />
        ) : (
          <>
            <Menu.Item name='signIn' as={NavLink} to='/signIn' />
            <Menu.Item name='signUp' as={NavLink} to='/signUp' />
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
}
