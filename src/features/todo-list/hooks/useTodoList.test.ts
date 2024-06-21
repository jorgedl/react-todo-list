import { beforeEach, expect, test, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useTodoList } from './useTodoList';
import { TodoStatus } from '../types';

interface LocalStorageMock {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  clear(): void;
  removeItem(key: string): void;
}

const localStorageMock: LocalStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value;
    },
    clear(): void {
      store = {};
    },
    removeItem(key: string): void {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(localStorage, 'setItem');
});

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

test('useTodoList initializes correctly and manages state', () => {
  const { result } = renderHook(() => useTodoList());

  expect(result.current.items).toEqual([]);

  // Simulate adding a todo
  act(() => {
    result.current.save({ name: 'Create unit tests' });
  });

  expect(result.current.items.length).toBe(1);
  expect(result.current.items[0]?.name).toBe('Create unit tests');

  // Check localStorage interaction
  expect(localStorage.setItem).toHaveBeenCalledWith('@todos-state', JSON.stringify(result.current.items));

  // Complete a task
  act(() => {
    result.current.items[0] && result.current.complete(result.current.items[0].id);
  });

  expect(result.current.items[0]?.status).not.toBe(TodoStatus.WAITING);

  // Remove a task
  act(() => {
    result.current.items[0] && result.current.remove(result.current.items[0].id);
  });

  expect(result.current.items.length).toBe(0);
});
