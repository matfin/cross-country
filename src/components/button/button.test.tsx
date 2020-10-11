import React from 'react';
import 'jest-styled-components';
import { render, fireEvent } from '@testing-library/react';
import Button, { Props } from './button';

describe('Button tests', (): void => {
  const defaultProps: Props = {
    onClick: jest.fn(),
  };

  it('renders the button with children', (): void => {
    // given
    const { container, getByText } = render(
      <Button {...defaultProps}>
        <span>Test</span>
      </Button>,
    );

    // then
    expect(container).toBeTruthy();
    expect(getByText('Test')).toBeTruthy();
  });

  it('executes a callback on click', (): void => {
    // given
    const spyOnClick = jest.fn();
    const { getByTestId } = render(
      <Button {...defaultProps} onClick={spyOnClick}>
        <span>Test</span>
      </Button>,
    );

    // then
    fireEvent.click(getByTestId('button'));
    expect(spyOnClick).toHaveBeenCalled();
  });

  it('applies the correct style for a disabled button', (): void => {
    // given
    const { getByTestId } = render(
      <Button {...defaultProps} disabled>
        <span>Test</span>
      </Button>,
    );

    // then
    expect(getByTestId('button')).toHaveStyleRule('display', 'flex');
  });
});
