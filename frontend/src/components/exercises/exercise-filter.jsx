import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { isEqual } from 'lodash';
import { useService } from '../../services/use-service';

export default function ExerciseFilter({ setFilter, defaultValues }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const { register, handleSubmit, setValue } = useForm({ defaultValues });
  const { exerciseService } = useService();

  useEffect(() => {
    register({ name: 'searchName' });
    register({ name: 'category' });
    register({ name: 'equipment' });
    register({ name: 'muscle' });
    const allOption = [{ key: 0, value: 0, text: 'All' }];
    setLoading(true);
    Promise.all([
      exerciseService.categories(),
      exerciseService.equipment(),
      exerciseService.muscles(),
    ])
      .then(([categories, equipment, muscles]) => {
        setCategories(allOption.concat(categories));
        setEquipment(allOption.concat(equipment));
        setMuscles(allOption.concat(muscles));
      })
      .finally(() => setLoading(false));
  }, [register, exerciseService]);

  const OnSubmit = filter => {
    setFilter(prevFilter =>
      isEqual(prevFilter, filter) ? prevFilter : filter
    );
  };

  const submit = handleSubmit(OnSubmit);

  const OnChange = (e, { name, value }) => {
    setValue(name, value);
    submit(e);
  };

  return (
    <Form>
      <Form.Group inline>
        <Form.Field>
          <label>Search:</label>
          <Form.Input
            defaultValue={defaultValues.search}
            name='searchName'
            placeholder='Search...'
            onChange={OnChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Category:</label>
          <Form.Select
            defaultValue={defaultValues.category}
            name='category'
            options={categories}
            onChange={OnChange}
            loading={loading}
          />
        </Form.Field>
        <Form.Field>
          <label>Equipment:</label>
          <Form.Select
            defaultValue={defaultValues.equipment}
            name='equipment'
            options={equipment}
            onChange={OnChange}
            loading={loading}
          />
        </Form.Field>
        <Form.Field>
          <label>Muscle:</label>
          <Form.Select
            defaultValue={defaultValues.muscle}
            name='muscle'
            options={muscles}
            onChange={OnChange}
            loading={loading}
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
}
