import React, { useEffect } from 'react'

type useKeyDownProps ={
  key: string,
  state: boolean
  action: () => void
}

const useKeyDown = ({key, state, action} : useKeyDownProps) => {

const ref = React.useRef<typeof action>(action);


 useEffect(() => {

  const controller =  new AbortController();

  if(!state) return;

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === key) {
      ref.current();
    }
  }

  document.addEventListener('keydown', handleKeyDown, {
    signal: controller.signal
  });

  return () => controller.abort();
   
 }, [key, state])
}

export default useKeyDown