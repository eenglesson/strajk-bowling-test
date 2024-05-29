import { HttpResponse, http } from 'msw';

export const handlers = [
  http.post(
    'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
    async (request) => {
      //async ({ request }) => {
      //const bookingResponse = await request.json();
      //console.log('Mock POST request:', bookingResponse);

      return HttpResponse.json(
        {
          active: true,
          when: '2024-05-30T12:00',
          lanes: '1',
          people: '1',
          shoes: ['42'],
          id: '1234',
          price: 340,
        },
        { status: 201 }
      );
      //};
    }
  ),
];
