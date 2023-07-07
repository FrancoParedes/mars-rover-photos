import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import useGalleryController from '../../../gallery/galleryController';
import GalleryIndex from '../../../../pages/gallery';


jest.mock('../../../gallery/galleryController', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('GalleryIndex', () => {
  test('renders GalleryIndex component', () => {
    const mockGalleryController = {
      filter: {
        earthDate: '2022-07-22',
        dateType: 'earth',
        sol: '2',
        rover: 'curiosity',
        camera: 'all',
        page: '2',
      },
      loading: false,
      showPhotos: true,
      photos: [{ id: '23234', src: 'https://google.com/testImage.png' }],
      nextAction: jest.fn(),
      prevAction: jest.fn(),
      showNoPhotos: false,
      showError: false,
    };
    useGalleryController.mockReturnValue(mockGalleryController);

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GalleryIndex search={{}} />
      </LocalizationProvider>
    );
    expect(screen.getByText('FILTER')).toBeInTheDocument();
  });

  test('renders GalleryIndex component with rover', () => {
    const mockGalleryController = {
      filter: {
        earthDate: '2022-07-22',
        dateType: 'earth',
        sol: '2',
        rover: 'curiosity',
        camera: 'all',
        page: '2',
      },
      loading: false,
      showPhotos: true,
      photos: [{ id: '23234', src: 'https://google.com/testImage.png' }],
      nextAction: jest.fn(),
      prevAction: jest.fn(),
      showNoPhotos: false,
      showError: false,
    };
    useGalleryController.mockReturnValue(mockGalleryController);

    const query = {
      dateType: 'sol',
      earthDate: '2023-01-01',
      sol: '10',
      rover: 'curiosity',
      camera: 'FHAZ',
      page: '2',
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GalleryIndex search={query} />
      </LocalizationProvider>
    );
    expect(screen.getByText('Curiosity')).toBeInTheDocument();
    fireEvent.click(screen.getByText('APPLY'));
  });

  test('renders GalleryIndex component with skeleton', () => {
    const mockGalleryController = {
      filter: {
        earthDate: '2022-07-22',
        dateType: 'earth',
        sol: '2',
        rover: 'curiosity',
        camera: 'all',
        page: '2',
      },
      loading: true,
      showPhotos: false,
      photos: [{ id: '23234', src: 'https://google.com/testImage.png' }],
      nextAction: jest.fn(),
      prevAction: jest.fn(),
      showNoPhotos: false,
      showError: false,
    };
    useGalleryController.mockReturnValue(mockGalleryController);

    const query = {
      dateType: 'sol',
      earthDate: '2023-01-01',
      sol: '10',
      rover: 'curiosity',
      camera: 'FHAZ',
      page: '2',
    };

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GalleryIndex search={query} />
      </LocalizationProvider>
    );
    expect(screen.getByTestId('test-skeleton')).toBeInTheDocument();
  });
});
