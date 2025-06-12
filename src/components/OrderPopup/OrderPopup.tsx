import React from 'react';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function OrderPopup({ visible, onClose }: Props) {
  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg z-50 max-w-sm w-full text-center"
        role="dialog"
        aria-modal="true"
      >
        <h3 className="text-xl font-semibold mb-4">Заказ успешно оформлен!</h3>
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="dark:text-[#D9D9D9] dark:bg-black px-6 py-2 rounded transition cursor-pointer"
        >
          Закрыть
        </button>
      </div>
    </>
  );
}