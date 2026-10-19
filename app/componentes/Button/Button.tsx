import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
	children = "Fazer reserva",
	className = "",
	...props
}: ButtonProps) {
	return (
		<button
			className={`md:-mt-15 mt-0 self-end font-asap text-base md:text-lg px-1 py-0.5 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-[#270600] transition-colors duration-300 w-fit ${className}`.trim()}
			{...props}
		>
			{children}
		</button>
	);
}
