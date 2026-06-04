type AnyFunction = (...args: never[]) => unknown

export function debounce<TCallback extends AnyFunction>(
	callback: TCallback,
	delay = 300
) {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (...args: Parameters<TCallback>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => callback(...args), delay);
	};
}
