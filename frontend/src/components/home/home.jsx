import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';

export default function Home() {
  const quotes = [
    '"Never do tomorrow what you can do today. Procrastination is the thief of time." – Charles Dickens',
    '“There are far, far better things ahead than any we leave behind.”– CS Lewis',
    '“Your body can stand almost anything. It’s your mind that you have to convince.”',
    '“Success isn’t always about greatness. It’s about consistency. Consistent hard work gains success. Greatness will come.”',
    '“Suck it up. And one day you won’t have to suck it in.”',
  ];
  const getRandomQuote = array => array[Math.ceil(Math.random() * array.length -1)] 
  const [quote, setQuote] = useState(getRandomQuote(quotes))
  
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote(quotes))
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [quotes])

  return (
    <Segment padded className='home'>
      <h1>Welcome to the Best Workout App Ever</h1>

      <h2>Goals</h2>
      <p>
        When setting fitness goals, your goals should be specific and
        challenging. Studies have proven that setting specific goals will result
        in better performance.
      </p>
      <h2>Tools</h2>
      <p>
        We have wide variety of exercises for every body part for you to build to perfect workout.
      </p>

      <h2>Inspiration</h2>
      <p>{quote}</p>
    </Segment>
  );
}
