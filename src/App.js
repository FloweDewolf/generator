import { useState, useEffect } from 'react'
import Generator from './Generator'

function App() {
	const [options, setOptions] = useState({
		rangeValue: 20,
		letters: true,
		lettersSize: true,
		specialCharacters: true,
		numbers: true,
	})

	const generator = () => {
		let password = ''
		let chars = ''

		const allLetters = 'abcdefghijklmnopqrstuvwxyz'
		const allBigLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		const allSpecialCharacters = '!@#$%^&*?_-+'
		const allNumbers = '0123456789'

		options.numbers && (chars += chars.concat(allNumbers))

		options.specialCharacters && (chars += chars.concat(allSpecialCharacters))

		options.letters && (chars += chars.concat(allLetters))

		options.lettersSize && (chars += chars.concat(allBigLetters))

		let passwordLength = options.rangeValue
		const generatedPass = document.getElementById('generatedPass')
		const passPower = document.getElementById('passPower')

		const passPowerChange = (() => {
			if (passwordLength < 6) {
				passPower.textContent = 'bad password'
				passPower.style.color = '#cd412c'
				return
			}

			if (passwordLength < 11) {
				passPower.textContent = 'weak password'
				passPower.style.color = '#f77e55'
				return
			}

			passPower.textContent = 'strong password'
			passPower.style.color = '#59a958'
		})()

		for (let i = 0; i < passwordLength; i++) {
			const randomNumber = Math.floor(Math.random() * chars.length)
			password += chars.substring(randomNumber, randomNumber + 1)
		}

		generatedPass.value = password
	}

	const handleChange = e => {
		const name = e.target.name

		switch (name) {
			case 'letters':
				if (!options.lettersSize && !options.specialCharacters && !options.numbers) return

			setOptions({
				...options,
				letters: !options.letters,
			})
				break
			case 'lettersSize':
				if (!options.letters && !options.specialCharacters && !options.numbers) return

				setOptions({
					...options,
					lettersSize: !options.lettersSize,
				})
				break
			case 'specialCharacters':
				if (!options.letters && !options.lettersSize && !options.numbers) return

				setOptions({
					...options,
					specialCharacters: !options.specialCharacters,
				})
				break
			case 'numbers':
				if (!options.letters && !options.lettersSize && !options.specialCharacters) return
				setOptions({
					...options,
					numbers: !options.numbers,
				})
				break
			default: break
		}
	}

	const handleRange = e => {
		const type = e.target.type

		if (type === 'range') {
			const value = e.target.value
			setOptions({
				...options,
				rangeValue: value,
			})
		}
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

	useEffect(() => {
		generator()
	})

	return (
		<>
			<Generator
				handleClick={generator}
				handleCopyClick={handleCopyClick}
				handleRange={handleRange}
				handleChange={handleChange}
				options={options}
			/>
		</>
	)
}

export default App