it('should show an error message if all fields are not filled', async () => {
  fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/Time/i), {
    target: { value: '12:00' },
  });
  fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
    target: { value: '4' },
  });
  fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
    target: { value: '1' },
  });
  fireEvent.click(screen.getByText('+'));
  fireEvent.change(screen.getByLabelText(/Shoe size/i), {
    target: { value: '42' },
  });
  fireEvent.click(screen.getByText(/strIIIIIike!/i));

  waitFor(() => {
    const errorMessage = document.querySelector('.error-message__text');
    expect(errorMessage).toBeInTheDocument();
  });
});

it('should show an error message if number of shoes does not match number of players', async () => {
  fireEvent.change(screen.getByLabelText(/Date/i), {
    target: { value: '2024-06-01' },
  });
  fireEvent.change(screen.getByLabelText(/Time/i), {
    target: { value: '12:00' },
  });
  fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
    target: { value: '4' },
  });
  fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
    target: { value: '1' },
  });
  fireEvent.click(screen.getByText('+'));
  fireEvent.change(screen.getByLabelText(/Shoe size/i), {
    target: { value: '42' },
  });
  fireEvent.click(screen.getByText(/strIIIIIike!/i));

  waitFor(() => {
    expect(
      screen.getByText(/people and shoes is the same number/i)
    ).toBeInTheDocument();
  });
});

it('should show an error message if number of players per lane exceeds four', async () => {
  fireEvent.change(screen.getByLabelText(/Date/i), {
    target: { value: '2024-06-01' },
  });
  fireEvent.change(screen.getByLabelText(/Time/i), {
    target: { value: '12:00' },
  });
  fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
    target: { value: '5' },
  }); // 5 players
  fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
    target: { value: '1' },
  });

  // Add and change shoe size fields
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

  waitFor(() => {
    expect(
      screen.getByText(/number of players per lane exceeds four/i)
    ).toBeInTheDocument();
  });
});
