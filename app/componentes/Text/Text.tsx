import type { HTMLAttributes, ReactNode } from "react";

type TextProps = HTMLAttributes<HTMLElement> & {
	as?: "p" | "span" | "div";
	children: ReactNode;
};

export default function Text({
	as: Element = "p",
	children,
	style,
	...props
	}: TextProps) {
	return (
		<Element
			className="font-asap-condensed text-base text-white leading-normal"
			{...props}
			style={style}
		>
			{children}
		</Element>
	);
}