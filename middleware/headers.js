const setHeaders = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	next();
};

module.exports = setHeaders;
