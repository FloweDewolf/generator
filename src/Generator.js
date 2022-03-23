import styles from './Generator.module.scss'

const Generator = ({
	handleClick,
	handleCopyClick,
	handleRange,
	handleChange,
  options
}) => (
	<div className={styles.wrapper}>
		<input
			type='text'
			readOnly
			id='generatedPass'
			className={styles.generatedPass}
		></input>
		<p id='passPower' className={styles.passPower}></p>
		<input
			id='range'
			className={styles.range}
			onChange={handleRange}
			defaultValue={options.rangeValue}
			type='range'
			name='range'
			min='4'
			max='25'
		/>
		<div className={styles.checkboxesWrapper}>
			<label className={styles.switch} htmlFor='letters'>
				<p className={styles.switchName}>lowercase</p>
				<input
					onChange={handleChange}
					className={styles.slider}
					type='checkbox'
					name='letters'
					id='letters'
					checked={options.letters}
				/>
				<span className={`${styles.slider} `}></span>
			</label>
			<label className={styles.switch} htmlFor='lettersSize'>
				<p className={styles.switchName}>uppercase</p>
				<input
					onChange={handleChange}
					className={styles.slider}
					type='checkbox'
					name='lettersSize'
					id='lettersSize'
					checked={options.lettersSize}
				/>
				<span className={`${styles.slider} `}></span>
			</label>
			<label className={styles.switch} htmlFor='characters'>
				<p className={styles.switchName}>special</p>
				<input
					onChange={handleChange}
					className={styles.slider}
					type='checkbox'
					name='specialCharacters'
					id='characters'
					checked={options.specialCharacters}
				/>
				<span className={`${styles.slider} ${styles.round}`}></span>
			</label>
			<label className={styles.switch} htmlFor='numbers'>
				<p className={styles.switchName}>digits</p>
				<input
					onChange={handleChange}
					className={styles.slider}
					type='checkbox'
					name='numbers'
					id='numbers'
					checked={options.numbers}
				/>
				<span className={`${styles.slider} ${styles.round}`}></span>
			</label>
		</div>
		<button onClick={handleClick} className={styles.generate}>
			generate
		</button>
		<button id='copy' onClick={handleCopyClick} className={styles.copyBtn}>
			copy
		</button>
		<div className={styles.textContainer}>
			<p className={styles.aboutPass}>
				If you can, do not use the same password more than once. If you must, at
				least set up two-step verification. If there is a data leak on one of
				the sites you logged on to, someone who has it can easily log into your
				other account with the same password and email
			</p>
		</div>
		<a
			target='_blank'
			rel='noreferrer'
			className={styles.link}
			href='https://haveibeenpwned.com/'
		>
			see if you have been pwned
		</a>
	</div>
)

export default Generator