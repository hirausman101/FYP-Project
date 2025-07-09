jest.mock('react-native-charts-wrapper', () => ({
  LineChart: () => null,
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  useRoute: () => ({
    params: { patientId: '1', email: 'test@example.com', id: '123' },
  }),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('react-native/Libraries/StyleSheet/processColor', () => (color: string) => color);

import React from 'react';
import { render } from '@testing-library/react-native';
import Patient from '../Patient';

const mockPatient = {
  _id: '1',
  name: 'Alice',
  gender: 'Female',
  age: 65,
  status: 'Stable',
  phonenumber: '1234567890',
  address: '123 Main St',
  updates: 'Patient is stable.',
  emergencyContact: { name: 'Bob', relationship: 'Husband', phone: '0987654321' },
  doctorInformation: { name: 'Dr. Smith', hospital: 'General Hospital' },
  dosageInformation: [
    {
      medication_id: { name: 'Levodopa' },
      dosage_amount: '100mg',
      timing: ['Morning', 'Evening'],
      frequency: '2x/day',
    },
  ],
  tremorsInformation: { values: [{ y: 10 }, { y: 20 }, { y: 15 }] },
};

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockPatient),
  });
});

it('renders patient name after loading', async () => {
  const { findByText } = render(<Patient />);
  expect(await findByText('Name: Alice')).toBeTruthy();
});

it('renders medication name after loading', async () => {
  const { findByText } = render(<Patient />);
  expect(await findByText('Levodopa')).toBeTruthy();
});