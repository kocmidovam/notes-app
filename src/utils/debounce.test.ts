import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not call callback immediately", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();

    expect(callback).not.toHaveBeenCalled();
  });

  it("calls callback after delay has passed", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();
    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("calls callback only once when invoked multiple times", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();
    debounced();
    debounced();
    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("resets the timer on each call", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced();
    vi.advanceTimersByTime(200);
    debounced(); // resets the timer
    vi.advanceTimersByTime(200); // 400ms total, but only 200ms since the last call

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100); // now 300ms have passed since the last call

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("passes the correct arguments to the callback", () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced("hello", 42);
    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledWith("hello", 42);
  });

  it("uses the default delay of 300ms when none is provided", () => {
    const callback = vi.fn();
    const debounced = debounce(callback); // no delay argument provided

    debounced();
    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
