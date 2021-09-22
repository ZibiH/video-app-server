const defaultBase = require('../public/defaultVideos');

const getDefaultVideoBase = (req, res, next) => {
	const defaultVideoBase = defaultBase;
	if (!defaultVideoBase) {
		return res.status(404).json({ message: 'Something went wrong, try again later!' });
	}

	res.status(200).send(defaultVideoBase);
};

module.exports = getDefaultVideoBase;
