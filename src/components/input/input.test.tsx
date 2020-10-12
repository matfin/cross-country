import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input, { Props } from './input';

describe('Input tests', (): void => {
  const spyOnBlur = jest.fn();
  const spyOnChange = jest.fn();
  const spyOnFocus = jest.fn();
  const defaultProps: Props = {
    onBlur: spyOnBlur,
    onChange: spyOnChange,
    onFocus: spyOnFocus,
    placeholder: 'Test',
  };

  beforeEach((): void => {
    spyOnBlur.mockClear();
    spyOnChange.mockClear();
    spyOnFocus.mockClear();
  });

  it('renders the component and works with default callbacks', (): void => {
    const { container, getByTestId } = render(<Input />);
    const input = getByTestId('input');

    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: 'T' } });
    fireEvent.focus(input);

    expect(container).toBeTruthy();
  });

  it('should execute a callback on blur, change and focus', (): void => {
    // given
    const { getByTestId } = render(
      <Input {...defaultProps} onBlur={spyOnBlur} onChange={spyOnChange} onFocus={spyOnFocus} />,
    );
    const input = getByTestId('input');

    // then
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: 'T' } });
    fireEvent.focus(input);
    expect(spyOnBlur).toHaveBeenCalled();
    expect(spyOnChange).toHaveBeenCalled();
    expect(spyOnFocus).toHaveBeenCalled();
  });
});
