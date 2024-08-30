import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFetchQuestions } from './useFetchQuestions';

const queryClient = new QueryClient();

const TestComponent: React.FC = () => {
  const { data, error, isSuccess, isLoading } = useFetchQuestions();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (isSuccess) {
    return (
      <div>
        {data.map((question, index) => (
          <div key={index}>{question.question}</div>
        ))}
      </div>
    );
  }

  return null;
};

test('should fetch and display questions', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      results: [
        {
          question: 'Sample question',
          type: 'boolean',
          correct_answer: 'True',
          incorrect_answers: [],
          category: 'General',
          difficulty: 'Easy'
        }
      ]
    }),
  }) as jest.Mock;

  render(
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Sample question')).toBeInTheDocument();
  });
});
