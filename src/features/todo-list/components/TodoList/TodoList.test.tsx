import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { Mock } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as hooks from '../../hooks/useTodoList';
import { TodoStatus } from '../../types';
import { TodoList } from './';

// Mock the useTodoList hook
vi.mock('../../hooks/useTodoList', () => ({
  useTodoList: vi.fn(),
}));

describe('TodoList Component', () => {
  const mockSave = vi.fn();
  const mockRemove = vi.fn();
  const mockComplete = vi.fn();
  const mockRemoveComplete = vi.fn();
  const initialItems = [
    { id: '1', name: 'Test Task 1', status: TodoStatus.WAITING },
    { id: '2', name: 'Test Task 2', status: TodoStatus.COMPLETE },
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Setup the mock implementation
    (hooks.useTodoList as Mock).mockReturnValue({
      items: initialItems,
      save: mockSave,
      remove: mockRemove,
      complete: mockComplete,
      removeComplete: mockRemoveComplete,
    });
  });

  test('renders todo list and interactions', async () => {
    render(<TodoList />);

    // Check if the component renders correctly
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByLabelText('Task Name')).toBeInTheDocument();

    // Simulate user typing a new task name
    const input = screen.getByLabelText('Task Name');
    await userEvent.type(input, 'New Task');

    // Simulate pressing enter to save the task
    fireEvent.keyDown(input, { key: 'Enter' });

    // Check if save function was called
    expect(mockSave).toHaveBeenCalled();

    // Get all buttons with the label 'Remove Task'
    const removeButtons = screen.getAllByLabelText('Remove Task');
    expect(removeButtons.length).toBeGreaterThan(0); // Check if buttons are present

    // Interact with a specific button, for example, the first one
    removeButtons[0] && (await userEvent.click(removeButtons[0]));
    expect(mockRemove).toHaveBeenCalledWith('1');

    // Check editing a task
    const editButtons = screen.getAllByLabelText('Edit Task');
    editButtons[0] && (await userEvent.click(editButtons[0]));
    expect(screen.getByLabelText('Task Name')).toHaveValue('Test Task 1');
  });

  test('removes complete tasks', async () => {
    render(<TodoList />);

    const removeCompleteButton = screen.getByText('Remove all complete tasks');
    expect(removeCompleteButton).toBeEnabled(); // Ensure the button is enabled
    await userEvent.click(removeCompleteButton);
    expect(mockRemoveComplete).toHaveBeenCalledWith(['2']);
  });
});
