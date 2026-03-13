import * as XLSX from 'xlsx';

export const parseExcelToQuestions = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target.result;
        // Đọc file excel từ dạng binary
        const workbook = XLSX.read(data, { type: 'binary' });
        
        // Lấy sheet đầu tiên
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Chuyển sheet thành mảng JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Map dữ liệu từ Excel sang format State của React
        const parsedQuestions = jsonData.map((row, index) => {
          const correctLetter = (row['DapAnDung'] || '').toString().trim().toUpperCase();

          return {
            id: Date.now() + index, // Tạo ID duy nhất
            text: row['CauHoi'] || '',
            options: [
              { text: row['DapAnA'] || '', isCorrect: correctLetter === 'A' },
              { text: row['DapAnB'] || '', isCorrect: correctLetter === 'B' },
              { text: row['DapAnC'] || '', isCorrect: correctLetter === 'C' },
              { text: row['DapAnD'] || '', isCorrect: correctLetter === 'D' },
            ]
          };
        });

        resolve(parsedQuestions);
      } catch (error) {
        reject("Lỗi khi đọc file Excel. Vui lòng kiểm tra lại định dạng.");
      }
    };

    reader.onerror = (error) => {
      reject("Lỗi hệ thống khi đọc file.");
    };

    reader.readAsBinaryString(file);
  });
};