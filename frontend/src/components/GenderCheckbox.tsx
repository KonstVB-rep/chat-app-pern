const GenderCheckbox = () => {
	return (
		<div className='flex gap-2'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text uppercase text-sm'>Male</span>
					<input type='checkbox' className='checkbox border-[2px] rounded-xs' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text uppercase text-sm'>Female</span>
					<input type='checkbox' className='checkbox border-[2px] rounded-xs' />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
