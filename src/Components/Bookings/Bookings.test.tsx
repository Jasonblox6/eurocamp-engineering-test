/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Bookings from './Bookings';
import userEvent from '@testing-library/user-event';

describe("Bookings Page", () => {
  describe("Header Elements", () => {
    it('Title and summary appear', () => {
      render(<Bookings />);
      const header = screen.getByTestId('bookings-header');
      const summary =  screen.getByTestId('bookings-summary');
      expect(header).toBeInTheDocument();
      expect(summary).toBeInTheDocument();
    });

    it('Button works and can be clicked', () => {
      render(<Bookings />);
      const createButton = screen.getByTestId('create-booking');
      expect(createButton).toBeInTheDocument();
      act(()=> userEvent.click(createButton));
      const modal = screen.getByTestId('create-booking-modal')
      expect(modal).toBeVisible();
    });
    
  });
});

