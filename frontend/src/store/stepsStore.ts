import { create } from "zustand";
interface CurrentStepState {
    currentStep: number
    setCurrentStep: (step:number) => void
}

export const useStep = create<CurrentStepState>()((set) => ({
    currentStep: 2,
    setCurrentStep: (step: number) => set(() => ({ currentStep: step })),
}))

