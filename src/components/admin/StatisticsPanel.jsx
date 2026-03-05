import React, { useEffect, useMemo, useRef, useState } from 'react';
import './StatisticsPanel.css';

const PAGE_SIZE = 4;

const REPORT_ROWS = [
  { id: 1, code: 'EX-2026-001', title: 'Kỳ thi cuối kỳ I (2026)', type: 'Thời gian cụ thể', participants: 1250, completionRate: 98.5, avgScore: 7.8, status: 'Đã kết thúc', date: '2026-12-20' },
  { id: 2, code: 'EX-2026-002', title: 'Kỳ thi giữa kỳ II (2026)', type: 'Thời gian cụ thể', participants: 850, completionRate: 45.2, avgScore: 6.5, status: 'Đang diễn ra', date: '2026-12-18' },
  { id: 3, code: 'EX-2026-003', title: 'Đánh giá năng lực Tiếng Anh (2026)', type: 'Tự do', participants: 3500, completionRate: 0, avgScore: null, status: 'Sắp diễn ra', date: '2026-12-24' },
  { id: 4, code: 'EX-2026-004', title: 'Kỳ thi Kỹ năng mềm (2026)', type: 'Tự do', participants: 2100, completionRate: 99.1, avgScore: 8.2, status: 'Đã kết thúc', date: '2026-12-26' },
  { id: 5, code: 'EX-2026-005', title: 'Thi thử môn CSDL (2026)', type: 'Thời gian cụ thể', participants: 670, completionRate: 70.4, avgScore: 7.1, status: 'Đang diễn ra', date: '2026-12-12' },
  { id: 6, code: 'EX-2026-006', title: 'Bài thi Java nâng cao (2026)', type: 'Thời gian cụ thể', participants: 910, completionRate: 88.2, avgScore: 8.0, status: 'Đã kết thúc', date: '2026-12-05' },
  { id: 7, code: 'EX-2026-007', title: 'Kiểm tra mạng máy tính (2026)', type: 'Tự do', participants: 780, completionRate: 52.6, avgScore: 6.9, status: 'Đang diễn ra', date: '2026-12-14' },
  { id: 8, code: 'EX-2026-008', title: 'Quiz thuật toán tuần 3 (2026)', type: 'Tự do', participants: 520, completionRate: 67.3, avgScore: 7.4, status: 'Đã kết thúc', date: '2026-12-09' },
  { id: 9, code: 'EX-2026-009', title: 'Đánh giá an toàn thông tin (2026)', type: 'Thời gian cụ thể', participants: 430, completionRate: 21.9, avgScore: 5.8, status: 'Đang diễn ra', date: '2026-12-21' },
  { id: 10, code: 'EX-2026-010', title: 'Thi thử TOEIC nội bộ (2026)', type: 'Tự do', participants: 620, completionRate: 64.2, avgScore: 7.3, status: 'Đã kết thúc', date: '2026-12-15' },
  { id: 11, code: 'EX-2026-011', title: 'Ôn tập giữa kỳ Python (2026)', type: 'Tự do', participants: 460, completionRate: 34.8, avgScore: 6.1, status: 'Sắp diễn ra', date: '2026-12-28' },
  { id: 12, code: 'EX-2026-012', title: 'Kiểm tra phân tích thiết kế HTTT (2026)', type: 'Thời gian cụ thể', participants: 590, completionRate: 79.7, avgScore: 7.7, status: 'Đã kết thúc', date: '2026-12-11' },
];

const SCORE_DISTRIBUTION = {
  labels: ['Giỏi (25%)', 'Khá (45%)', 'Trung bình (20%)', 'Yếu (10%)'],
  values: [25, 45, 20, 10],
  colors: ['#ef1212', '#3b82f6', '#eab308', '#94a3b8'],
};

const WEEKLY_TRENDS = {
  all: [1180, 1360, 970, 1910],
  'EX-2026-001': [980, 1320, 1100, 2020],
  'EX-2026-002': [560, 720, 690, 820],
  'EX-2026-003': [200, 320, 410, 520],
  'EX-2026-004': [840, 920, 870, 1030],
};

const STATUS_OPTIONS = ['Tất cả', 'Đang diễn ra', 'Sắp diễn ra', 'Đã kết thúc'];

const toDateValue = (value) => new Date(`${value}T00:00:00`).getTime();

const getStatusClass = (status) => {
  if (status === 'Đang diễn ra') return 'live';
  if (status === 'Sắp diễn ra') return 'upcoming';
  return 'ended';
};

const formatNumber = (value) => value.toLocaleString('vi-VN');
const resetPageWithSetter = (setter, setPage) => (value) => {
  setter(value);
  setPage(1);
};

const StatisticsPanel = ({ headerSearchTerm = '' }) => {
  const [selectedExam, setSelectedExam] = useState('all');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [dateFrom, setDateFrom] = useState('2026-12-01');
  const [dateTo, setDateTo] = useState('2026-12-31');
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [chartReady, setChartReady] = useState(Boolean(window.Chart));

  const lineCanvasRef = useRef(null);
  const donutCanvasRef = useRef(null);
  const lineChartRef = useRef(null);
  const donutChartRef = useRef(null);
  const setExamFilter = resetPageWithSetter(setSelectedExam, setCurrentPage);
  const setStatus = resetPageWithSetter(setStatusFilter, setCurrentPage);
  const setFromDate = resetPageWithSetter(setDateFrom, setCurrentPage);
  const setToDate = resetPageWithSetter(setDateTo, setCurrentPage);
  const setTableKeyword = resetPageWithSetter(setTableSearch, setCurrentPage);

  const examOptions = useMemo(
    () => [
      { value: 'all', label: 'Tất cả kỳ thi' },
      ...REPORT_ROWS.map((row) => ({ value: row.code, label: row.title })),
    ],
    [],
  );

  const filteredRows = useMemo(() => {
    const combinedSearch = `${headerSearchTerm} ${tableSearch}`.trim().toLowerCase();
    const fromValue = toDateValue(dateFrom);
    const toValue = toDateValue(dateTo);

    return REPORT_ROWS.filter((row) => {
      const examMatch = selectedExam === 'all' || row.code === selectedExam;
      const statusMatch = statusFilter === 'Tất cả' || row.status === statusFilter;
      const rowDate = toDateValue(row.date);
      const dateMatch = rowDate >= fromValue && rowDate <= toValue;
      const textMatch =
        !combinedSearch ||
        [row.code, row.title, row.type, row.status]
          .join(' ')
          .toLowerCase()
          .includes(combinedSearch);

      return examMatch && statusMatch && dateMatch && textMatch;
    });
  }, [dateFrom, dateTo, headerSearchTerm, selectedExam, statusFilter, tableSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, safePage]);

  const averageScore = useMemo(() => {
    const valid = filteredRows.filter((row) => typeof row.avgScore === 'number');
    if (!valid.length) return 0;
    return valid.reduce((sum, row) => sum + row.avgScore, 0) / valid.length;
  }, [filteredRows]);

  const activeTrend = useMemo(() => {
    if (selectedExam !== 'all' && WEEKLY_TRENDS[selectedExam]) {
      return WEEKLY_TRENDS[selectedExam];
    }
    return WEEKLY_TRENDS.all;
  }, [selectedExam]);

  const totalTrendAttempts = useMemo(() => activeTrend.reduce((sum, value) => sum + value, 0), [activeTrend]);

  useEffect(() => {
    if (window.Chart) return undefined;

    let script = document.querySelector('script[data-chartjs-cdn="true"]');
    let isInjected = false;
    const handleLoad = () => setChartReady(true);

    if (!script) {
      script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.async = true;
      script.dataset.chartjsCdn = 'true';
      document.head.appendChild(script);
      isInjected = true;
    }

    script.addEventListener('load', handleLoad);

    return () => {
      script.removeEventListener('load', handleLoad);
      if (isInjected && !window.Chart) {
        script.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!chartReady || !lineCanvasRef.current) return;
    const ChartLib = window.Chart;
    if (!ChartLib) return;

    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

    const context = lineCanvasRef.current.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, 'rgba(239, 18, 18, 0.30)');
    gradient.addColorStop(1, 'rgba(239, 18, 18, 0)');

    lineChartRef.current = new ChartLib(context, {
      type: 'line',
      data: {
        labels: ['TUẦN 1', 'TUẦN 2', 'TUẦN 3', 'TUẦN 4'],
        datasets: [
          {
            data: activeTrend,
            borderColor: '#ef1212',
            borderWidth: 2.5,
            backgroundColor: gradient,
            fill: true,
            tension: 0.45,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (item) => `${formatNumber(item.parsed.y)} lượt`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#64748b',
              font: { size: 12, weight: 600 },
            },
            border: { display: false },
          },
          y: {
            display: false,
            beginAtZero: true,
            border: { display: false },
          },
        },
      },
    });

    return () => lineChartRef.current?.destroy();
  }, [activeTrend, chartReady]);

  useEffect(() => {
    if (!chartReady || !donutCanvasRef.current) return;
    const ChartLib = window.Chart;
    if (!ChartLib) return;

    if (donutChartRef.current) {
      donutChartRef.current.destroy();
    }

    const context = donutCanvasRef.current.getContext('2d');
    donutChartRef.current = new ChartLib(context, {
      type: 'doughnut',
      data: {
        labels: SCORE_DISTRIBUTION.labels,
        datasets: [
          {
            data: SCORE_DISTRIBUTION.values,
            backgroundColor: SCORE_DISTRIBUTION.colors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (item) => `${item.label}: ${item.parsed}%`,
            },
          },
        },
      },
    });

    return () => donutChartRef.current?.destroy();
  }, [chartReady]);

  const handleExportCsv = () => {
    const headers = ['Mã kỳ thi', 'Tên kỳ thi', 'Loại hình', 'Số thí sinh', 'Tỷ lệ hoàn thành', 'Điểm trung bình', 'Trạng thái'];
    const rows = filteredRows.map((row) => [
      row.code,
      row.title,
      row.type,
      row.participants,
      `${row.completionRate}%`,
      typeof row.avgScore === 'number' ? row.avgScore.toFixed(1) : '-',
      row.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([`\ufeff${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bao-cao-thong-ke.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const fromIndex = filteredRows.length ? (safePage - 1) * PAGE_SIZE + 1 : 0;
  const toIndex = Math.min(filteredRows.length, safePage * PAGE_SIZE);

  return (
    <main className="stats-page">
      <section className="stats-heading">
        <div>
          <h1>Thống kê và Báo cáo Tổng hợp</h1>
          <p>Xem chi tiết thống kê tham gia thi và điểm số</p>
        </div>
        <div className="stats-heading-actions">
          <button type="button" className="stats-outline-btn" onClick={handlePrintReport}>
            <span className="material-symbols-outlined">picture_as_pdf</span>
            Xuất file PDF
          </button>
          <button type="button" className="stats-outline-btn" onClick={handleExportCsv}>
            <span className="material-symbols-outlined">table_view</span>
            Xuất file Excel
          </button>
        </div>
      </section>

      <section className="stats-filter-card">
        <label>
          Chọn kỳ thi
          <select
            value={selectedExam}
            onChange={(event) => {
              setExamFilter(event.target.value);
            }}
          >
            {examOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Từ ngày - Đến ngày
          <div className="stats-date-range">
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => {
                setFromDate(event.target.value);
              }}
            />
            <span>-</span>
            <input
              type="date"
              value={dateTo}
              onChange={(event) => {
                setToDate(event.target.value);
              }}
            />
          </div>
        </label>

        <label>
          Trạng thái
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="stats-chart-grid">
        <article className="stats-chart-card">
          <header>
            <p>SỐ LƯỢT THAM GIA THEO THỜI GIAN</p>
            <span>+12%</span>
          </header>
          <h2>
            {formatNumber(totalTrendAttempts)} <small>lượt</small>
          </h2>
          <div className="stats-line-chart-wrap">
            <canvas ref={lineCanvasRef} aria-label="Biểu đồ lượt tham gia theo tuần" />
          </div>
        </article>

        <article className="stats-chart-card">
          <header>
            <p>PHÂN PHỐI ĐIỂM SỐ</p>
            <span>+5%</span>
          </header>
          <h2>
            {averageScore.toFixed(1)} <small>Điểm TB</small>
          </h2>
          <div className="stats-donut-layout">
            <div className="stats-donut-wrap">
              <canvas ref={donutCanvasRef} aria-label="Biểu đồ phân phối điểm" />
            </div>
            <ul className="stats-donut-legend">
              {SCORE_DISTRIBUTION.labels.map((label, index) => (
                <li key={label}>
                  <span style={{ backgroundColor: SCORE_DISTRIBUTION.colors[index] }} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="stats-table-card">
        <div className="stats-table-header">
          <h3>Thống kê chi tiết theo kỳ thi</h3>
          <div className="stats-table-search">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm mã, tên kỳ thi..."
              value={tableSearch}
              onChange={(event) => {
                setTableKeyword(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="stats-table-wrap">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Mã kỳ thi</th>
                <th>Tên kỳ thi</th>
                <th>Loại hình</th>
                <th>Số thí sinh</th>
                <th>Tỷ lệ hoàn thành</th>
                <th>Điểm trung bình</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="stats-code-chip">{row.code}</span>
                  </td>
                  <td className="stats-title-cell">{row.title}</td>
                  <td>{row.type}</td>
                  <td>{formatNumber(row.participants)}</td>
                  <td>
                    <div className="stats-completion">
                      <span className="stats-completion-value">{row.completionRate}%</span>
                      <div className="stats-progress-track">
                        <span style={{ width: `${Math.min(Math.max(row.completionRate, 0), 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td>{typeof row.avgScore === 'number' ? row.avgScore.toFixed(1) : '-'}</td>
                  <td>
                    <span className={`stats-status-badge ${getStatusClass(row.status)}`}>{row.status}</span>
                  </td>
                  <td>
                    <div className="stats-row-actions">
                      <button type="button" aria-label="Xem chi tiết">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button type="button" aria-label="Chỉnh sửa">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="stats-empty">
                    Không có dữ liệu phù hợp bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="stats-table-footer">
          <p>
            Hiển thị {fromIndex} đến {toIndex} trong số {filteredRows.length} kỳ thi
          </p>
          <div className="stats-pagination">
            <button type="button" disabled={safePage === 1} onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}>
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(0, 3)
              .map((page) => (
                <button
                  type="button"
                  key={page}
                  className={safePage === page ? 'active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            {totalPages > 3 && <span className="stats-ellipsis">...</span>}
            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Sau
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default StatisticsPanel;
