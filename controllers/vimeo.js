const axios = require('axios').default;

const vimeoClientId = process.env.VIMEO_CLIENT_ID;
const vimeoClientsecret = process.env.VIMEO_CLIENT_SECRET;
const vimeoCredentials = Buffer.from(
	`${vimeoClientId}:${vimeoClientsecret}`,
	'binary',
).toString('base64');

const getVideoData = (vimeoResponse) => {
	if (!vimeoResponse) {
		return { message: 'Fetching video data failed' };
	}

	const videoId = vimeoResponse.link.split('/').slice(-1)[0];
	const videoServiceName = 'vimeo';
	const vimeoIframeUrl = '//player.vimeo.com/video/';
	const numberOfPicturesSizes = vimeoResponse.pictures.sizes.length;
	const videoThumbnail =
		numberOfPicturesSizes < 4
			? vimeoResponse.pictures.sizes[numberOfPicturesSizes - 1].link
			: vimeoResponse.pictures.sizes[3].link;

	const videoData = {
		service: videoServiceName,
		id: videoId,
		title: vimeoResponse.name,
		description: vimeoResponse.description,
		safeSrc: null,
		src: vimeoIframeUrl + videoId,
		picture: videoThumbnail,
		likes: vimeoResponse.metadata.connections.likes.total,
		views: null,
		favourites: false,
		date: null,
	};
	return videoData;
};

const fetchVimeoApi = (req, res, next) => {
	const vimeoId = req.params.id;

	if (isNaN(+vimeoId)) {
		return res.status(400).json({ message: 'Wrong ID or SELECTED SERVICE' });
	}

	axios({
		url: 'https://api.vimeo.com/videos/' + vimeoId,
		method: 'GET',
		headers: {
			Authorization: `basic ${vimeoCredentials}`,
		},
	})
		.then((response) => {
			const vimeoResponse = response.data;
			const videoData = getVideoData(vimeoResponse);
			res.status(200).send(videoData);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Fetching video failed!' });
		});
};

module.exports = fetchVimeoApi;
