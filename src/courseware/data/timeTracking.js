/**
 * Client-side time-spent tracking.
 *
 * There is currently no backend field/endpoint that persists how long a learner has spent on a
 * course (see the stubbed `postTimeSpent` call in `./api.js`), so until that lands on the LMS side,
 * elapsed time is accumulated here in localStorage, keyed per course. `CoursewareContainer` starts
 * a session timer every time a learner opens an ongoing course and periodically flushes elapsed
 * seconds into this store. The learner dashboard's Progress Summary widget
 * (frontend-app-learner-dashboard) reads the same storage key namespace to compute a "Total Time
 * Spent" stat across all of a learner's enrolled courses.
 *
 * NOTE: this only works when both MFEs are served from the same browser origin (so they share
 * localStorage), and only reflects time spent in the current browser/device.
 */

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
