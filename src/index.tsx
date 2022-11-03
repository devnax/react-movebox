import {  useId, useEffect, useRef, useMemo } from 'react'
import { StateProps, useMoveboxProps, useMoveboxReturn } from './types'

export * from './types'

let defState = {
  pos: {
    left: 0,
    top: 0
  },
  initX: 0,
  initY: 0,
  height: 0,
  width: 0,
  isMouseDown: false
}


const Factory = new Map<string, StateProps>()

const useMovebox = (props?: useMoveboxProps): useMoveboxReturn => {

  const id = useId()
  const boxRef: any = useRef()
  const handlerRef: any = useRef()
  const boundaryRef: any = useRef()
  useMemo(() => Factory.set(id, defState), [])

  const handleDown = (e: any) => {
    if (!boxRef.current) return
    const state = Factory.get(id)
    const s = {
      ...state,
      isMouseDown: true,
      initX: e.offsetX,
      initY: e.offsetY,
      height: boxRef.current.offsetHeight,
      width: boxRef.current.offsetWidth,
    }
    Factory.set(id, s as StateProps)
    props?.start && props.start(s as StateProps)
  }

  const moving = (e: any) => {
    const state = Factory.get(id)
    if (state?.isMouseDown) {
      if (handlerRef.current) {
        if (!handlerRef.current.contains(e.target)) {
          Factory.set(id, {...Factory.get(id), isMouseDown: false} as StateProps)
          return;
        }
      }

      var cx = e.clientX - state.initX,
        cy = e.clientY - state.initY;
      if (cx < 0) {
        cx = 0;
      }
      if (cy < 0) {
        cy = 0;
      }
      if (window.innerWidth - e.clientX + state.initX < state.width) {
        cx = window.innerWidth - state.width;
      }
      if (e.clientY > window.innerHeight - state.height + state.initY) {
        cy = window.innerHeight - state.height;
      }


      if(props?.boundary){
        cx = cx <= (props.boundary.width - state.width) ? cx : (props.boundary.width - state.width)
        cy = cy <= (props.boundary.height - state.height) ? cy : (props.boundary.height - state.height)
      }else if(boundaryRef.current){
        const bnd = boundaryRef.current.getBoundingClientRect()
        
        if(cy < bnd.top){
          cy = bnd.top
        }else if(cy > (bnd.bottom - state.height)){
          cy = bnd.bottom - state.height
        }
        
        if(cx < bnd.left){
          cx = bnd.left
        }else if(cx > (bnd.right - state.width)){
          cx = bnd.right - state.width
        }
      }

      Factory.set(id, {
        ...state, 
        pos: {
          left: cx,
          top: cy
        }
      })
      
      if(props?.defaultStyle !== false){
        boxRef.current.style.left = cx + "px";
        boxRef.current.style.top = cy + "px";
      }
      
      props?.moving && props.moving({
        ...state, pos: {
          left: cx,
          top: cy
        }
      })
    }
  }

  const up = () => {
    const s = {
      ...Factory.get(id),
      isMouseDown: false
    }
    Factory.set(id, s as StateProps)
    props?.end && props.end(s as StateProps)
  }

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.addEventListener("mousedown", handleDown);
      boxRef.current.addEventListener("mouseup", up);
      document.addEventListener("mousemove", moving);
    }

    return () => {
      Factory.delete(id)
      document.removeEventListener("mousemove", moving)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [{
    boxRef,
    handlerRef,
    boundaryRef
  }
, Factory.get(id) as StateProps
] as useMoveboxReturn
}


export default useMovebox