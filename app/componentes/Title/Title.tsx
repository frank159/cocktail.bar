import type { HTMLAttributes, ReactNode } from "react";

type TitleProps = HTMLAttributes<HTMLHeadingElement> & {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	children: ReactNode;
};

export default function Title({
	as: Heading = "h1",
	children,
	style,
	...props
}: TitleProps) {
	return (
		<Heading
			className=" normal-case font-anton text-6xl md:text-7xl lg:text-[5rem] text-white tracking-wide leading-none"
			{...props}
			style={style} // Apenas repassa o style, sem sobrescrever a fonte
		>
			{children}
		</Heading>
	);
}