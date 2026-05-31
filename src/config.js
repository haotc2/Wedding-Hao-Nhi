export const config = {
  mainBackground:
    "", // Background for Hero section
  footerBackground:
    "", // Background for Footer section fallback
  audioUrl: "Beautiful In White.mp3", // Background music
  groom: {
    name: "Chí Hào",
    bio: "Trưởng Nam",
    image:
      "",
    father: "Tạ Vĩnh Đức", // Điền tên Bố chú rể
    mother: "Hứa Huệ Huê", // Điền tên Mẹ chú rể
  },
  bride: {
    name: "Phương Nhi",

    bio: "Trưởng Nữ",
    image:
      "",
    father: "Nguyễn Hữu Triều", // Điền tên Bố cô dâu
    mother: "Trần Thị Phương Mai", // Điền tên Mẹ cô dâu
  },
  weddingDate: "2026-11-29T18:00:00", // Using 2026 to keep countdown active
  events: [
    {
      title: "LỄ CƯỚI NHÀ GÁI",
      location: "GOLDEN LOTUS",
      address: "105B Đ. Hà Huy Giáp, Phường Trấn Biên, Đồng Nai",
      time: "11:00",
      dayOfWeek: "Thứ 7",
      dayMonth: "28/11",
      year: "2026",
      lunarDate: "20 tháng 10 năm Bính Ngọ",
      image:
        "", // Arch image
    },
    {
      title: "LỄ CƯỚI NHÀ TRAI",
      location: "QUEEN PLAZA",
      address: "29B Trần Hưng Đạo, Phường An Đông, TP.Hồ Chí Minh",
      time: "18:00",
      dayOfWeek: "Chủ Nhật",
      dayMonth: "29/11",
      year: "2026",
      lunarDate: "21 tháng 10 năm Bính Ngọ",
      image:
        "", // Arch image
    },
  ],
  timeline: [
    { time: "17:00", description: "Đón khách và chụp ảnh" },
    { time: "18:00", description: "Làm lễ" },
    { time: "18:30", description: "Khai tiệc" },
    { time: "21:00", description: "Tung hoa và kết tiệc" },
  ],
  gallery: [],
  bankInfo: {
    groom: {
      bank: "TPBANK",
      accountNumber: "02030108701",
      accountName: "TA CHI HAO",
    },
    bride: {
      bank: "VIETCOMBANK",
      accountNumber: "0371000483268",
      accountName: "NGUYEN HUU PHUONG NHI",
    },
  },
  // Link Google Apps Script để nhận dữ liệu đổ về Google Sheets
  googleSheetUrl:
    "https://script.google.com/macros/s/AKfycbzQpQpb6IcfKsI14hj2aX2U_Gqv51lXctreDu125RwpWs2TVemwZgCRWbryxRTohltI/exec",
};
