import { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Select from '../shared/ui/Select';
import Input from '../shared/ui/Input';
import Button from '../shared/ui/Button';

const FilterBar = ({ dateType, sol, rover, earthDate, camera }) => {
  const [cameras, setCameras] = useState([]);
  const router = useRouter();
  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      earthDate: dayjs(earthDate),
      sol,
      dateType,
      rover,
      camera,
    },
  });
  const watchDateType = watch('dateType');
  const watchRover = watch('rover');

  const curiosityCameras = [
    { value: 'all', displayName: 'All' },
    { value: 'FHAZ', displayName: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', displayName: 'Rear Hazard Avoidance Camera' },
    { value: 'MAST', displayName: 'Mast Camera' },
    { value: 'CHEMCAM', displayName: 'Chemistry and Camera Complex' },
    { value: 'MAHLI', displayName: 'Mars Hand Lens Imager' },
    { value: 'MARDI', displayName: 'Mars Descent Imager' },
    { value: 'NAVCAM', displayName: 'Navigation Camera' },
  ];
  const opportunityCameras = [
    { value: 'all', displayName: 'All' },
    { value: 'FHAZ', displayName: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', displayName: 'Rear Hazard Avoidance Camera' },
    { value: 'NAVCAM', displayName: 'Navigation Camera' },
    { value: 'PANCAM', displayName: 'Panoramic Camera' },
    {
      value: 'MINITES',
      displayName: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
    },
  ];

  const spiritCameras = [
    { value: 'all', displayName: 'All' },
    { value: 'FHAZ', displayName: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', displayName: 'Rear Hazard Avoidance Camera' },
    { value: 'NAVCAM', displayName: 'Navigation Camera' },
    { value: 'PANCAM', displayName: 'Panoramic Camera' },
    {
      value: 'MINITES',
      displayName: 'Miniature Thermal Emission Spectrometer (Mini-TES)\t',
    },
  ];
  const getCamerasByRover = (paramRover) => {
    const list = {
      curiosity: curiosityCameras,
      opportunity: opportunityCameras,
      spirit: spiritCameras,
    };

    return list[paramRover];
  };

  const changeListWhenRoverChange = () => {
    const list = getCamerasByRover(watchRover);
    setCameras(list);
    setValue('camera', 'all');
  };

  useEffect(() => {
    changeListWhenRoverChange();
  }, [watchRover]);

  const submit = (values) => {
    router.push(
      {
        pathname: '/gallery',
        query: {
          page: '1',
          dateType: values.dateType,
          earthDate: dayjs(values.earthDate).format('YYYY-MM-DD'),
          sol: values.sol,
          rover: values.rover,
          camera: values.camera,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="md:w-4/12 p-6 relative">
      <Image
        src="/logo-nasa.png"
        width="100"
        height="400"
        alt="logo nasa"
        className="m-auto mb-8"
      />
      <Typography variant="subtitle1">
        <b>FILTER</b>
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col">
          <Select
            className="!mt-4"
            control={control}
            name="dateType"
            label="Type"
            defaultValue="earth"
            options={[
              { value: 'earth', displayName: 'Earth Date' },
              { value: 'sol', displayName: 'Sol' },
            ]}
          />
          {watchDateType === 'earth' && (
            <Controller
              control={control}
              render={({ field }) => (
                <DatePicker className="!mt-4" label="Date" {...field} />
              )}
              name="earthDate"
            />
          )}
          {watchDateType === 'sol' && (
            <Input
              control={control}
              name="sol"
              defaultValue="0"
              label="Sol"
              className="!mt-4"
            />
          )}

          <Select
            className="!mt-4"
            control={control}
            name="rover"
            label="Rover"
            defaultValue="curiosity"
            options={[
              { value: 'curiosity', displayName: 'Curiosity' },
              { value: 'opportunity', displayName: 'Opportunity' },
              { value: 'spirit', displayName: 'Spirit' },
            ]}
          />

          <Select
            key={watchRover}
            className="!mt-4"
            control={control}
            name="camera"
            label="Camera"
            defaultValue={camera}
            options={cameras}
          />

          <Button
            text="APPLY"
            type="submit"
            variant="contained"
            size="large"
            className="!mt-4"
          />
        </div>
      </form>
    </div>
  );
};

FilterBar.propTypes = {
  dateType: string.isRequired,
  sol: string.isRequired,
  rover: string.isRequired,
  earthDate: string.isRequired,
  camera: string.isRequired,
};
export default FilterBar;
