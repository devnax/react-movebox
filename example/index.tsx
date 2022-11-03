import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useMoveable from '../.';

const App = () => {
  const [state, ref] = useMoveable({
    start: (s) => {
      console.log(s);
    },
    moving: (s) => {
      console.log(state);
    },
    end: (s) => {
      console.log(s);
    },
  })
  
  return (
    <div
      ref={ref}
      style={{
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: "red",
        position: "fixed"
      }}
    >
      
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
