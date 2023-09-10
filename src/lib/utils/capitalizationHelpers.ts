export const kebabCaseToCamelCase = (str: string) => {
	return str
		.split('-')
		.map((word, index) => {
			if (index === 0) return word;
			return word[0].toUpperCase() + word.slice(1);
		})
		.join('');
};

export const normalCaseToKebabCase = (str: string) => {
	return str
		.split(/(?=[A-Z])/)
		.join('-')
		.toLowerCase();
};

export const kebabCaseToNormalCase = (str: string) => {
	return str
		.split('-')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(' ');
};
