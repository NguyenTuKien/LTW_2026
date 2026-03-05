export const examResult = {
  examName: 'Kiểm tra giữa kỳ môn Lập trình hướng đối tượng',
  examCode: 'OOP_MID_01',
  studentName: 'Nguyễn Văn A',
  studentCode: 'B19DCCN123',
  submittedAt: '2026-03-05T09:45:00',
  durationMinutes: 45,
  passScore: 5,
  questions: [
    {
      id: 1,
      topic: 'Khái niệm OOP',
      text: 'Lập trình hướng đối tượng là gì?',
      options: [
        'Lập trình dựa trên hàm',
        'Lập trình dựa trên đối tượng và lớp',
        'Lập trình chỉ dùng biến toàn cục',
        'Lập trình không cần cấu trúc'
      ],
      selectedAnswer: 'Lập trình dựa trên đối tượng và lớp',
      correctAnswer: 'Lập trình dựa trên đối tượng và lớp',
      explanation: 'OOP tổ chức chương trình xoay quanh đối tượng và lớp.'
    },
    {
      id: 2,
      topic: 'Class và Object',
      text: 'Class (lớp) là gì?',
      options: [
        'Một đối tượng cụ thể',
        'Bản thiết kế để tạo ra đối tượng',
        'Một hàm đặc biệt',
        'Một biến toàn cục'
      ],
      selectedAnswer: 'Một đối tượng cụ thể',
      correctAnswer: 'Bản thiết kế để tạo ra đối tượng',
      explanation: 'Class là khuôn mẫu dùng để tạo ra các object.'
    },
    {
      id: 3,
      topic: 'Class và Object',
      text: 'Object (đối tượng) là gì?',
      options: [
        'Một lớp',
        'Một biến',
        'Thể hiện cụ thể của một lớp',
        'Một phương thức'
      ],
      selectedAnswer: 'Thể hiện cụ thể của một lớp',
      correctAnswer: 'Thể hiện cụ thể của một lớp',
      explanation: 'Object là thực thể được tạo ra từ class.'
    },
    {
      id: 4,
      topic: 'Tính đóng gói',
      text: 'Encapsulation (đóng gói) giúp làm gì?',
      options: [
        'Ẩn dữ liệu và bảo vệ dữ liệu',
        'Tăng tốc chương trình',
        'Xóa đối tượng',
        'Giảm số dòng code'
      ],
      selectedAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu',
      correctAnswer: 'Ẩn dữ liệu và bảo vệ dữ liệu',
      explanation: 'Đóng gói giúp che giấu chi tiết bên trong và chỉ cho phép truy cập qua phương thức công khai.'
    },
    {
      id: 5,
      topic: 'Tính kế thừa',
      text: 'Inheritance (kế thừa) cho phép điều gì?',
      options: [
        'Một lớp sử dụng lại thuộc tính và phương thức của lớp khác',
        'Xóa lớp cha',
        'Tạo nhiều object cùng lúc',
        'Ngăn truy cập dữ liệu'
      ],
      selectedAnswer: 'Ngăn truy cập dữ liệu',
      correctAnswer: 'Một lớp sử dụng lại thuộc tính và phương thức của lớp khác',
      explanation: 'Kế thừa giúp tái sử dụng code từ lớp cha.'
    },
    {
      id: 6,
      topic: 'Tính đa hình',
      text: 'Polymorphism (đa hình) là gì?',
      options: [
        'Một phương thức có nhiều cách triển khai',
        'Một lớp có nhiều tên',
        'Một biến có nhiều kiểu dữ liệu',
        'Một chương trình có nhiều file'
      ],
      selectedAnswer: 'Một phương thức có nhiều cách triển khai',
      correctAnswer: 'Một phương thức có nhiều cách triển khai',
      explanation: 'Đa hình cho phép cùng một phương thức hoạt động khác nhau tùy đối tượng.'
    },
    {
      id: 7,
      topic: 'Tính trừu tượng',
      text: 'Abstraction (trừu tượng) giúp làm gì?',
      options: [
        'Hiển thị toàn bộ chi tiết bên trong',
        'Ẩn chi tiết và chỉ hiển thị chức năng cần thiết',
        'Xóa dữ liệu',
        'Tăng bộ nhớ'
      ],
      selectedAnswer: 'Ẩn chi tiết và chỉ hiển thị chức năng cần thiết',
      correctAnswer: 'Ẩn chi tiết và chỉ hiển thị chức năng cần thiết',
      explanation: 'Trừu tượng giúp tập trung vào chức năng chính thay vì chi tiết triển khai.'
    },
    {
      id: 8,
      topic: 'Constructor',
      text: 'Constructor dùng để làm gì?',
      options: [
        'Hủy đối tượng',
        'Khởi tạo đối tượng',
        'In dữ liệu',
        'Kế thừa lớp'
      ],
      selectedAnswer: 'Khởi tạo đối tượng',
      correctAnswer: 'Khởi tạo đối tượng',
      explanation: 'Constructor được gọi khi tạo object để khởi tạo giá trị ban đầu.'
    },
    {
      id: 9,
      topic: 'Destructor',
      text: 'Destructor có nhiệm vụ gì?',
      options: [
        'Tạo object',
        'Hủy object và giải phóng tài nguyên',
        'Kế thừa lớp',
        'Tạo phương thức mới'
      ],
      selectedAnswer: 'Hủy object và giải phóng tài nguyên',
      correctAnswer: 'Hủy object và giải phóng tài nguyên',
      explanation: 'Destructor được gọi khi object bị hủy.'
    },
    {
      id: 10,
      topic: 'Access Modifier',
      text: 'Từ khóa private có ý nghĩa gì?',
      options: [
        'Truy cập từ mọi nơi',
        'Chỉ truy cập trong cùng class',
        'Chỉ truy cập từ package khác',
        'Truy cập toàn cầu'
      ],
      selectedAnswer: 'Chỉ truy cập trong cùng class',
      correctAnswer: 'Chỉ truy cập trong cùng class',
      explanation: 'private giới hạn phạm vi truy cập trong class.'
    },

    {
      id: 11,
      topic: 'Access Modifier',
      text: 'Từ khóa public cho phép điều gì?',
      options: [
        'Chỉ truy cập nội bộ',
        'Truy cập từ mọi nơi',
        'Chỉ lớp con dùng được',
        'Không thể truy cập'
      ],
      selectedAnswer: 'Truy cập từ mọi nơi',
      correctAnswer: 'Truy cập từ mọi nơi',
      explanation: 'public cho phép truy cập từ bất kỳ đâu.'
    },
    {
      id: 12,
      topic: 'Method Overloading',
      text: 'Overloading xảy ra khi nào?',
      options: [
        'Cùng tên phương thức nhưng khác tham số',
        'Khác tên phương thức',
        'Khác lớp',
        'Khác kiểu dữ liệu trả về'
      ],
      selectedAnswer: 'Cùng tên phương thức nhưng khác tham số',
      correctAnswer: 'Cùng tên phương thức nhưng khác tham số',
      explanation: 'Overloading là nạp chồng phương thức với danh sách tham số khác nhau.'
    },
    {
      id: 13,
      topic: 'Method Overriding',
      text: 'Overriding là gì?',
      options: [
        'Viết lại phương thức của lớp cha ở lớp con',
        'Tạo lớp mới',
        'Tạo constructor',
        'Tạo biến mới'
      ],
      selectedAnswer: 'Viết lại phương thức của lớp cha ở lớp con',
      correctAnswer: 'Viết lại phương thức của lớp cha ở lớp con',
      explanation: 'Overriding cho phép lớp con thay đổi hành vi phương thức lớp cha.'
    },
    {
      id: 14,
      topic: 'Abstract Class',
      text: 'Abstract class có đặc điểm gì?',
      options: [
        'Không thể tạo object trực tiếp',
        'Luôn có constructor public',
        'Không có phương thức',
        'Không thể kế thừa'
      ],
      selectedAnswer: 'Không thể tạo object trực tiếp',
      correctAnswer: 'Không thể tạo object trực tiếp',
      explanation: 'Abstract class phải được kế thừa và không thể khởi tạo trực tiếp.'
    },
    {
      id: 15,
      topic: 'Interface',
      text: 'Interface dùng để làm gì?',
      options: [
        'Định nghĩa các phương thức không có thân hàm',
        'Lưu trữ dữ liệu',
        'Tạo object',
        'Hủy object'
      ],
      selectedAnswer: 'Định nghĩa các phương thức không có thân hàm',
      correctAnswer: 'Định nghĩa các phương thức không có thân hàm',
      explanation: 'Interface định nghĩa hành vi mà lớp phải triển khai.'
    },
    {
      id: 16,
      topic: 'Static',
      text: 'Từ khóa static thuộc về?',
      options: [
        'Đối tượng',
        'Lớp',
        'Constructor',
        'Interface'
      ],
      selectedAnswer: 'Lớp',
      correctAnswer: 'Lớp',
      explanation: 'static thuộc về class thay vì object.'
    },
    {
      id: 17,
      topic: 'Final',
      text: 'Từ khóa final dùng để?',
      options: [
        'Cho phép kế thừa',
        'Ngăn ghi đè hoặc thay đổi',
        'Tạo object',
        'Tăng tốc chương trình'
      ],
      selectedAnswer: 'Ngăn ghi đè hoặc thay đổi',
      correctAnswer: 'Ngăn ghi đè hoặc thay đổi',
      explanation: 'final ngăn lớp bị kế thừa hoặc phương thức bị override.'
    },
    {
      id: 18,
      topic: 'Getter/Setter',
      text: 'Getter và Setter dùng để?',
      options: [
        'Truy cập và thay đổi dữ liệu private',
        'Xóa object',
        'Tạo lớp',
        'Kế thừa lớp'
      ],
      selectedAnswer: 'Truy cập và thay đổi dữ liệu private',
      correctAnswer: 'Truy cập và thay đổi dữ liệu private',
      explanation: 'Getter/Setter giúp truy cập an toàn dữ liệu đã đóng gói.'
    },
    {
      id: 19,
      topic: 'Composition',
      text: 'Composition là gì?',
      options: [
        'Lớp chứa đối tượng của lớp khác',
        'Lớp kế thừa nhiều lớp',
        'Xóa lớp',
        'Tạo interface'
      ],
      selectedAnswer: 'Lớp chứa đối tượng của lớp khác',
      correctAnswer: 'Lớp chứa đối tượng của lớp khác',
      explanation: 'Composition thể hiện mối quan hệ "has-a".'
    },
    {
      id: 20,
      topic: 'Aggregation',
      text: 'Aggregation khác Composition ở điểm nào?',
      options: [
        'Đối tượng có thể tồn tại độc lập',
        'Không có mối quan hệ',
        'Luôn bị xóa cùng nhau',
        'Không dùng object'
      ],
      selectedAnswer: 'Đối tượng có thể tồn tại độc lập',
      correctAnswer: 'Đối tượng có thể tồn tại độc lập',
      explanation: 'Aggregation cho phép đối tượng tồn tại độc lập.'
    },

    {
      id: 21,
      topic: 'Đa kế thừa',
      text: 'Java hỗ trợ đa kế thừa trực tiếp giữa các lớp không?',
      options: [
        'Có',
        'Không',
        'Chỉ khi dùng abstract',
        'Chỉ khi dùng final'
      ],
      selectedAnswer: 'Không',
      correctAnswer: 'Không',
      explanation: 'Java không hỗ trợ đa kế thừa lớp nhưng hỗ trợ qua interface.'
    },
    {
      id: 22,
      topic: 'this keyword',
      text: 'Từ khóa this dùng để?',
      options: [
        'Tham chiếu tới đối tượng hiện tại',
        'Tham chiếu lớp cha',
        'Tạo object mới',
        'Hủy object'
      ],
      selectedAnswer: 'Tham chiếu tới đối tượng hiện tại',
      correctAnswer: 'Tham chiếu tới đối tượng hiện tại',
      explanation: 'this đại diện cho instance hiện tại.'
    },
    {
      id: 23,
      topic: 'super keyword',
      text: 'Từ khóa super dùng để?',
      options: [
        'Gọi constructor hoặc phương thức lớp cha',
        'Tạo object mới',
        'Kế thừa nhiều lớp',
        'Xóa lớp'
      ],
      selectedAnswer: 'Gọi constructor hoặc phương thức lớp cha',
      correctAnswer: 'Gọi constructor hoặc phương thức lớp cha',
      explanation: 'super tham chiếu đến lớp cha.'
    },
    {
      id: 24,
      topic: 'Association',
      text: 'Association thể hiện điều gì?',
      options: [
        'Mối quan hệ giữa các lớp',
        'Xóa object',
        'Tạo interface',
        'Ngăn kế thừa'
      ],
      selectedAnswer: 'Mối quan hệ giữa các lớp',
      correctAnswer: 'Mối quan hệ giữa các lớp',
      explanation: 'Association biểu diễn sự liên kết giữa các đối tượng.'
    },
    {
      id: 25,
      topic: 'OOP vs POP',
      text: 'OOP khác POP ở điểm chính nào?',
      options: [
        'OOP tập trung vào đối tượng',
        'OOP không dùng hàm',
        'POP không có biến',
        'POP không có vòng lặp'
      ],
      selectedAnswer: 'OOP tập trung vào đối tượng',
      correctAnswer: 'OOP tập trung vào đối tượng',
      explanation: 'OOP tổ chức chương trình dựa trên đối tượng thay vì hàm.'
    },
    {
      id: 26,
      topic: 'Class Diagram',
      text: 'Sơ đồ lớp (Class Diagram) dùng để?',
      options: [
        'Mô tả cấu trúc lớp và mối quan hệ',
        'Chạy chương trình',
        'Biên dịch code',
        'Xóa class'
      ],
      selectedAnswer: 'Chạy chương trình',
      correctAnswer: 'Mô tả cấu trúc lớp và mối quan hệ',
      explanation: 'Class Diagram là một phần của UML.'
    },
    {
      id: 27,
      topic: 'UML',
      text: 'UML là viết tắt của?',
      options: [
        'Unified Modeling Language',
        'Universal Machine Language',
        'User Model Logic',
        'Unified Machine Logic'
      ],
      selectedAnswer: 'Unified Modeling Language',
      correctAnswer: 'Unified Modeling Language',
      explanation: 'UML là ngôn ngữ mô hình hóa chuẩn dùng trong thiết kế phần mềm.'
    },
    {
      id: 28,
      topic: 'SOLID',
      text: 'SOLID là gì?',
      options: [
        '5 nguyên lý thiết kế OOP',
        'Một ngôn ngữ lập trình',
        'Một framework',
        'Một IDE'
      ],
      selectedAnswer: '5 nguyên lý thiết kế OOP',
      correctAnswer: '5 nguyên lý thiết kế OOP',
      explanation: 'SOLID gồm 5 nguyên tắc giúp thiết kế phần mềm tốt hơn.'
    },
    {
      id: 29,
      topic: 'Dependency Injection',
      text: 'Dependency Injection giúp điều gì?',
      options: [
        'Giảm phụ thuộc giữa các lớp',
        'Tăng số lượng object',
        'Xóa class',
        'Tăng tốc CPU'
      ],
      selectedAnswer: '',
      correctAnswer: 'Giảm phụ thuộc giữa các lớp',
      explanation: 'DI giúp code linh hoạt và dễ kiểm thử hơn.'
    },
    {
      id: 30,
      topic: 'Exception Handling',
      text: 'Exception trong OOP dùng để?',
      options: [
        'Xử lý lỗi khi chương trình chạy',
        'Tạo class mới',
        'Kế thừa lớp',
        'Tăng bộ nhớ'
      ],
      selectedAnswer: 'Xử lý lỗi khi chương trình chạy',
      correctAnswer: 'Xử lý lỗi khi chương trình chạy',
      explanation: 'Exception giúp xử lý các tình huống lỗi một cách có kiểm soát.'
    }
  ],
};
