import { useStep } from "../store/stepsStore"

const steps = [
  { id: 1, label: "Cart" },
  { id: 2, label: "Checkout" },
  { id: 3, label: "Payment" },
]

export default function CheckoutProgress() {
  const { currentStep } = useStep();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              {/* Step */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? "✓" : step.id}
                </div>

                <span className="mt-2 text-sm font-medium text-gray-500">
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 rounded bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? "bg-green-500 w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}