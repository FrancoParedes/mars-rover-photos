import { shape, string } from 'prop-types';
import FilterBar from '../../modules/gallery/FilterBar';
import { getCurrentDateFormatted } from '../../modules/shared/utils/dates';
import SkeletonLoading from '../../modules/gallery/SkeletonLoading';
import CardMessage from '../../modules/shared/ui/CardMessage';
import Picture from '../../modules/gallery/Picture';
import Pagination from '../../modules/shared/ui/Pagination';
import useGalleryController from '../../modules/gallery/galleryController';

const GalleryIndex = ({ search }) => {
  const {
    filter,
    loading,
    showPhotos,
    photos,
    nextAction,
    prevAction,
    showNoPhotos,
    showError,
  } = useGalleryController({ search });
  return (
    <div className="flex flex-col md:flex-row m-auto w-full max-w-4xl">
      <FilterBar
        earthDate={filter.earthDate}
        dateType={filter.dateType}
        sol={filter.sol}
        rover={filter.rover}
        camera={filter.camera}
        page={filter.page}
      />
      <div className="md:w-8/12 p-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {loading && <SkeletonLoading />}

          {showPhotos &&
            photos?.map(({ id, src }) => <Picture key={id} id={id} src={src} />)}
        </div>

        {showPhotos && (
          <Pagination
            current={filter.page}
            nextAction={nextAction}
            nextDisabled={photos.length < 25}
            prevDisabled={filter.page <= 1}
            prevAction={prevAction}
          />
        )}

        {showNoPhotos && (
          <CardMessage
            src="/astronaut.svg"
            title="Houston we have a problem!"
            text="We couldn't find any images matching your search. Please try again with a different date."
          />
        )}
        {showError && (
          <CardMessage
            src="/pixel.svg"
            title="Houston we have a problem!"
            text="Sorry, an error has occurred. Please try again later."
          />
        )}
      </div>
    </div>
  );
};

GalleryIndex.propTypes = {
  search: shape({
    dateType: string,
    earthDate: string,
    sol: string,
    rover: string,
    camera: string,
    page: string,
  }).isRequired,
};

export async function getServerSideProps({ query }) {
  const { dateType, earthDate, sol, rover, camera, page } = query;

  const search = {
    dateType: dateType || 'earth',
    earthDate: earthDate || getCurrentDateFormatted(),
    sol: sol || '0',
    rover: rover || 'curiosity',
    camera: camera || 'all',
    page: page || '1',
  };
  return { props: { search } };
}
export default GalleryIndex;
