
export const TIME_TRACKING_STORAGE_KEY_PREFIX = 'edx.timeTracking.course.';

export const getTimeTrackingStorageKey = (courseId) => `${TIME_TRACKING_STORAGE_KEY_PREFIX}${courseId}`;

export const getStoredTimeSpent = (courseId) => {
  if (!courseId) {
    return 0;
  }
  try {
    const raw = window.localStorage.getItem(getTimeTrackingStorageKey(courseId));
    const seconds = parseInt(raw, 10);
    return Number.isNaN(seconds) ? 0 : seconds;
  } catch (error) {
    // localStorage may be unavailable (e.g. disabled, private browsing quota). Fail quietly.
    return 0;
  }
};

/**
 * Adds `seconds` to the running total of time spent tracked for `courseId`.
 * @returns {number} the new running total, in seconds.
 */
export const addTimeSpent = (courseId, seconds) => {
  if (!courseId || !seconds || seconds <= 0) {
    return getStoredTimeSpent(courseId);
  }
  const total = getStoredTimeSpent(courseId) + Math.round(seconds);
  try {
    window.localStorage.setItem(getTimeTrackingStorageKey(courseId), String(total));
  } catch (error) {
    // Ignore write failures (e.g. storage quota exceeded / disabled).
  }
  return total;
};

export default {
  getTimeTrackingStorageKey,
  getStoredTimeSpent,
  addTimeSpent,
};
