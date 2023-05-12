import { useMultistepForm } from './useMultistepFrom'
import { UserForm } from './UserForm'
import { AddressForm } from './AddressForm'
import { AccountForm } from './AccountForm'
import { useState } from 'react'
import { FormEvent } from 'react'

type FormData = {
	firstName: string
	lastName: string
	age: string
	street: string
	city: string
	state: string
	zip: string
	email: string
	password: string
}

const INITIAL_DATA: FormData = {
	firstName: '',
	lastName: '',
	age: '',
	street: '',
	city: '',
	state: '',
	zip: '',
	email: '',
	password: '',
}

function App() {
	const [data, setData] = useState(INITIAL_DATA)
	const steps = [
		<UserForm {...data} updateFields={updateFields} />,
		<AddressForm {...data} updateFields={updateFields} />,
		<AccountForm {...data} updateFields={updateFields} />,
	]
	const { step, next, back, currentStepIndex, isFirstStep, isLastStep } =
		useMultistepForm(steps)
	function updateFields(fields: Partial<FormData>) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}
	function onSubmit(e: FormEvent) {
		e.preventDefault()
		if (!isLastStep) return next()
		alert('Successful Account Creation')
	}

	return (
		<div
			style={{
				position: 'relative',
				background: 'white',
				border: '1px solid black',
				padding: '2rem',
				margin: '1rem',
				borderRadius: '.5rem',
				fontFamily: 'Arial',
				maxWidth: '40rem',
			}}
		>
			<form onSubmit={onSubmit}>
				<div
					style={{
						position: 'absolute',
						top: '.5rem',
						right: '.5rem',
					}}
				>
					{`${currentStepIndex + 1}/${steps.length}`}
				</div>
				{step}
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginTop: '1rem',
						gap: '.5rem',
					}}
				>
					{!isFirstStep && (
						<button type='button' onClick={back}>
							Back
						</button>
					)}

					<button type='submit'>{isLastStep ? 'Submit' : 'Next'}</button>
				</div>
			</form>
		</div>
	)
}

export default App
