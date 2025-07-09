import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CaregiverProfile from '../caregiverProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Mock navigation and route
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  useRoute: () => ({
    params: { email: 'test@example.com', id: '123' },
  }),
  useFocusEffect: (cb: any) => cb(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  multiRemove: jest.fn(),
}));

jest.mock('axios');

describe('CaregiverProfile', () => {
  it('renders caregiver name', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('token');
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        data: {
          _id: '123',
          name: 'Care Giver',
          email: 'test@example.com',
          isAvailable: true,
          items_id: [],
        },
      },
    });

    const { getByText } = render(<CaregiverProfile />);
    await waitFor(() => expect(getByText('Care Giver')).toBeTruthy());
  });
});