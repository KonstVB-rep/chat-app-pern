import { sounds } from "@/entities/messages/model/soundMessage";
import { Music2, X } from "lucide-react";
import React, { useRef } from "react";
import SoundMessageRadio from "./SoundMessageRadio";
import useOutsideClick from "@/shared/model/hooks/useOutsidePush";
import useKeyDown from "@/shared/model/hooks/useKeyDown";

const CheckedSoundMessage = ({ id }: { id: string }) => {
  const [isShow, setIsShow] = React.useState(false);

  const ref = useRef<HTMLDivElement | null>(null)

  useOutsideClick({ ref, state: isShow, setState: setIsShow });
  useKeyDown({ key: "Escape", state: isShow, action: () => setIsShow(false) });

  return (
    <div
      className="relative flex items-center justify-center"
      role="button"
      aria-label="Select the message sound"
      title="Select the message sound"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsShow((prev) => !prev);
        }}
        title="Select the message sound from chat"
        aria-label="Select the message sound from chat"
        className="cursor-pointer p-2 transition-all duration-300 rounded-md border-2 border-gray-400 hover:border-gray-100 hover:bg-zinc-700 hover:scale-110 active:scale-90 active:border-gray-100 active:bg-zinc-700"
      >
       {isShow ? <X/> : <Music2 />}
      </button>
      {isShow && (
        <div className="absolute w-max top-[110%] right-0 z-10 bg-zinc-400 text-white rounded-lg px-2 py-1" ref={ref}>
          {sounds.map((sound, index) => (
            <SoundMessageRadio id={id} numSound={index +1 } sound={sound} key={index}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckedSoundMessage;
