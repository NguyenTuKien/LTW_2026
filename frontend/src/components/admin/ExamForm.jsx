import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const ExamForm = ({ exam, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    exam || {
      title: '',
      description: '',
      subject: '',
      duration: 60,
      totalPoints: 100,
      questions: [],
    }
  );

  const [questions, setQuestions] = useState(exam?.questions || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      options: [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false },
      ],
      points: 5,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, [field]: value } : q))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, questions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Exam Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <Input
          label="Duration (minutes)"
          name="duration"
          type="number"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <Input
          label="Total Points"
          name="totalPoints"
          type="number"
          value={formData.totalPoints}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Questions</h3>
          <Button type="button" variant="primary" onClick={handleAddQuestion}>
            + Add Question
          </Button>
        </div>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="border p-4 rounded-lg">
              <p className="font-semibold mb-2">Question {index + 1}</p>
              <Input
                placeholder="Question text"
                value={question.text}
                onChange={(e) =>
                  handleQuestionChange(question.id, 'text', e.target.value)
                }
              />
              {/* Add options fields here */}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="success">
          {exam ? 'Update' : 'Create'} Exam
        </Button>
      </div>
    </form>
  );
};

export default ExamForm;
