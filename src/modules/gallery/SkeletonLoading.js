import { Skeleton } from '@mui/material';

const SkeletonLoading = () => (
  <>
    <Skeleton data-testid="test-skeleton" variant="rounded" animation="wave" className="rounded-2xl w-full pb-[100%]" />
    <Skeleton variant="rounded" animation="wave" className="rounded-2xl w-full pb-[100%]" />
    <Skeleton variant="rounded" animation="wave" className="rounded-2xl w-full pb-[100%]" />
    <Skeleton variant="rounded" animation="wave" className="rounded-2xl w-full pb-[100%]" />
    <Skeleton variant="rounded" animation="wave" className="rounded-2xl hidden md:block w-full pb-[100%]" />
    <Skeleton variant="rounded" animation="wave" className="rounded-2xl hidden md:block w-full pb-[100%]" />
    <Skeleton variant="rounded" animation="wave" className="rounded-2xl hidden md:block w-full pb-[100%]" />
    <Skeleton variant="rounded" animation="wave" className="rounded-2xl hidden md:block w-full pb-[100%]" />
    <Skeleton variant="rounded" animation="wave" className="rounded-2xl hidden md:block w-full pb-[100%]" />
  </>
);

export default SkeletonLoading;
