export const studentsData = [
  {
    id: 'B19DCCN123',
    name: 'Nguyễn Văn A',
    className: 'D19CQCN01-B',
    email: 'b19dccn123@stu.ptit.edu.vn',
    exams: [
      {
        id: 'oop-mid',
        name: 'Lập trình hướng đối tượng (Giữa kỳ)',
        score: 8.67,
        joinedAt: '2026-03-05T09:46:00',
        durationMinutes: 45,
        totalQuestions: 30,
        correctCount: 26,
        status: 'Hoàn thành',
        details: [
          {
            question: 'Lập trình hướng đối tượng là gì?',
            studentAnswer: 'Lập trình dựa trên đối tượng và lớp',
            correctAnswer: 'Lập trình dựa trên đối tượng và lớp',
            explanation: 'OOP tổ chức chương trình xoay quanh đối tượng và lớp.'
          },
          {
            question: 'Class (lớp) là gì?',
            studentAnswer: 'Một đối tượng cụ thể',
            correctAnswer: 'Bản thiết kế để tạo ra đối tượng',
            explanation: 'Class là khuôn mẫu dùng để tạo ra các object.'
          },
          {
            question: 'Object (đối tượng) là gì?',
            studentAnswer: 'Thể hiện cụ thể của một lớp',
            correctAnswer: 'Thể hiện cụ thể của một lớp',
            explanation: 'Object là thực thể được tạo ra từ class.'
          },
          {
            question: 'Encapsulation (đóng gói) giúp làm gì?',
            studentAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu',
            correctAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu',
            explanation: 'Đóng gói giúp che giấu chi tiết bên trong và chỉ cho phép truy cập qua phương thức công khai.'
          },
          {
            question: 'Inheritance (kế thừa) cho phép điều gì?',
            studentAnswer: 'Ngăn truy cập dữ liệu',
            correctAnswer: 'Một lớp sử dụng lại thuộc tính và phương thức của lớp khác',
            explanation: 'Kế thừa giúp tái sử dụng code từ lớp cha.'
          },
          {
            question: 'Polymorphism (đa hình) là gì?',
            studentAnswer: 'Một phương thức có nhiều cách triển khai',
            correctAnswer: 'Một phương thức có nhiều cách triển khai',
            explanation: 'Đa hình cho phép cùng một phương thức hoạt động khác nhau tùy đối tượng.'
          },
          {
            question: 'Abstraction (trừu tượng) giúp làm gì?',
            studentAnswer: 'Ẩn chi tiết và chỉ hiển thị chức năng cần thiết',
            correctAnswer: 'Ẩn chi tiết và chỉ hiển thị chức năng cần thiết',
            explanation: 'Trừu tượng giúp tập trung vào chức năng chính thay vì chi tiết triển khai.'
          },
          {
            question: 'Constructor dùng để làm gì?',
            studentAnswer: 'Khởi tạo đối tượng',
            correctAnswer: 'Khởi tạo đối tượng',
            explanation: 'Constructor được gọi khi tạo object để khởi tạo giá trị ban đầu.'
          },
          {
            question: 'Destructor có nhiệm vụ gì?',
            studentAnswer: 'Hủy object và giải phóng tài nguyên',
            correctAnswer: 'Hủy object và giải phóng tài nguyên',
            explanation: 'Destructor được gọi khi object bị hủy.'
          },
          {
            question: 'Từ khóa private có ý nghĩa gì?',
            studentAnswer: 'Chỉ truy cập trong cùng class',
            correctAnswer: 'Chỉ truy cập trong cùng class',
            explanation: 'private giới hạn phạm vi truy cập trong class.'
          },
          {
            question: 'Từ khóa public cho phép điều gì?',
            studentAnswer: 'Truy cập từ mọi nơi',
            correctAnswer: 'Truy cập từ mọi nơi',
            explanation: 'public cho phép truy cập từ bất kỳ đâu.'
          },
          {
            question: 'Overloading xảy ra khi nào?',
            studentAnswer: 'Cùng tên phương thức nhưng khác tham số',
            correctAnswer: 'Cùng tên phương thức nhưng khác tham số',
            explanation: 'Overloading là nạp chồng phương thức với danh sách tham số khác nhau.'
          },
          {
            question: 'Overriding là gì?',
            studentAnswer: 'Viết lại phương thức của lớp cha ở lớp con',
            correctAnswer: 'Viết lại phương thức của lớp cha ở lớp con',
            explanation: 'Overriding cho phép lớp con thay đổi hành vi phương thức lớp cha.'
          },
          {
            question: 'Abstract class có đặc điểm gì?',
            studentAnswer: 'Không thể tạo object trực tiếp',
            correctAnswer: 'Không thể tạo object trực tiếp',
            explanation: 'Abstract class phải được kế thừa và không thể khởi tạo trực tiếp.'
          },
          {
            question: 'Interface dùng để làm gì?',
            studentAnswer: 'Định nghĩa các phương thức không có thân hàm',
            correctAnswer: 'Định nghĩa các phương thức không có thân hàm',
            explanation: 'Interface định nghĩa hành vi mà lớp phải triển khai.'
          },
          {
            question: 'Từ khóa static thuộc về?',
            studentAnswer: 'Lớp',
            correctAnswer: 'Lớp',
            explanation: 'static thuộc về class thay vì object.'
          },
          {
            question: 'Từ khóa final dùng để?',
            studentAnswer: 'Ngăn ghi đè hoặc thay đổi',
            correctAnswer: 'Ngăn ghi đè hoặc thay đổi',
            explanation: 'final ngăn lớp bị kế thừa hoặc phương thức bị override.'
          },
          {
            question: 'Getter và Setter dùng để?',
            studentAnswer: 'Truy cập và thay đổi dữ liệu private',
            correctAnswer: 'Truy cập và thay đổi dữ liệu private',
            explanation: 'Getter/Setter giúp truy cập an toàn dữ liệu đã đóng gói.'
          },
          {
            question: 'Composition là gì?',
            studentAnswer: 'Lớp chứa đối tượng của lớp khác',
            correctAnswer: 'Lớp chứa đối tượng của lớp khác',
            explanation: 'Composition thể hiện mối quan hệ "has-a".'
          },
          {
            question: 'Aggregation khác Composition ở điểm nào?',
            studentAnswer: 'Đối tượng có thể tồn tại độc lập',
            correctAnswer: 'Đối tượng có thể tồn tại độc lập',
            explanation: 'Aggregation cho phép đối tượng tồn tại độc lập.'
          },
          {
            question: 'Java hỗ trợ đa kế thừa trực tiếp giữa các lớp không?',
            studentAnswer: 'Không',
            correctAnswer: 'Không',
            explanation: 'Java không hỗ trợ đa kế thừa lớp nhưng hỗ trợ qua interface.'
          },
          {
            question: 'Từ khóa this dùng để?',
            studentAnswer: 'Tham chiếu tới đối tượng hiện tại',
            correctAnswer: 'Tham chiếu tới đối tượng hiện tại',
            explanation: 'this đại diện cho instance hiện tại.'
          },
          {
            question: 'Từ khóa super dùng để?',
            studentAnswer: 'Gọi constructor hoặc phương thức lớp cha',
            correctAnswer: 'Gọi constructor hoặc phương thức lớp cha',
            explanation: 'super tham chiếu đến lớp cha.'
          },
          {
            question: 'Association thể hiện điều gì?',
            studentAnswer: 'Mối quan hệ giữa các lớp',
            correctAnswer: 'Mối quan hệ giữa các lớp',
            explanation: 'Association biểu diễn sự liên kết giữa các đối tượng.'
          },
          {
            question: 'OOP khác POP ở điểm chính nào?',
            studentAnswer: 'OOP tập trung vào đối tượng',
            correctAnswer: 'OOP tập trung vào đối tượng',
            explanation: 'OOP tổ chức chương trình dựa trên đối tượng thay vì hàm.'
          },
          {
            question: 'Sơ đồ lớp (Class Diagram) dùng để?',
            studentAnswer: 'Chạy chương trình',
            correctAnswer: 'Mô tả cấu trúc lớp và mối quan hệ',
            explanation: 'Class Diagram là một phần của UML.'
          },
          {
            question: 'UML là viết tắt của?',
            studentAnswer: 'Unified Modeling Language',
            correctAnswer: 'Unified Modeling Language',
            explanation: 'UML là ngôn ngữ mô hình hóa chuẩn dùng trong thiết kế phần mềm.'
          },
          {
            question: 'SOLID là gì?',
            studentAnswer: '5 nguyên lý thiết kế OOP',
            correctAnswer: '5 nguyên lý thiết kế OOP',
            explanation: 'SOLID gồm 5 nguyên tắc giúp thiết kế phần mềm tốt hơn.'
          },
          {
            question: 'Dependency Injection giúp điều gì?',
            studentAnswer: '',
            correctAnswer: 'Giảm phụ thuộc giữa các lớp',
            explanation: 'DI giúp code linh hoạt và dễ kiểm thử hơn.'
          },
          {
            question: 'Exception trong OOP dùng để?',
            studentAnswer: 'Xử lý lỗi khi chương trình chạy',
            correctAnswer: 'Xử lý lỗi khi chương trình chạy',
            explanation: 'Exception giúp xử lý các tình huống lỗi một cách có kiểm soát.'
          }
        ],
      },
      {
        id: 'db-final',
        name: 'Cơ sở Dữ liệu (Cuối kỳ)',
        score: 4.0,
        joinedAt: '2025-12-20T09:45:00',
        durationMinutes: 60,
        totalQuestions: 30,
        correctCount: 12,
        status: 'Không hoàn thành',
        details: [
          {
            question: 'Khóa chính (Primary Key) có đặc điểm gì?',
            studentAnswer: 'Cho phép giá trị NULL',
            correctAnswer: 'Không được NULL và phải duy nhất',
            explanation: 'Primary Key dùng để định danh duy nhất mỗi bản ghi và không được chứa NULL.'
          },
          {
            question: 'Khóa ngoại (Foreign Key) dùng để làm gì?',
            studentAnswer: 'Liên kết giữa hai bảng',
            correctAnswer: 'Liên kết giữa hai bảng',
            explanation: 'Foreign Key tạo mối quan hệ giữa bảng này với Primary Key của bảng khác.'
          },
          {
            question: 'Chuẩn hóa dữ liệu nhằm mục đích gì?',
            studentAnswer: 'Giảm dư thừa dữ liệu',
            correctAnswer: 'Giảm dư thừa dữ liệu',
            explanation: 'Chuẩn hóa giúp loại bỏ dư thừa và tránh bất thường khi cập nhật.'
          },
          {
            question: 'Dạng chuẩn 1NF yêu cầu điều gì?',
            studentAnswer: 'Bảng phải có khóa ngoại',
            correctAnswer: 'Mỗi ô chỉ chứa một giá trị nguyên tử',
            explanation: '1NF yêu cầu dữ liệu không được lặp nhóm và phải là giá trị nguyên tử.'
          },
          {
            question: 'Lệnh SQL dùng để truy vấn dữ liệu là gì?',
            studentAnswer: 'SELECT',
            correctAnswer: 'SELECT',
            explanation: 'SELECT dùng để truy xuất dữ liệu từ bảng.'
          },
          {
            question: 'Lệnh UPDATE dùng để làm gì?',
            studentAnswer: '',
            correctAnswer: 'Cập nhật dữ liệu trong bảng',
            explanation: 'UPDATE thay đổi giá trị của các bản ghi đã tồn tại.'
          },
          {
            question: 'INNER JOIN trả về kết quả như thế nào?',
            studentAnswer: 'Tất cả bản ghi từ bảng trái',
            correctAnswer: 'Chỉ các bản ghi khớp ở cả hai bảng',
            explanation: 'INNER JOIN chỉ trả về các dòng có điều kiện khớp giữa hai bảng.'
          },
          {
            question: 'Chỉ mục (INDEX) có tác dụng gì?',
            studentAnswer: 'Tăng tốc độ truy vấn',
            correctAnswer: 'Tăng tốc độ truy vấn',
            explanation: 'INDEX giúp tìm kiếm dữ liệu nhanh hơn nhưng tốn thêm bộ nhớ.'
          },
          {
            question: 'HAVING khác WHERE ở điểm nào?',
            studentAnswer: '',
            correctAnswer: 'HAVING dùng với GROUP BY',
            explanation: 'HAVING lọc dữ liệu sau khi nhóm, còn WHERE lọc trước khi nhóm.'
          },
          {
            question: 'Lệnh tạo bảng trong SQL là gì?',
            studentAnswer: 'MAKE TABLE',
            correctAnswer: 'CREATE TABLE',
            explanation: 'CREATE TABLE dùng để tạo bảng mới trong cơ sở dữ liệu.'
          }
        ],
      },
      {
        id: 'web-mid',
        name: 'Lập trình Web (Giữa kỳ)',
        score: 9.0,
        joinedAt: '2026-02-10T14:15:00',
        durationMinutes: 50,
        totalQuestions: 35,
        correctCount: 30,
        status: 'Hoàn thành',
        details: [
          {
            question: 'HTML viết tắt của cụm từ nào?',
            studentAnswer: 'HyperText Markup Language',
            correctAnswer: 'HyperText Markup Language',
            explanation: 'HTML là ngôn ngữ đánh dấu dùng để cấu trúc nội dung trang web.'
          },
          {
            question: 'Thẻ nào dùng để tạo liên kết trong HTML?',
            studentAnswer: '<a>',
            correctAnswer: '<a>',
            explanation: 'Thẻ <a> (anchor) được dùng để tạo hyperlink.'
          },
          {
            question: 'CSS dùng để làm gì?',
            studentAnswer: 'Định dạng và tạo kiểu giao diện',
            correctAnswer: 'Định dạng và tạo kiểu giao diện',
            explanation: 'CSS kiểm soát cách hiển thị của các phần tử HTML.'
          },
          {
            question: 'Thuộc tính nào trong CSS dùng để đổi màu chữ?',
            studentAnswer: 'color',
            correctAnswer: 'color',
            explanation: 'color dùng để thay đổi màu chữ, background-color đổi màu nền.'
          },
          {
            question: 'JavaScript chạy ở đâu?',
            studentAnswer: 'Trình duyệt',
            correctAnswer: 'Trình duyệt',
            explanation: 'JavaScript chủ yếu chạy phía client trong trình duyệt.'
          },
          {
            question: 'DOM là viết tắt của gì?',
            studentAnswer: 'Document Object Model',
            correctAnswer: 'Document Object Model',
            explanation: 'DOM là mô hình đối tượng tài liệu cho phép thao tác HTML bằng JavaScript.'
          },
          {
            question: 'HTTP status code 404 nghĩa là gì?',
            studentAnswer: 'Not Found',
            correctAnswer: 'Not Found',
            explanation: '404 nghĩa là tài nguyên không được tìm thấy trên server.'
          },
          {
            question: 'Framework frontend phổ biến hiện nay là gì?',
            studentAnswer: 'Spring Boot',
            correctAnswer: 'React',
            explanation: 'React là thư viện JavaScript phổ biến để xây dựng giao diện người dùng.'
          },
          {
            question: 'Phương thức GET khác POST ở điểm nào?',
            studentAnswer: 'GET gửi dữ liệu qua URL',
            correctAnswer: 'GET gửi dữ liệu qua URL',
            explanation: 'GET truyền dữ liệu qua URL, còn POST gửi trong body request.'
          },
          {
            question: 'LocalStorage dùng để làm gì?',
            studentAnswer: 'Lưu trữ dữ liệu phía client',
            correctAnswer: 'Lưu trữ dữ liệu phía client',
            explanation: 'LocalStorage cho phép lưu dữ liệu lâu dài trên trình duyệt người dùng.'
          }
        ],
      },
    ],
  },
  {
    id: 'B20DCCN222',
    name: 'Trần Thị B',
    className: 'D20CQCN04-A',
    email: 'b20dccn222@stu.ptit.edu.vn',
    exams: [
      {
        id: 'oop-mid',
        name: 'Lập trình hướng đối tượng (Giữa kỳ)',
        score: 8,
        joinedAt: '2026-03-05T09:46:00',
        durationMinutes: 45,
        totalQuestions: 30,
        correctCount: 24,
        status: 'Hoàn thành',
        details: [
          {
            question: 'Lập trình hướng đối tượng là gì?',
            studentAnswer: 'Lập trình dựa trên đối tượng và lớp',
            correctAnswer: 'Lập trình dựa trên đối tượng và lớp',
            explanation: 'OOP tổ chức chương trình xoay quanh đối tượng và lớp.'
          },
          {
            question: 'Class (lớp) là gì?',
            studentAnswer: 'Một đối tượng cụ thể',
            correctAnswer: 'Bản thiết kế để tạo ra đối tượng',
            explanation: 'Class là khuôn mẫu dùng để tạo ra các object.'
          },
          {
            question: 'Object (đối tượng) là gì?',
            studentAnswer: 'Thể hiện cụ thể của một lớp',
            correctAnswer: 'Thể hiện cụ thể của một lớp',
            explanation: 'Object là thực thể được tạo ra từ class.'
          },
          {
            question: 'Encapsulation (đóng gói) giúp làm gì?',
            studentAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu',
            correctAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu',
            explanation: 'Đóng gói giúp che giấu chi tiết bên trong và chỉ cho phép truy cập qua phương thức công khai.'
          },
          {
            question: 'Inheritance (kế thừa) cho phép điều gì?',
            studentAnswer: 'Ngăn truy cập dữ liệu',
            correctAnswer: 'Một lớp sử dụng lại thuộc tính và phương thức của lớp khác',
            explanation: 'Kế thừa giúp tái sử dụng code từ lớp cha.'
          },
          {
            question: 'Polymorphism (đa hình) là gì?',
            studentAnswer: 'Một phương thức có nhiều cách triển khai',
            correctAnswer: 'Một phương thức có nhiều cách triển khai',
            explanation: 'Đa hình cho phép cùng một phương thức hoạt động khác nhau tùy đối tượng.'
          },
          {
            question: 'Abstraction (trừu tượng) giúp làm gì?',
            studentAnswer: 'Ẩn chi tiết và chỉ hiển thị chức năng cần thiết',
            correctAnswer: 'Ẩn chi tiết và chỉ hiển thị chức năng cần thiết',
            explanation: 'Trừu tượng giúp tập trung vào chức năng chính thay vì chi tiết triển khai.'
          },
          {
            question: 'Constructor dùng để làm gì?',
            studentAnswer: 'Khởi tạo đối tượng',
            correctAnswer: 'Khởi tạo đối tượng',
            explanation: 'Constructor được gọi khi tạo object để khởi tạo giá trị ban đầu.'
          },
          {
            question: 'Destructor có nhiệm vụ gì?',
            studentAnswer: 'Hủy object và giải phóng tài nguyên',
            correctAnswer: 'Hủy object và giải phóng tài nguyên',
            explanation: 'Destructor được gọi khi object bị hủy.'
          },
          {
            question: 'Từ khóa private có ý nghĩa gì?',
            studentAnswer: 'Chỉ truy cập trong cùng class',
            correctAnswer: 'Chỉ truy cập trong cùng class',
            explanation: 'private giới hạn phạm vi truy cập trong class.'
          },
          {
            question: 'Từ khóa public cho phép điều gì?',
            studentAnswer: 'Truy cập từ mọi nơi',
            correctAnswer: 'Truy cập từ mọi nơi',
            explanation: 'public cho phép truy cập từ bất kỳ đâu.'
          },
          {
            question: 'Overloading xảy ra khi nào?',
            studentAnswer: 'Cùng tên phương thức nhưng khác tham số',
            correctAnswer: 'Cùng tên phương thức nhưng khác tham số',
            explanation: 'Overloading là nạp chồng phương thức với danh sách tham số khác nhau.'
          },
          {
            question: 'Overriding là gì?',
            studentAnswer: 'Viết lại phương thức của lớp cha ở lớp con',
            correctAnswer: 'Viết lại phương thức của lớp cha ở lớp con',
            explanation: 'Overriding cho phép lớp con thay đổi hành vi phương thức lớp cha.'
          },
          {
            question: 'Abstract class có đặc điểm gì?',
            studentAnswer: '',
            correctAnswer: 'Không thể tạo object trực tiếp',
            explanation: 'Abstract class phải được kế thừa và không thể khởi tạo trực tiếp.'
          },
          {
            question: 'Interface dùng để làm gì?',
            studentAnswer: 'Định nghĩa các phương thức không có thân hàm',
            correctAnswer: 'Định nghĩa các phương thức không có thân hàm',
            explanation: 'Interface định nghĩa hành vi mà lớp phải triển khai.'
          },
          {
            question: 'Từ khóa static thuộc về?',
            studentAnswer: 'Lớp',
            correctAnswer: 'Lớp',
            explanation: 'static thuộc về class thay vì object.'
          },
          {
            question: 'Từ khóa final dùng để?',
            studentAnswer: 'Ngăn ghi đè hoặc thay đổi',
            correctAnswer: 'Ngăn ghi đè hoặc thay đổi',
            explanation: 'final ngăn lớp bị kế thừa hoặc phương thức bị override.'
          },
          {
            question: 'Getter và Setter dùng để?',
            studentAnswer: 'Truy cập và thay đổi dữ liệu private',
            correctAnswer: 'Truy cập và thay đổi dữ liệu private',
            explanation: 'Getter/Setter giúp truy cập an toàn dữ liệu đã đóng gói.'
          },
          {
            question: 'Composition là gì?',
            studentAnswer: '',
            correctAnswer: 'Lớp chứa đối tượng của lớp khác',
            explanation: 'Composition thể hiện mối quan hệ "has-a".'
          },
          {
            question: 'Aggregation khác Composition ở điểm nào?',
            studentAnswer: 'Đối tượng có thể tồn tại độc lập',
            correctAnswer: 'Đối tượng có thể tồn tại độc lập',
            explanation: 'Aggregation cho phép đối tượng tồn tại độc lập.'
          },
          {
            question: 'Java hỗ trợ đa kế thừa trực tiếp giữa các lớp không?',
            studentAnswer: 'Không',
            correctAnswer: 'Không',
            explanation: 'Java không hỗ trợ đa kế thừa lớp nhưng hỗ trợ qua interface.'
          },
          {
            question: 'Từ khóa this dùng để?',
            studentAnswer: 'Tham chiếu tới đối tượng hiện tại',
            correctAnswer: 'Tham chiếu tới đối tượng hiện tại',
            explanation: 'this đại diện cho instance hiện tại.'
          },
          {
            question: 'Từ khóa super dùng để?',
            studentAnswer: 'Gọi constructor hoặc phương thức lớp cha',
            correctAnswer: 'Gọi constructor hoặc phương thức lớp cha',
            explanation: 'super tham chiếu đến lớp cha.'
          },
          {
            question: 'Association thể hiện điều gì?',
            studentAnswer: 'Mối quan hệ giữa các lớp',
            correctAnswer: 'Mối quan hệ giữa các lớp',
            explanation: 'Association biểu diễn sự liên kết giữa các đối tượng.'
          },
          {
            question: 'OOP khác POP ở điểm chính nào?',
            studentAnswer: 'OOP tập trung vào đối tượng',
            correctAnswer: 'OOP tập trung vào đối tượng',
            explanation: 'OOP tổ chức chương trình dựa trên đối tượng thay vì hàm.'
          },
          {
            question: 'Sơ đồ lớp (Class Diagram) dùng để?',
            studentAnswer: 'Chạy chương trình',
            correctAnswer: 'Mô tả cấu trúc lớp và mối quan hệ',
            explanation: 'Class Diagram là một phần của UML.'
          },
          {
            question: 'UML là viết tắt của?',
            studentAnswer: 'Unified Modeling Language',
            correctAnswer: 'Unified Modeling Language',
            explanation: 'UML là ngôn ngữ mô hình hóa chuẩn dùng trong thiết kế phần mềm.'
          },
          {
            question: 'SOLID là gì?',
            studentAnswer: '5 nguyên lý thiết kế OOP',
            correctAnswer: '5 nguyên lý thiết kế OOP',
            explanation: 'SOLID gồm 5 nguyên tắc giúp thiết kế phần mềm tốt hơn.'
          },
          {
            question: 'Dependency Injection giúp điều gì?',
            studentAnswer: '',
            correctAnswer: 'Giảm phụ thuộc giữa các lớp',
            explanation: 'DI giúp code linh hoạt và dễ kiểm thử hơn.'
          },
          {
            question: 'Exception trong OOP dùng để?',
            studentAnswer: 'Xử lý lỗi khi chương trình chạy',
            correctAnswer: 'Xử lý lỗi khi chương trình chạy',
            explanation: 'Exception giúp xử lý các tình huống lỗi một cách có kiểm soát.'
          }
        ],
      },
    ],
  },
];

