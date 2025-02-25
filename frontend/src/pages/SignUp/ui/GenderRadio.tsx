const GenderRadio = () => {
  return (
    <div className="flex gap-2">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text uppercase text-sm">Male</span>
          <input
            type="radio"
            name="gender"
            className="radio bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600 border-[2px]"
            defaultValue={"male"}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text uppercase text-sm">Female</span>
          <input
            type="radio"
            name="gender"
            className="radio bg-pink-100 border-pink-300 checked:bg-pink-200 checked:text-pink-600 checked:border-pink-400 border-[2px]"
            defaultValue={"female"}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderRadio;
