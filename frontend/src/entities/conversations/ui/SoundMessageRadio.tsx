import { Pause, Play } from "lucide-react";
import React from "react";

const SoundMessageRadio = ({
  id,
  sound,
  numSound,
}: {
  id: string;
  sound: string;
  numSound: number;
}) => {
  const [play, setPlay] = React.useState(false);

  const handlePlaySound = (soundUrl: string) => {
    if (play) return; // Если уже играет — не запускаем снова

    const soundMes = new Audio(soundUrl);
    const onEnded = () => {
      setPlay(false);
      soundMes.removeEventListener("ended", onEnded);
    };

    soundMes.addEventListener("ended", onEnded);

    setPlay(true);
    soundMes.play();
  };
  return (
    <div className="flex bg-zinc-800 items-center justify-between gap-4 px-2 py-1 border-1 border-gray-500 rounded-md">
      <label>
        <input
          type="radio"
          name="sound-message"
          onChange={() => {
            localStorage.setItem(id, JSON.stringify(sound));
          }}
          className="radio radio-sm"
          defaultChecked={numSound === 1}
        />
      </label>
      <div className="flex items-center justify-center gap-1">
        Sign-{numSound}
        <button
          className={`hover:bg-white rounded-md p-1 hover:text-zinc-800 flex ${
            play ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            handlePlaySound(sound);
          }}
          disabled={play} // Запрет на повторное нажатие
          title="Play sound"
          aria-label="Play sound"
        >
          <span className="flex gap-1">{play ? <Pause size={20}/> : <Play size={20}/>}</span>
        </button>
      </div>
    </div>
  );
};

export default SoundMessageRadio;
