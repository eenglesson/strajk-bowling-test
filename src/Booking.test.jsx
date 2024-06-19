import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import './setupTests'; // Ensure this file sets up the MSW server

import { beforeEach, describe, expect, it } from 'vitest';

describe('Bowling Booking App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should allow user to book a date and time', async () => {
    const dateInput = screen.getByLabelText('Date');
    fireEvent.change(dateInput, { target: { value: '2024-06-01' } });

    const timeInput = screen.getByLabelText('Time');
    fireEvent.change(timeInput, { target: { value: '12:00' } });

    const playerAmount = screen.getByLabelText(/Number of awesome bowlers/i);
    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
      target: { value: '2' },
    });

    expect(playerAmount.value).toBe('2');
    expect(dateInput.value).toBe('2024-06-01');
    expect(timeInput.value).toBe('12:00');
  });

  it('should allow user to add and choose size', async () => {
    const addButton = await screen.findByText('+');
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const shoeSize1 = await screen.findByLabelText(/Shoe size \/ person 1/i);
    fireEvent.change(shoeSize1, {
      target: { value: '42' },
    });
    const shoeSize2 = await screen.findByLabelText(/Shoe size \/ person 2/i);
    fireEvent.change(shoeSize2, {
      target: { value: '44' },
    });

    const shoeSizeContainers = screen.getAllByLabelText(/Shoe size \/ person/i);
    expect(shoeSizeContainers).toHaveLength(2);
    expect(shoeSize1.value).toBe('42');
    expect(shoeSize2.value).toBe('44');
  });

  it('Ensure that the user can remove a shoe size field if too many were added.', async () => {
    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText(/Shoe size \/ person 1/i), {
      target: { value: '42' },
    });
    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText(/Shoe size \/ person 2/i), {
      target: { value: '43' },
    });
    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText(/Shoe size \/ person 3/i), {
      target: { value: '44' },
    });

    screen.debug();
    const removeButtons = await screen.findAllByText('-');
    fireEvent.click(removeButtons[1]);

    const shoeSizeContainers = screen.getAllByLabelText(/Shoe size \/ person/i);
    expect(shoeSizeContainers).toHaveLength(2);
  });

  it('should allow user to submit reservation and receive confirmation', async () => {
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2024-06-01' },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: '12:00' },
    });
    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
      target: { value: '1' },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('+'));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 1/i), {
        target: { value: '42' },
      });

      fireEvent.click(screen.getByText('+'));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 2/i), {
        target: { value: '43' },
      });
    });

    fireEvent.click(screen.getByText(/strIIIIIike!/i));

    await waitFor(() => {
      expect(screen.getByText(/340 sek/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234')).toBeInTheDocument();
    });
  });

  it('should allow user to navigate back to booking view after confirmation', async () => {
    // Step 1: Complete a booking and receive confirmation
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2024-06-01' },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: '12:00' },
    });
    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
      target: { value: '1' },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('+'));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 1/i), {
        target: { value: '42' },
      });

      fireEvent.click(screen.getByText('+'));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 2/i), {
        target: { value: '43' },
      });
    });

    fireEvent.click(screen.getByText(/strIIIIIike!/i));

    await waitFor(() => {
      expect(screen.getByText(/340 sek/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234')).toBeInTheDocument();
    });

    // Step 2: Click the button to navigate back to the booking view
    screen.debug();
    fireEvent.click(screen.getByText("Sweet, let's go!"));

    // Step 3: Assert that the booking view is displayed
    await waitFor(() => {
      expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Number of awesome bowlers/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/Number of lanes/i)).toBeInTheDocument();
    });
  });

  //ERROR FAILING
  it('should not allow submission if all fields are not filled', async () => {
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2024-06-01' },
    });

    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
      target: { value: '1' },
    });

    fireEvent.click(screen.getByText(/strIIIIIike!/i));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Fill out all the fields and make sure that people and shoes is the same number./i
        )
      );
    });
  });

  it('should not allow submission if the number of shoes does not match the number of players', async () => {
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2024-06-01' },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: '12:00' },
    });
    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
      target: { value: '1' },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('+'));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 1/i), {
        target: { value: '42' },
      });

      fireEvent.click(screen.getByText('+'));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 2/i), {
        target: { value: '43' },
      });
    });

    fireEvent.click(screen.getByText(/strIIIIIike!/i));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Fill out all the fields and make sure that people and shoes is the same number./i
        )
      ).toBeInTheDocument();
    });
  });

  it('should not allow submission if players exceed the maximum capacity per lane', async () => {
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: '2024-06-01' },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: '12:00' },
    });
    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
      target: { value: '1' },
    });

    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText(/Shoe size \/ person 1/i), {
      target: { value: '42' },
    });

    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText(/Shoe size \/ person 2/i), {
      target: { value: '43' },
    });

    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText(/Shoe size \/ person 3/i), {
      target: { value: '44' },
    });

    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText(/Shoe size \/ person 4/i), {
      target: { value: '45' },
    });

    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText(/Shoe size \/ person 5/i), {
      target: { value: '46' },
    });

    fireEvent.click(screen.getByText(/strIIIIIike!/i));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Fill out all the fields and make sure that people and shoes is the same number./i
        )
      ).toBeInTheDocument();
    });
  });
});
