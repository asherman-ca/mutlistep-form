import { ReactElement, useState } from 'react'

export const useMultistepForm = (steps: ReactElement[]) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)

	function next() {
		if (currentStepIndex < steps.length - 1) {
			setCurrentStepIndex((prev) => prev + 1)
		}
	}

	function back() {
		if (currentStepIndex > 0) {
			setCurrentStepIndex((prev) => prev - 1)
		}
	}

	function goTo(index: number) {
		setCurrentStepIndex(index)
	}

	return {
		currentStepIndex,
		step: steps[currentStepIndex],
		next,
		back,
		goTo,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
	}
}
