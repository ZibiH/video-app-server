const axios = require('axios').default;

const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/videos?id=';
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeParts = 'snippet,statistics';
const youtubeIframeUrl = '//www.youtube.com/embed/';
const standardYoutubeIdLength = 11;

const getVideoData = (youtubeResponse) => {
	if (!youtubeResponse) {
		return { message: 'Fetching video data failed' };
	}

	const videoServiceName = 'youtube';
	const videoThumbnail = youtubeResponse.snippet.thumbnails.high.url
		? youtubeResponse.snippet.thumbnails.high.url
		: youtubeResponse.snippet.thumbnails.default.url;

	const videoData = {
		service: videoServiceName,
		id: youtubeResponse.id,
		title: youtubeResponse.snippet.title,
		description: youtubeResponse.snippet.description,
		safeSrc: null,
		src: youtubeIframeUrl + youtubeResponse.id,
		picture: videoThumbnail,
		likes: youtubeResponse.statistics.likeCount,
		views: youtubeResponse.statistics.viewCount,
		favourites: false,
		date: null,
	};
	return videoData;
};

const fetchYoutubeApi = (req, res) => {
	const youtubeId = req.params.id;
	const youtubeIdLength = youtubeId.split('').length;
	if (youtubeIdLength !== standardYoutubeIdLength) {
		return res.status(400).json({ message: 'Wrong ID or SELECTED SERVICE' });
	}

	const url = `${youtubeApiUrl}${youtubeId}&key=${youtubeApiKey}&part=${youtubeParts}`;
	axios
		.get(url)
		.then((response) => {
			const youtubeResponse = response.data.items[0];
			const videoData = getVideoData(youtubeResponse);
			res.status(200).send(videoData);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Fetching video failed!' });
		});
};

module.exports = fetchYoutubeApi;
