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


export interface useMoveboxProps {
   defaultStyle?: boolean;
   boundary?: {
      width: number;
      height: number;
   };
   start?: (state: StateProps) => void;
   end?: (state: StateProps) => void;
   moving?: (state: StateProps) => void;
}


export type useMoveboxReturn = [
   {
      boxRef: any,
      handlerRef: any,
      boundaryRef: any
   },
   StateProps
]