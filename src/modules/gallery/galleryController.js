import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import useMarsPhotos from '../shared/hooks/services/nasa/useMarsPhotos';

const getFilterObject = ({ dateType, earthDate, sol, rover, camera, page }) => ({
  dateType,
  earthDate,
  sol,
  rover,
  camera,
  page,
});

const useGalleryController = ({ search }) => {
  const [filter, setFilter] = useState(getFilterObject(search));
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getPictures, response, loading } = useMarsPhotos();

  const { photos } = response?.data || {};
  const showNoPhotos = !loading && response?.ok && !photos.length;
  const showPhotos = !loading && response?.ok && !!photos.length;
  const showError = response && !loading && !response?.ok;

  const getPicturesByEarthDate = ({ earthDate, rover, camera, page }) => {
    getPictures({ earthDate, rover, camera, page });
  };
  const getPicturesBySolDay = ({ sol, rover, camera, page }) => {
    getPictures({ sol, rover, camera, page });
  };
  const loadData = (paramFilter) =>
    paramFilter.dateType === 'earth'
      ? getPicturesByEarthDate(paramFilter)
      : getPicturesBySolDay(paramFilter);

  const updateStateFilter = (clientSearch) => {
    setFilter(clientSearch);
  };

  const compareSearch = (queryObject) => {
    const jsonFilter = JSON.stringify(filter);
    const jsonQuery = JSON.stringify(queryObject);

    const hasDifferentValues = jsonFilter !== jsonQuery;

    if (hasDifferentValues) {
      updateStateFilter(queryObject);
      loadData(queryObject);
    }
  };

  const getObjectFromSearchParams = () => {
    const searchObject = Object.fromEntries(Array.from(searchParams.entries()));
    return getFilterObject(searchObject);
  };

  const loadIfChangeUrl = () => {
    const queryObject = getObjectFromSearchParams();
    const allPropertiesHaveValue = Object.values(queryObject).every(
      (value) => value !== null && value?.length
    );
    return allPropertiesHaveValue && compareSearch(queryObject);
  };

  const changePage = (prevOrNext) => {
    const currentUrl = new URL(window.location.href);
    const searchQuery = new URLSearchParams(currentUrl.search);
    const current = Number(filter.page);
    const add = current + 1;
    const subtract = current - 1;
    const isNext = prevOrNext === 'next';
    const newPage = isNext ? add : subtract;
    searchQuery.set('page', newPage);
    const newUrl = `/gallery?${searchQuery.toString()}`;
    router.push(newUrl);
  };
  const prevAction = () => {
    changePage('prev');
  };
  const nextAction = () => {
    changePage('next');
  };
  useEffect(() => {
    loadIfChangeUrl();
  }, [searchParams]);
  useEffect(() => {
    loadData(filter);
  }, []);
  return {
    filter,
    loading,
    showPhotos,
    photos,
    nextAction,
    prevAction,
    showNoPhotos,
    showError,
  };
};

export default useGalleryController;
