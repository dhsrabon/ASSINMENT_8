export function ErrorAlert({ message, onClose }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6 animate__animated animate__shakeX">
      <div className="flex justify-between items-start">
        <p className="text-red-700 text-sm font-semibold">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export function SuccessAlert({ message, onClose }) {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-6 animate__animated animate__slideInDown">
      <div className="flex justify-between items-start">
        <p className="text-green-700 text-sm font-semibold">✓ {message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-green-500 hover:text-green-700 transition"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export function InfoAlert({ message, onClose }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-6 animate__animated animate__fadeIn">
      <div className="flex justify-between items-start">
        <p className="text-blue-700 text-sm font-semibold">ℹ {message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export function WarningAlert({ message, onClose }) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md mb-6 animate__animated animate__fadeIn">
      <div className="flex justify-between items-start">
        <p className="text-yellow-700 text-sm font-semibold">⚠ {message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-yellow-500 hover:text-yellow-700 transition"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
