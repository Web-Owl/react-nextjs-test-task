import React from 'react';
import InputMask from '@mona-health/react-input-mask';

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const PhoneInput = React.forwardRef<HTMLInputElement, Props>(({ value, onChange, error }, ref) => (
  <InputMask
    mask="+7 (999) 999-99-99"
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    placeholder="+7 (___) ___-__-__"
    id="phone"
    className={`py-3 px-4 border rounded-2xl outline-none dark:bg-[#222222] dark:text-white ${
      error ? 'border-red-600' : 'border-gray-300'
    }  transition`}
    ref={ref}
  />
));

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;