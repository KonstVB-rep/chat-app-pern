
const GenderRadio = () => {
  return (
    <div className="flex gap-2">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text uppercase text-sm">Male</span>
          <input
            type="radio"
            name="gender"
            className="checkbox border-[2px] rounded-xs"
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
            className="checkbox border-[2px] rounded-xs"
            defaultValue={"female"}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderRadio;
