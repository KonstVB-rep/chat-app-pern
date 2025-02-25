import { useEffect, useRef } from 'react'

type useOutsidePushProps = {
    ref: React.RefObject<HTMLDivElement | null>;
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const useOutsideClick = ({ref, state, setState} : useOutsidePushProps) => {
    const stateRef = useRef<typeof setState>(setState);

    useEffect(() => {
        if(!state) return;

        const controller =  new AbortController();
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                stateRef.current(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside, {signal: controller.signal});
        return () => controller.abort();
    }, [ref, state])
}

export default useOutsideClick