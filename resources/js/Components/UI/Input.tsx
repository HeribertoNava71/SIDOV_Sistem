import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
                        w-full px-4 py-3 text-base rounded-xl border-2 
                        bg-white transition-all duration-200
                        placeholder:text-slate-400
                        focus:outline-none focus:border-[#46178F] focus:ring-4 focus:ring-[#46178F]/10
                        ${error ? 'border-[#E21B3C] focus:border-[#E21B3C] focus:ring-[#E21B3C]/10' : 'border-slate-200'}
                        ${className}
                    `}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm text-[#E21B3C]">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
