Move any element

## Use

```js
import useMovebox from 'react-movebox'

const App = () => {
  const [refs, state] = useMovebox({
    defaultStyle: false, // optional
   boundary: { // optional
      width: 500,
      height: 500
   },
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

```


## Arguments

```js
const Args = {
   defaultStyle?: boolean;
   boundary?: {
      width: number;
      height: number;
   };
   start?: (state: StateProps) => void;
   end?: (state: StateProps) => void;
   moving?: (state: StateProps) => void;
}

```

## State Props
```js

const StateProps = {
   pos: {
      left: number,
      top: number
   },
   initX: number,
   initY: number,
   height: number,
   width: number,
   isMouseDown: boolean,
}

```



## Refs

```
refs = {
  boxRef: any,
  handlerRef: any,
  boundaryRef: any
}

```