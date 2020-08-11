import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ user, logout }) {
  return (
    <Menu stackable fixed='top'>
      <Menu.Item header>TheBestWorkOutAppEver</Menu.Item>
      <Menu.Item exact name='home' as={NavLink} to='/' />
      {user && (
        <>
          <Menu.Item exact name='exercises' as={NavLink} to='/exercises' />
          <Menu.Item exact name='workouts' as={NavLink} to='/workouts' />
          <Menu.Item>
            <Button primary as={Link} to='/workouts/new'>
              Add Workout
            </Button>
          </Menu.Item>
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
