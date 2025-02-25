const GenderRadio = () => {
  return (
    <div className="flex flex-col gap-2">
      <label className="label">
        <span className="label-text uppercase">
          Gender <span className="text-red-500">*</span>
        </span>
      </label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="gender" value="male" className="radio" required />
          <span>Male</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="gender" value="female" className="radio" required />
          <span>Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderRadio;
