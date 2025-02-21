const GenderCheckbox = () => {
	return (
		<div className='flex gap-2'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input type='checkbox' className='checkbox border-slate-900 border-[2px]' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' className='checkbox border-slate-900 border-[2px]' />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
