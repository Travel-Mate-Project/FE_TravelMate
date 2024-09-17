import {BasicCheckboxProps} from '@/types';

export default function BasicCheckBox({
  label,
  checked,
  onChange,
}: BasicCheckboxProps) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-5 h-5 border-2 rounded-[3px] border-gray-300 ${
            checked ? 'bg-green100 border-none' : 'bg-white'
          }`}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white fill-current"
              viewBox="0 0 15 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
      </div>
      <span className="ml-2">{label}</span>
    </label>
  );
}
