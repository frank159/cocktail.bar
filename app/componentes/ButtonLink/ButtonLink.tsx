import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
	href?: string;
	children: ReactNode;
	className?: string;
	target?: string;
	rel?: string;
};

export default function ButtonLink({
	href,
	children,
	className = "",
	target,
	rel,
}: ButtonProps) {
	const baseClass = `inline-block md:-mt-15 mt-0 self-end font-asap text-base md:text-lg px-1 py-0.5 border border-[#00b4d8] text-white hover:bg-[#00b4d8] hover:text-[#270600] transition-colors duration-300 w-fit cursor-pointer ${className}`.trim();
	if (!href) return null;

	const isExternal =
		/^(https?:)?\/\//.test(href) ||
		href.startsWith("mailto:") ||
		href.startsWith("tel:");

	if (isExternal || target) {
		return (
			<a
				href={href}
				target={target ?? (isExternal ? "_blank" : undefined)}
				rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
				className={baseClass}
			>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={baseClass}>
			{children}
		</Link>
	);
}