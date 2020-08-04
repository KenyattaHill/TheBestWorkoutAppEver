import React from 'react';
import { List, Loader, Image, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function ExerciseList({ loading, exercises }) {
  const history = useHistory();

  const onItemClick = (_, {id}) => {
    history.push('/exercises/' + id)
  };

  const selectExercise = (id, name) => (e) => {
    e.stopPropagation();
    alert(`${name} will be selected: ${id}`)
  }
  const listItems = exercises.map(({ id, name, image, equipment }) => {
    return (
      <List.Item key={id} id={id} onClick={onItemClick}>
        <Image src={image} avatar />
        <List.Content verticalAlign='middle'>
          <List.Header>{name}</List.Header>
          <List.Description>
            {equipment.map(({ name }) => name).join(', ')}
          </List.Description>
        </List.Content>
        <List.Content floated='right' verticalAlign='bottom'>
          <Button onClick={selectExercise(id, name)}>Select</Button>
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
