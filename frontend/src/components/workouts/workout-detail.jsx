import React, { useState, useEffect } from 'react';
import {
  Segment,
  Form,
  Search,
  Icon,
  Label,
  Image,
  Header,
  Button,
  Confirm,
  Divider,
} from 'semantic-ui-react';
import WorkoutSets from './workout-sets';
import { useParams, useHistory, Link } from 'react-router-dom';
import messageService from '../../services/message.service';
import { useForm, useFieldArray } from 'react-hook-form';
import { debounce } from 'lodash';
import { useService } from '../../services/use-service';

export default function WorkoutDetail() {
  const [workout, setWorkout] = useState({});
  const [loading, setLoading] = useState({ component: false, search: false });
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { workoutService, exerciseService } = useService();
  const { id } = useParams();
  const history = useHistory();

  const { control, register, handleSubmit, reset, errors } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
    keyName: 'key',
  });

  const OnSubmit = ({ exercises }) => {
    setLoading(prev => ({ ...prev, component: true }));
    workoutService
      .update({ id, exercises })
      .then(updatedWorkout => {
        setLoading(prev => ({ ...prev, component: false }));
        messageService.success('Workout Updated!');
      })
      .catch(error => {
        setLoading(prev => ({ ...prev, component: false }));
        messageService.error('Something went wrong!');
      });
  };

  useEffect(() => {
    setLoading(prev => ({ ...prev, component: true }));
    workoutService
      .getById(id)
      .then(workout => {
        setLoading(prev => ({ ...prev, component: false }));
        setWorkout(workout);
        reset(workout);
      })
      .catch(error => {
        console.log(error);
        messageService.error('Sorry that workout does not exist!');
        history.push('/');
      });
  }, [id, history, reset]);

  const handleSearchChange = (e, { value }) => {
    setLoading(prev => ({ ...prev, search: true }));
    setQuery(value);
    exerciseService.getByFilter({ searchName: value }).then(exercises => {
      setLoading(prev => ({ ...prev, search: false }));
      const mappedExercises = exercises.map(exercise => {
        return {
          title: exercise.name,
          comment: exercise.comment,
          image: exercise.image,
          id: exercise.id,
        };
      });
      setSearchResults(mappedExercises);
    });
  };

  const resultRenderer = ({ title }) => <Label content={title} />;

  const handleResultSelect = (e, { result }) => {
    setQuery('');
    append({
      name: result.title,
      id: result.id,
      image: result.image,
      comment: result.comment,
    });
  };

  const triggerConfirm = () => {
    setOpen(true);
  };

  const onConfirm = () => {
    workoutService.remove(id).then(() => {
      messageService.success('Workout removed!');
      history.push('/workouts');
    });
  };
  const closeConfirm = () => {
    setOpen(false);
  };

  return (
    <Segment padded className='workout-detail' loading={loading.component}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Header size='huge'>{workout.name}</Header>
        <div>
          <Button size='small' circular onClick={triggerConfirm} primary icon>
            <Icon name='trash' />
          </Button>
        </div>
      </div>
      <br />
      <Search
        placeholder='Add Exercise'
        loading={loading.search}
        onSearchChange={debounce(handleSearchChange, 3000, { leading: true })}
        onResultSelect={handleResultSelect}
        results={searchResults}
        resultRenderer={resultRenderer}
        value={query}
      />
      <br />
      <Divider />
      <Form onSubmit={handleSubmit(OnSubmit)}>
        {fields.map((field, index) => (
          <Form.Field key={field.key}>
            <Form.Button
              icon
              circular
              floated='right'
              type='button'
              onClick={() => remove(index)}>
              <Icon name='minus' /> Remove Exercise
            </Form.Button>
            <input
              name={`exercises[${index}].name`}
              hidden
              ref={register()}
              defaultValue={field.name}
            />
            <input
              name={`exercises[${index}].id`}
              hidden
              ref={register()}
              defaultValue={field.id}
            />
            <input
              name={`exercises[${index}].image`}
              hidden
              ref={register()}
              defaultValue={field.image}
            />
            <input
              name={`exercises[${index}].comment`}
              hidden
              ref={register()}
              defaultValue={field.comment}
            />
            <Header as={Link} to={`/exercises/${field.id}`} size='large'>
              {field.image && <Image avatar src={field.image} />}
              {field.name}
            </Header>
            <WorkoutSets nestIndex={index} {...{ control, register, errors }} />
          </Form.Field>
        ))}
        <Divider />
        <Form.Button floated='right' primary>
          Update
        </Form.Button>
      </Form>
      <Confirm
        content='Are you sure you want to delete this workout?'
        open={open}
        confirmButton='Delete'
        onCancel={closeConfirm}
        onConfirm={onConfirm}
      />
    </Segment>
  );
}
