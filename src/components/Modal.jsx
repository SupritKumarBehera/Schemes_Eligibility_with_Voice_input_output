export default function Modal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-md text-center">
        <h3 className="font-bold text-lg">कैसे उपयोग करें?</h3>
        <p className="text-gray-600 mt-2">
          माइक दबाएं, बोलें और योजना की जानकारी पाएं।
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          समझ गया
        </button>
      </div>
    </div>
  );
}
