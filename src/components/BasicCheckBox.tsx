import Checked from '@/asset/check.svg';
import {CheckboxProps} from '@/types';

export default function BasicCheckBox({
  label,
  checked,
  onChange,
}: CheckboxProps) {
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
          {checked && <Checked className={'w-4 h-4 absolute left-0.5'} />}
        </div>
      </div>
      <span className="ml-2">{label}</span>
    </label>
  );
}
