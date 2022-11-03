import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useMoveable from '../.';

const App = () => {
  const [refs, state] = useMoveable({
    
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
      ref={refs.boundaryRef}
      style={{
        width: 500,
        height: 500,
        background: "green",
        marginLeft: 100,
        marginTop: 100
      }}
    >
      <div
      ref={refs.boxRef}
      style={{
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: "red",
        position: "fixed",
        zIndex: 9999
      }}
    >
      
    </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

