import { useState, useId, useEffect, useRef, useMemo } from 'react'
import { StateProps, useDragProps } from './types'

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

const useMovebox = (props?: useDragProps) => {

  const id = useId()
  const ref: any = useRef()
  const handerRef: any = useRef()
  const [, dispatch] = useState(0)
  useMemo(() => Factory.set(id, defState), [])
  const setState = (s: Partial<StateProps>) => {
    Factory.set(id, { ...(Factory.get(id) || {}) as any, ...s })
    dispatch(Math.random())
  }

  const handleDown = (e: any) => {
    if (!ref.current) return
    const state = Factory.get(id)
    const s = {
      ...state,
      isMouseDown: true,
      initX: e.offsetX,
      initY: e.offsetY,
      height: ref.current.offsetHeight,
      width: ref.current.offsetWidth,
    }
    setState(s)
    props?.start && props.start(s as StateProps)
  }

  const moving = (e: any) => {
    const state = Factory.get(id)
    if (state?.isMouseDown) {
      if (handerRef.current) {
        if (!handerRef.current.contains(e.target)) {
          setState({
            ...Factory.get(id),
            isMouseDown: false
          })
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
      ref.current.style.left = cx + "px";
      ref.current.style.top = cy + "px";
      props?.moving && props.moving({
        ...state, pos: {
          left: cx,
          top: cy
        }
      })
    }
  }

  const up = () => {
    const state = Factory.get(id)
    const s = {
      ...state,
      isMouseDown: false,
      pos: {
        left: parseInt(ref.current.style.left.replace("px")),
        top: parseInt(ref.current.style.top.replace("px"))
      }
    }
    setState(s)
    props?.end && props.end(s as StateProps)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousedown", handleDown);
      ref.current.addEventListener("mouseup", up);
      document.addEventListener("mousemove", moving);
    }

    return () => {
      Factory.delete(id)
      document.removeEventListener("mousemove", moving)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [Factory.get(id), ref, handerRef]
}


export default useMovebox