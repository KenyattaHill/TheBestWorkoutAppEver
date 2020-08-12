import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function ExerciseList({ exercises }) {
  const history = useHistory();

  const onItemClick = (_, { id }) => {
    history.push('/exercises/' + id);
  };

  const listItems = exercises.map(({ id, name, image, equipment }) => {
    return (
      <List.Item key={id} id={id} onClick={onItemClick}>
        <Image src={image} avatar />
        <List.Content>
          <List.Header>{name}</List.Header>
          <List.Description>
            {equipment.map(({ name }) => name).join(', ')}
          </List.Description>
        </List.Content>
      </List.Item>
    );
  });
  return exercises.length > 0 ? (
    <>
      <List size='huge' selection>
        {listItems}
      </List>
    </>
  ) : (
    <p>No Data...</p>
  );
}
