import axios from 'axios';

export const getAddress = (latitude, longitude) => {
  try {
    return axios.get(
      `https://api.neshan.org/v2/reverse?lat=${latitude}&lng=${longitude}`,
      {
        headers: {
          'Api-Key': 'service.tUczjLLU3IPF7tI5tIkZQX80HKyzRhjPOSp2HFZw',
        },
      },
    );
  } catch (error) {
    console.log(error.message);
  }
};
