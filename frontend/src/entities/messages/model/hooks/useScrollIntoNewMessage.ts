import { useEffect, useRef } from 'react'

const useScrollIntoNewMessage = (dep:unknown) => {

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if(ref.current){
                ref.current.scrollTop = ref.current.scrollHeight;
            }
        }, 100)
      }, [dep]);


  return ref
}

export default useScrollIntoNewMessage