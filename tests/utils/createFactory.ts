export default (fn: any) => {
	return (options = { props: {}}) => {
		return fn({
			props: options.props
		});
	};
};
