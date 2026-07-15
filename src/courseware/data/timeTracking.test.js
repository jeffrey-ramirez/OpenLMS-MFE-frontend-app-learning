import { getStoredTimeSpent, addTimeSpent, getTimeTrackingStorageKey } from './timeTracking';

describe('timeTracking', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('getStoredTimeSpent', () => {
    it('returns 0 when nothing is stored', () => {
      expect(getStoredTimeSpent('course-1')).toBe(0);
    });

    it('returns 0 when no courseId is given', () => {
      expect(getStoredTimeSpent(null)).toBe(0);
    });

    it('reads back a previously stored value', () => {
      window.localStorage.setItem(getTimeTrackingStorageKey('course-1'), '42');
      expect(getStoredTimeSpent('course-1')).toBe(42);
    });
  });

  describe('addTimeSpent', () => {
    it('accumulates seconds across multiple calls for the same course', () => {
      addTimeSpent('course-1', 30);
      addTimeSpent('course-1', 45);
      expect(getStoredTimeSpent('course-1')).toBe(75);
    });

    it('tracks different courses independently', () => {
      addTimeSpent('course-1', 30);
      addTimeSpent('course-2', 10);
      expect(getStoredTimeSpent('course-1')).toBe(30);
      expect(getStoredTimeSpent('course-2')).toBe(10);
    });

    it('is a no-op for zero, negative, or missing values', () => {
      addTimeSpent('course-1', 0);
      addTimeSpent('course-1', -5);
      addTimeSpent(null, 30);
      expect(getStoredTimeSpent('course-1')).toBe(0);
    });
  });
});
