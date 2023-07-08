import useFetch from '../../../utils/useFetch';

const useMarsPhotos = () => {
  const NASA_HOST = process.env.NEXT_PUBLIC_NASA_HOST;
  const { loading, response, makeRequest, error } = useFetch();

  const buildPhoto = (photo) => ({
    id: photo.id,
    src: String(photo.img_src).replace('http:', 'https:'),
  });
  const buildResponse = (data) => ({
    photos: data.photos.map((photo) => buildPhoto(photo)),
  });

  const getPictures = async ({
    page = '1',
    earthDate = null,
    sol = null,
    rover,
    camera,
  } = {}) => {
    const queryPage = page && `page=${page}`;
    const querySol = (sol?.length && `sol=${sol}`) || '';
    const queryEarthDate = (earthDate?.length && `earth_date=${earthDate}`) || '';
    const queryCamera = (camera?.length && camera !== 'all' && `camera=${camera}`) || '';
    const queryApi = `api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
    const finalQuery = [queryPage, querySol, queryEarthDate, queryCamera, queryApi]
      .join('&')
      .replace('&&', '&');
    const data = await makeRequest({
      url: `${NASA_HOST}/mars-photos/api/v1/rovers/${rover}/photos?${finalQuery}`,
      method: 'get',
      mapper: buildResponse,
    });
    return data;
  };
  return { getPictures, loading, response, error };
};

export default useMarsPhotos;
