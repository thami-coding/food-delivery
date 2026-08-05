import React from "react"

interface ErrorPageProps {
  message?: string
  statusCode?: number
  statusText?: string
  statusLabel?: string
  onGoBack?: () => void
  onReturnHome?: () => void
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  message = "You do not have the necessary administrative privileges to view this page.",
  statusCode = 403,
  statusText = "Access Denied",
  statusLabel = "Forbidden Resource",
  onGoBack,
  onReturnHome = () => (window.location.href = "/"),
}) => {
  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack()
    } else if (window.history.length > 1) {
      window.history.back()
    } else {
      onReturnHome()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-extrabold text-white leading-none tracking-tight">
            {statusCode}
          </h1>
          <h2 className="text-2xl font-bold text-white mt-2">{statusText}</h2>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-2">
            {statusLabel}
          </p>
        </div>

        <p className="text-base text-white max-w-m mx-auto mb-6 leading-normal">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 text-sm font-medium rounded-md cursor-pointer transition-colors duration-150 ease-in-out shadow-sm border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 box-border"
          >
            Go Back
          </button>

          <button
            onClick={onReturnHome}
            className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 text-sm font-medium rounded-md cursor-pointer transition-colors duration-150 ease-in-out shadow-sm border border-transparent text-black bg-yellow-400 hover:bg-yellow-600"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
