import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Colors {
  scoreColor: string;
  analyteColor: string;
}

interface ColorPickerButtonProps {
  selectedAnalyte: string | null;
  selectedAnalyteName: string;
  colors: Colors;
  onChange: (newColors: Colors) => void;
  onReset?: () => void;
}

export const ColorPickerButton = ({
  selectedAnalyte,
  selectedAnalyteName,
  colors,
  onChange,
}: ColorPickerButtonProps) => {
  const { t } = useTranslation('', { keyPrefix: 'general' });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setShowColorPicker((v) => !v)}
        className="flex items-center gap-1 rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
      >
        {t('customizeColors')}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8" />
          {showColorPicker && <path d="M8 12h8" />}
        </svg>
      </button>
      {showColorPicker && (
        <div className="absolute z-11 mt-2 w-56 rounded-md border border-gray-200 bg-white p-3 shadow-lg">
          <label className="mb-1 block text-xs font-medium text-gray-700">
            {t('score')}
          </label>
          <input
            type="color"
            value={colors.scoreColor}
            onChange={(e) =>
              onChange({ ...colors, scoreColor: e.target.value })
            }
            className="mb-3 w-full"
          />
          {selectedAnalyte && (
            <>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                {t(`analytes.${selectedAnalyteName}`)}
              </label>
              <input
                type="color"
                value={colors.analyteColor}
                onChange={(e) =>
                  onChange({
                    ...colors,
                    analyteColor: e.target.value,
                  })
                }
                className="mb-3 w-full"
              />
            </>
          )}
          <button
            onClick={() =>
              onChange({
                scoreColor: '#6b46c1',
                analyteColor: '#e53e3e',
              })
            }
            className="w-full rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            {t('resetDefaults')}
          </button>
        </div>
      )}
    </div>
  );
};
