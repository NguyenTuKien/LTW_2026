import { examResult } from '../../data/studentExamResultData';
import './Result.css';

const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.toLocaleDateString('vi-VN')} ${date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

function Result() {
  const totalQuestions = examResult.questions.length;
  const correctCount = examResult.questions.filter(
    (question) => question.selectedAnswer === question.correctAnswer
  ).length;
  const answeredCount = examResult.questions.filter((question) => question.selectedAnswer).length;
  const unansweredCount = totalQuestions - answeredCount;
  const wrongCount = answeredCount - correctCount;

  const score = Number(((correctCount / totalQuestions) * 10).toFixed(2));
  const accuracy = Number(((correctCount / totalQuestions) * 100).toFixed(1));
  const wrongRate = Number(((wrongCount / totalQuestions) * 100).toFixed(1));
  const emptyRate = Number(((unansweredCount / totalQuestions) * 100).toFixed(1));
  const passStatus = score >= examResult.passScore ? 'Đạt' : 'Không đạt';

  const ringRadius = 54;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (accuracy / 100) * ringCircumference;

  const topicStats = Object.values(
    examResult.questions.reduce((accumulator, question) => {
      if (!accumulator[question.topic]) {
        accumulator[question.topic] = {
          topic: question.topic,
          total: 0,
          correct: 0,
        };
      }
      accumulator[question.topic].total += 1;
      if (question.selectedAnswer === question.correctAnswer) {
        accumulator[question.topic].correct += 1;
      }
      return accumulator;
    }, {})
  ).map((topic) => ({
    ...topic,
    accuracy: Number(((topic.correct / topic.total) * 100).toFixed(1)),
  }));

  return (
    <div className="result-page">
      <main className="result-wrapper">
        <section className="result-summary">
          <div className="summary-header">
            <div>
              <h1>Kết quả bài thi</h1>
              <p>
                {examResult.studentName} - {examResult.studentCode}
              </p>
              <p>
                {examResult.examName} ({examResult.examCode})
              </p>
              <p>Thời điểm nộp: {formatDateTime(examResult.submittedAt)}</p>
            </div>
            <div className={`result-status ${score >= examResult.passScore ? 'pass' : 'fail'}`}>
              <span className="status-icon">{score >= examResult.passScore ? '✓' : '✕'}</span>
              <span>{passStatus}</span>
            </div>
          </div>

          <div className="result-overview">
            <div className="score-ring-card">
              <div className="score-ring-wrap">
                <svg viewBox="0 0 140 140" className="score-ring-svg">
                  <circle cx="70" cy="70" r={ringRadius} className="score-ring-track" />
                  <circle
                    cx="70"
                    cy="70"
                    r={ringRadius}
                    className="score-ring-fill"
                    style={{
                      strokeDasharray: ringCircumference,
                      strokeDashoffset: ringOffset,
                    }}
                  />
                </svg>
                <div className="score-ring-center">
                  <strong>{score}</strong>
                  <span>trên 10</span>
                </div>
              </div>
            </div>

            <div className="result-stats-grid">
              <div className="result-card success">
                <span>Số câu đúng / tổng</span>
                <strong>
                  {correctCount}/{totalQuestions}
                </strong>
              </div>
              <div className="result-card danger">
                <span>Số câu sai</span>
                <strong>{wrongCount}</strong>
              </div>
              <div className="result-card info">
                <span>Thời gian làm bài</span>
                <strong>{examResult.durationMinutes} phút</strong>
              </div>
              <div className="result-card neutral">
                <span>Câu bỏ trống</span>
                <strong>{unansweredCount}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="result-analytics">
          <h2>Thống kê</h2>

          <div className="analytics-item">
            <div className="analytics-label">
              <span>Tỷ lệ đúng</span>
              <strong>{accuracy}%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill success" style={{ width: `${accuracy}%` }} />
            </div>
          </div>

          <div className="analytics-item">
            <div className="analytics-label">
              <span>Tỷ lệ sai</span>
              <strong>{wrongRate}%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill danger" style={{ width: `${wrongRate}%` }} />
            </div>
          </div>

          <div className="analytics-item">
            <div className="analytics-label">
              <span>Tỷ lệ bỏ trống</span>
              <strong>{emptyRate}%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill neutral" style={{ width: `${emptyRate}%` }} />
            </div>
          </div>

          <div className="analytics-row">
            <div>
              <span>Điểm tối thiểu để đạt</span>
              <strong>{examResult.passScore}/10</strong>
            </div>
            <div>
              <span>Tỷ lệ đã trả lời</span>
              <strong>{((answeredCount / totalQuestions) * 100).toFixed(1)}%</strong>
            </div>
          </div>

          <h3>Hiệu quả theo chủ đề</h3>
          <div className="topic-list">
            {topicStats.map((topic) => (
              <div key={topic.topic} className="topic-item">
                <div className="topic-head">
                  <span>{topic.topic}</span>
                  <strong>
                    {topic.correct}/{topic.total} ({topic.accuracy}%)
                  </strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill info" style={{ width: `${topic.accuracy}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="result-review">
          <h2>Xem lại bài làm chi tiết</h2>
          {examResult.questions.map((question) => {
            const isCorrect = question.selectedAnswer === question.correctAnswer;
            return (
              <article
                key={question.id}
                className={`review-question ${
                  !question.selectedAnswer ? 'empty' : isCorrect ? 'correct' : 'wrong'
                }`}
              >
                <header>
                  <span>Câu {question.id}</span>
                  <strong>{!question.selectedAnswer ? 'Bỏ trống' : isCorrect ? 'Đúng' : 'Sai'}</strong>
                </header>
                <p className="review-text">{question.text}</p>
                <div className="review-options">
                  {question.options.map((option) => {
                    const isSelected = option === question.selectedAnswer;
                    const isAnswer = option === question.correctAnswer;
                    return (
                      <div
                        key={`${question.id}-${option}`}
                        className={`review-option ${isAnswer ? 'answer' : isSelected ? 'selected' : ''}`}
                      >
                        <span>{option}</span>
                        <small>{isAnswer ? 'Đáp án đúng' : isSelected ? 'Bạn đã chọn' : ''}</small>
                      </div>
                    );
                  })}
                </div>
                {question.explanation && (
                  <div className="review-explanation">
                    <span>Giải thích</span>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Result;
