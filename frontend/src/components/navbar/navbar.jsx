import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../services/use-auth';
import { useService } from '../../services/use-service';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { messageService } = useService();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    messageService.success(
      `${user?.firstName} has logged out. Come back soon!`
    );
    history.push('/');
  };
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
          <Menu.Item name='logout' onClick={handleLogout} />
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
