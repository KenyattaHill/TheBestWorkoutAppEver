import React from 'react';
import { List, Loader, Image } from 'semantic-ui-react';

export default function ExerciseList({ loading, exercises }) {
  const listItems = exercises.map(({ name, image, equipment }) => {
    return (
      <List.Item>
        <Image src={image} size='tiny' inline />
        <List.Content>
          <List.Header>{name}</List.Header>
          <List.Description>
            {equipment.map(({ name }) => name).join(', ')}
          </List.Description>
        </List.Content>
      </List.Item>
    );
  });
  return loading ? (
    <Loader active />
  ) : exercises.length > 0 ? (
    <>
      <List size='small' selection>
        {listItems}
      </List>
    </>
  ) : (
    <p>No Data...</p>
  );
}
