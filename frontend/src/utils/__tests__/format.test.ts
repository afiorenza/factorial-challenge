import { formatDate } from '@/utils/format';

test('should format date', () => {
  const date = new Date('2023-12-15T23:59:59');
  const expected = '2023-12-15 23:59:59';
  const result = formatDate(date);

  expect(result).toBe(expected);
});
