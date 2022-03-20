import styles from './App.module.scss'
import { useState, useEffect } from 'react'

function App() {
	const [options, setOptions] = useState({
		rangeValue: 20,
		letters: true,
		lettersSize: true,
		specialCharacters: true,
		numbers: true,
	})

	const generator = () => {
		let chars = ''

		const allLetters = 'abcdefghijklmnopqrstuvwxyz'
		const allBigLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		const allSpecialCharacters = '!@#$%^&*?_-+'
		const allNumbers = '0123456789'

		if (options.numbers) chars += chars.concat(allNumbers)
		if (options.specialCharacters) chars += chars.concat(allSpecialCharacters)
		if (options.letters) chars += chars.concat(allLetters)
		if (options.lettersSize) chars += chars.concat(allBigLetters)

		let passwordLength = options.rangeValue
		const generatedPass = document.getElementById('generatedPass')
		const passPower = document.getElementById('passPower')
		let password = ''
		if (passwordLength < 6) {
			passPower.textContent = 'bad password'
			passPower.style.color = '#cd412c'
		} else if (passwordLength < 11) {
			passPower.textContent = 'weak password'
			passPower.style.color = '#f77e55'
		} else {
			passPower.textContent = 'strong password'
			passPower.style.color = '#59a958'
		}

		for (let i = 0; i < passwordLength; i++) {
			const randomNumber = Math.floor(Math.random() * chars.length)
			password += chars.substring(randomNumber, randomNumber + 1)
		}

		generatedPass.value = password
	}

	useEffect(() => {
		generator()
	})

	const handleClick = () => {
		generator()
	}

	const handleCopyClick = e => {
		navigator.clipboard.writeText(
			document.getElementById('generatedPass').value
		)
		e.target.textContent = 'COPIED'
		setTimeout(() => {
			document.getElementById('copy').textContent = 'COPY'
		}, 900)
	}

	const handleCHangeRange = e => {
		const type = e.target.type
		const name = e.target.name

		if (type === 'range') {
			const value = e.target.value
			setOptions({
				...options,
				rangeValue: value,
			})
		} else if (type === 'checkbox' && name === 'letters') {
			setOptions({
				...options,
				letters: !options.letters,
			})
			if (options.lettersSize)
				setOptions({
					...options,
					lettersSize: false,
					letters: false,
				})

			if (
				!options.numbers &&
				!options.lettersSize &&
				!options.specialCharacters
			) {
				setOptions({
					...options,
					letters: true,
				})
				return
			}

			if (
				options.letters &&
				options.lettersSize &&
				!options.specialCharacters &&
				!options.numbers
			) {
				setOptions({
					...options,
					letters: true,
					lettersSize: true,
				})
				return
			}

			if (
				options.letters &&
				!options.lettersSize &&
				options.specialCharacters &&
				!options.numbers
			) {
				setOptions({
					...options,
					letters: true,
				})
				return
			}

			if (
				options.letters &&
				options.lettersSize &&
				options.specialCharacters &&
				!options.numbers
			) {
				setOptions({
					...options,
					letters: true,
					lettersSize: true,
				})
				return
			}
		} else if (type === 'checkbox' && name === 'lettersSize') {
			setOptions({
				...options,
				lettersSize: !options.lettersSize,
			})

			if (!options.letters)
				setOptions({
					...options,
					letters: !options.letters,
					lettersSize: !options.lettersSize,
				})

			if (
				!options.letters &&
				options.lettersSize &&
				!options.specialCharacters &&
				!options.numbers
			)
				setOptions({
					...options,
					letters: true,
				})
		} else if (type === 'checkbox' && name === 'specialCharacters') {
			setOptions({
				...options,
				specialCharacters: !options.specialCharacters,
			})

			if (
				!options.letters &&
				!options.lettersSize &&
				options.specialCharacters &&
				!options.numbers
			) {
				setOptions({
					...options,
					letters: true,
				})
			}
		} else if (type === 'checkbox' && name === 'numbers') {
			setOptions({
				...options,
				numbers: !options.numbers,
			})


			if (
				!options.letters &&
				!options.lettersSize &&
				!options.specialCharacters
			)
				setOptions({
					...options,
					letters: true,
					numbers: !options.numbers,
				})
		}

		generator()
	}

	return (
		<>
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
					onChange={handleCHangeRange}
					onClick={console.log('asdf')}
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
							onChange={handleCHangeRange}
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
							onChange={handleCHangeRange}
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
							onChange={handleCHangeRange}
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
							onChange={handleCHangeRange}
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
						If you can, do not use the same password more than once. If you
						must, at least set up two-step verification. If there is a data leak
						on one of the sites you logged on to, someone who has it can easily
						log into your other account with the same password and email
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
		</>
	)
}

export default App
