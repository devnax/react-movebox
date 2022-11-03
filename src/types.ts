export interface StateProps{
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

export interface Position {
   left: number;
   top: number
}


export interface useDragProps {
   start?: (state: StateProps) => void;
   end?: (state: StateProps) => void;
   moving?: (state: StateProps) => void;
}
