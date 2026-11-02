"use client";

export default function TextField({
  label,
  icon,
  action,
  className = "",
  id,
  ...props
}) {
  const fieldId = id || props.name;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label
          htmlFor={fieldId}
          className="block text-[13px] font-semibold text-white"
        >
          {label}
        </label>
        {action}
      </div>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </span>
        <input
          {...props}
          id={fieldId}
          className={`h-[46px] w-full rounded-[10px] border border-white/[0.14] bg-[#111113] pl-11 pr-4 text-[15px] text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/10 ${className}`}
        />
      </div>
    </div>
  );
}
