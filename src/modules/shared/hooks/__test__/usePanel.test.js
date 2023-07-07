import React from 'react';
import { render, fireEvent, renderHook, act } from '@testing-library/react';
import usePanel from '../usePanel';

describe('usePanel', () => {
  test('should initialize show as false', () => {
    const { result } = renderHook(() => usePanel());

    expect(result.current.show).toBe(false);
  });

  test('should set show to true when setShow is called', () => {
    const { result } = renderHook(() => usePanel());

    act(() => {
      result.current.setShow(true);
    });

    expect(result.current.show).toBe(true);
  });

  test('should set show to false when closePanel is called', () => {
    const { result } = renderHook(() => usePanel());

    act(() => {
      result.current.setShow(true);
      result.current.closePanel();
    });

    expect(result.current.show).toBe(false);
  });

  test('should render Panel component with correct props', () => {
    const { result } = renderHook(() => usePanel());
    const { Panel, closePanel } = result.current;

    const { getByText } = render(
      <Panel title="Test Title" show closePanel={closePanel}>
        Test Content
      </Panel>
    );

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  test('should call closePanel when close button is clicked', () => {
    const { result } = renderHook(() => usePanel());
    const { Panel, closePanel } = result.current;

    const { getByRole } = render(
      <Panel title="Test Title" show closePanel={closePanel}>
        Test Content
      </Panel>
    );

    fireEvent.click(getByRole('button'));

    expect(result.current.show).toBe(false);
  });
  test('render empty modal', () => {
    const { result } = renderHook(() => usePanel());
    const { Panel, closePanel } = result.current;

    const { getByText } = render(
      <Panel title="Test Title" show empty closePanel={closePanel}>
        Test Content
      </Panel>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
