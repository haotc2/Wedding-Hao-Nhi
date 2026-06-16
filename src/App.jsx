import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { config } from "./config";
import "./App.css";

// Components
/**
 * ==========================================
 * COMPONENT: MusicPlayer
 * Custom audio controls for the wedding theme
 * ==========================================
 */

/**
 * ==========================================
 * COMPONENT: LoadingScreen
 * Elegant loading overlay with "Hỷ" symbol
 * ==========================================
 */
const LoadingScreen = ({ progress, isFinished }) => {
  return (
    <div className={`loading-screen ${isFinished ? "fade-out" : ""}`}>
      <div className="loading-blur-bg">
        <div className="blur-circle circle-1"></div>
        <div className="blur-circle circle-2"></div>
        <div className="blur-circle circle-3"></div>
      </div>
      <div className="busy-container">
        <div className="hy-symbol-busy">囍</div>
      </div>
      <div className="loading-progress-container">
        <p className="loading-text">Loading... {progress}%</p>
        <div className="loading-bar-bg">
          <div className="loading-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

const MusicPlayer = () => {

  const [isPlaying, setIsPlaying] = useState(true); // Default to on
  const audioRef = React.useRef(null);

  useEffect(() => {
    // Initial attempt to autoplay
    const playAudio = () => {
      audioRef.current
        ?.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          // FALLBACK: Start on first user interaction anywhere
          const startOnInteraction = () => {
            audioRef.current?.play();
            setIsPlaying(true);
            document.removeEventListener("click", startOnInteraction);
            document.removeEventListener("touchstart", startOnInteraction);
          };
          document.addEventListener("click", startOnInteraction);
          document.addEventListener("touchstart", startOnInteraction);
        });
    };

    playAudio();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player-new">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}${config.audioUrl}`}
        loop
      />
      <button
        className={`music-toggle-new ${isPlaying ? "playing" : ""}`}
        onClick={togglePlay}
      >
        <img
          src={`${import.meta.env.BASE_URL}play-icon-29.png`}
          alt="Music toggle"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </button>
    </div>
  );
};

const FallingHearts = () => {
  return (
    <div className="falling-hearts-container">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="heart-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 15 + 20}s`, // Rất chậm (20-35s)
            animationDelay: `${Math.random() * 15}s`,
            fontSize: `${Math.random() * 12 + 10}px`,
            opacity: Math.random() * 0.4 + 0.2, // Mờ ảo hơn
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

const getDirectLink = (url, width = 1200) => {
  if (!url || typeof url !== "string") return url;

  // Nếu là ảnh từ Unsplash hoặc link web khác thì giữ nguyên
  if (!url.includes("drive.google.com")) return url;

  // Trích xuất ID từ link Drive một cách chính xác
  const idMatch = url.match(/[-\w]{25,}/);
  if (idMatch) {
    const id = idMatch[0];

    // SỬ DỤNG POWER CDN: lh3.googleusercontent.com
    // =s{size} : Điều chỉnh kích thước thông minh
    // -rw      : Ép trả về định dạng WebP (SIÊU NHẸ và NÉT)
    return `https://lh3.googleusercontent.com/d/${id}=s${width}-rw`;
  }

  return url;
};

/**
 * ==========================================
 * COMPONENT: Hero
 * Top section displaying the main aesthetic and countdown
 * ==========================================
 */
const Hero = ({ remoteConfig }) => {
  const mainEvent = React.useMemo(() => {
    const groomEvent = config.events.find((ev) => ev.title.includes("NHÀ TRAI"));
    return groomEvent || config.events[0];
  }, []);

  const [day, month, year] = mainEvent.dayMonth
    .split("/")
    .concat(mainEvent.year);
  const mainBackground = getDirectLink(
    remoteConfig?.mainbackground || config.mainBackground,
    1600,
  );

  return (
    <section className="hero">
      <img src={mainBackground} alt="" className="hero-bg-img" />
      <div className="hero-overlay"></div>
      <FallingHearts />
      <div
        className="hero-glass-container"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        <p className="hero-script-subtitle">Save The Date</p>

        <div className="hero-names-new">
          <h1 className="hero-name-text">{config.groom.name}</h1>
          <span className="hero-ampersand">&</span>
          <h1 className="hero-name-text">{config.bride.name}</h1>
        </div>

        <div className="hero-date-block">
          <div className="date-item side">
            {mainEvent.dayOfWeek.toUpperCase()}
          </div>
          <div className="date-item center">
            <span className="day-number">
              {day}.{month}
            </span>
          </div>
          <div className="date-item side">{year}</div>
        </div>

        <div className="hero-bottom-icons">
        </div>
      </div>
    </section>
  );
};

// Countdown moved below Events

/**
 * ==========================================
 * COMPONENT: Couple
 * Introduction block for Bride and Groom
 * ==========================================
 */
const Couple = ({ remoteConfig }) => {
  const groomImage = getDirectLink(
    remoteConfig?.groomimage || config.groom.image,
    800,
  );
  const brideImage = getDirectLink(
    remoteConfig?.brideimage || config.bride.image,
    800,
  );

  const groomFather = remoteConfig?.groomfather || config.groom.father;
  const groomMother = remoteConfig?.groommother || config.groom.mother;
  const groomAddress = remoteConfig?.groomaddress || config.groom.address;
  const brideFather = remoteConfig?.bridefather || config.bride.father;
  const brideMother = remoteConfig?.bridemother || config.bride.mother;
  const brideAddress = remoteConfig?.brideaddress || config.bride.address;

  const eventData = config.events.find((ev) => ev.title.includes("NHÀ TRAI")) || config.events[0];
  const [day, month] = eventData.dayMonth.split('/');

  return (
    <section className="couple bg-white">
      <div className="container">

        <div className="classic-invite-wrapper" data-aos="fade-up" style={{ textAlign: "center", backgroundColor: "#fdf7ee", padding: "2rem 1rem", border: "1px solid #eaddd3", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          {/* Parents Block */}
          <h2 className="couple-title" data-aos="fade-up" style={{ marginBottom: "3rem" }}>
            THÔNG TIN LỄ CƯỚI
          </h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", marginBottom: "3rem", gap: "0", flexWrap: "nowrap" }}>
            <div style={{ flex: "1", minWidth: "0" }}>
              <span className="classic-parent-title">Ông Bà</span>
              <p className="classic-parent-name">{groomFather}</p>
              <p className="classic-parent-name">{groomMother}</p>
              <p className="classic-parent-address">{groomAddress}</p>
            </div>

            <div className="classic-divider-line"></div>

            <div style={{ flex: "1", minWidth: "0" }}>
              <span className="classic-parent-title">Ông Bà</span>
              <p className="classic-parent-name">{brideFather}</p>
              <p className="classic-parent-name">{brideMother}</p>
              <p className="classic-parent-address">{brideAddress}</p>
            </div>
          </div>

          <div style={{ marginBottom: "3rem" }}>
            <p className="classic-announce-text">TRÂN TRỌNG BÁO TIN</p>
            <p className="classic-announce-text">LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</p>
          </div>

          <div className="couple-grid-new" style={{ marginBottom: "3rem" }}>
            <div
              className="couple-card"
              data-aos="fade-right"
              style={{ backgroundImage: `url(${groomImage})` }}
            >
              <div className="card-overlay-gradient"></div>
              <div className="card-content">
                <h3 className="card-name">{config.groom.name}</h3>
                <p className="card-bio">{config.groom.bio}</p>
              </div>
            </div>
            <div
              className="couple-card"
              data-aos="fade-left"
              style={{ backgroundImage: `url(${brideImage})` }}
            >
              <div className="card-overlay-gradient"></div>
              <div className="card-content">
                <h3 className="card-name">{config.bride.name}</h3>
                <p className="card-bio">{config.bride.bio}</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "3rem" }}>
            <p className="classic-announce-text">
              LỄ TÂN HÔN ĐƯỢC CỬ HÀNH <br className="mobile-break" /> TẠI TƯ GIA
            </p>
            <p className="classic-ceremony-time">VÀO LÚC 9:00</p>
          </div>

          <div className="classic-date-row">
            <span className="classic-date-side">C.NHẬT</span>
            <div className="classic-date-divider"></div>
            <span className="classic-date-big">{day}.{month}</span>
            <div className="classic-date-divider"></div>
            <span className="classic-date-side">{eventData.year}</span>
          </div>
          <p className="classic-lunar">Nhằm ngày {eventData.lunarDate}</p>
        </div>
      </div>
    </section>
  );
};

/**
 * ==========================================
 * COMPONENT: Gallery
 * Previews the pre-wedding photo album
 * ==========================================
 */
const Gallery = ({ remoteGallery }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const images =
    remoteGallery && remoteGallery.length > 0 ? remoteGallery : config.gallery;

  const [displayCount, setDisplayCount] = useState(9); // Default 9

  useEffect(() => {
    const handleResize = () => {
      // 3 cols on desktop (>=768) -> 9 images (3 rows x 3 cols)
      // 2 cols on mobile (<768) -> 8 images (4 rows x 2 cols)
      setDisplayCount(window.innerWidth < 768 ? 8 : 9);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Display only part of images in the grid, but allow lightbox to view ALL
  const displayImages = images.slice(0, displayCount);

  useEffect(() => {
    // Xử lý khóa cuộn chuột khi xem ảnh
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedIndex]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="gallery bg-white">
      <div className="container">
        <h2 className="couple-title" data-aos="fade-up">
          ALBUM ẢNH
        </h2>
        <div className="gallery-grid">
          {displayImages.map((img, idx) => (
            <div
              key={idx}
              className="gallery-item"
              data-aos="zoom-in"
              data-aos-delay={idx * 50}
              onClick={() => setSelectedIndex(idx)}
            >
              <img
                src={getDirectLink(img, 400)}
                alt={`Gallery ${idx}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>
          <button className="lightbox-nav prev" onClick={handlePrev}>
            &#10094;
          </button>
          <img
            src={getDirectLink(images[selectedIndex], 1600)}
            alt="Enlarged"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-nav next" onClick={handleNext}>
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
};

/**
 * ==========================================
 * COMPONENT: Events
 * Detail cards for wedding parties and ceremonies
 * ==========================================
 */
const Events = ({ remoteConfig }) => {
  return (
    <div className="events-container-new">
      {config.events
        .filter((ev) => ev.title.includes("NHÀ TRAI"))
        .map((event) => {
          const originalIdx = config.events.indexOf(event);
          const [day, month] = event.dayMonth.split("/");
          const remoteKey = `event${originalIdx + 1}image`;
          const eventImage = getDirectLink(
            remoteConfig?.[remoteKey] || event.image,
            800,
          );
          return (
            <div
              key={originalIdx}
              className="event-card-new"
              data-aos="fade-up"
              data-aos-delay={0}
            >
              <div className="event-arch-wrapper">
                <img
                  src={eventImage}
                  alt={event.title}
                  className="event-arch-img-new"
                />
              </div>

              <div className="event-info-new">
                <h3 className="event-card-title">
                  {event.title.includes("NHÀ") ? (
                    <>
                      {event.title.split("NHÀ")[0]}
                      <span style={{ display: "inline-block" }}>
                        NHÀ {event.title.split("NHÀ")[1]}
                      </span>
                    </>
                  ) : (
                    event.title
                  )}
                </h3>
                <p className="event-location-name-new">{event.location}</p>
                <p className="event-address-new">
                  {(() => {
                    const parts = event.address.split(",");
                    const street = parts[0];
                    const rest = parts.slice(1).join(",");
                    return (
                      <>
                        <span className="address-street">
                          {street.trim()}
                          {parts.length > 1 ? "," : ""}
                        </span>{" "}
                        <span className="address-location">{rest.trim()}</span>
                      </>
                    );
                  })()}
                </p>
                <p className="event-time-new">
                  Vào lúc <strong>{event.time}</strong>
                </p>

                <div className="event-date-row-new">
                  <div className="date-box-side">
                    <span className="date-day-week full-day">
                      {event.dayOfWeek}
                    </span>
                    <span className="date-day-week short-day">
                      {event.dayOfWeek === "Chủ Nhật"
                        ? "C. Nhật"
                        : event.dayOfWeek}
                    </span>
                  </div>
                  <div className="date-center-main">
                    <span className="date-day-large">{day}.{month}</span>
                  </div>
                  <div className="date-box-side">
                    <span className="date-year-small">{event.year}</span>
                  </div>
                </div>

                <p className="event-lunar-new">Nhằm ngày {event.lunarDate}</p>




                <div className="event-map-embed">
                  <iframe
                    title={`Bản đồ ${event.location}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(event.location + ', ' + event.address)}&output=embed`}
                    width="100%"
                    height="350"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

/**
 * ==========================================
 * COMPONENT: Countdown
 * Displays time remaining until the core event
 * ==========================================
 */
const Countdown = ({ remoteConfig }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(config.weddingDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-banner-section-new">
      <div className="container-wide">
        <div
          className="countdown-banner-wrapper-new"
          data-aos="fade-up"
          style={{
            backgroundImage: `url(${getDirectLink(remoteConfig?.countdownbackground || config.countdownBackground, 1600)})`,
          }}
        >
          <div className="countdown-content-new">
            <p className="countdown-subtitle-new">CÙNG ĐẾM NGƯỢC THỜI GIAN</p>
            <h2 className="countdown-title-new">Save The Date</h2>

            <div className="countdown-grid-new-banner">
              {["days", "hours", "minutes", "seconds"].map((unit, index) => {
                const value = timeLeft[unit];
                const label =
                  unit === "days"
                    ? "Ngày"
                    : unit === "hours"
                      ? "Giờ"
                      : unit === "minutes"
                        ? "Phút"
                        : "Giây";
                return (
                  <div
                    key={unit}
                    className="countdown-box-new"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                  >
                    <span className="value">
                      {value !== undefined && !isNaN(value)
                        ? String(value).padStart(2, "0")
                        : "00"}
                    </span>
                    <span className="unit">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="countdown-events-wrapper">
          <Events remoteConfig={remoteConfig} />
        </div>
      </div>
    </section>
  );
};

/**
 * ==========================================
 * COMPONENT: Timeline
 * Represents the schedule for the wedding day
 * ==========================================
 */
const Timeline = () => {
  const icons = [
    `${import.meta.env.BASE_URL}gate-2.png`,
    `${import.meta.env.BASE_URL}nhan-cuoi-2.png`,
    `${import.meta.env.BASE_URL}ly-2.png`,
    `${import.meta.env.BASE_URL}hoa-cam-tay-2.png`,
  ];

  return (
    <section className="timeline-new-section">
      <div className="container">
        <h2 className="timeline-title-new" data-aos="fade-up">
          Wedding Timeline
        </h2>
        <div className="timeline-wrapper-new">
          <div className="timeline-line-center"></div>
          {config.timeline.map((item, idx) => (
            <div
              key={idx}
              className="timeline-row-item"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <div className="timeline-icon-left">
                <img
                  src={icons[idx % icons.length]}
                  alt=""
                  className="timeline-icon-img"
                />
              </div>
              <div className="timeline-dot-center"></div>
              <div className="timeline-content-right">
                <span className="timeline-time">{item.time}</span>
                <span className="timeline-desc">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * ==========================================
 * COMPONENT: RSVP
 * Form handling guest attendance submissions
 * ==========================================
 */
const RSVP = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !config.googleSheetUrl ||
      config.googleSheetUrl === "YOUR_GOOGLE_SHEET_URL"
    ) {
      alert(
        "Bạn chưa cấu hình Google Sheets URL. Vui lòng xem hướng dẫn để lấy link!",
      );
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    for (const [key, value] of formData) {
      params.append(key, value);
    }

    try {
      await fetch(config.googleSheetUrl, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });

      alert("Cảm ơn bạn đã báo danh! Dữ liệu đã được ghi nhận.");
      e.target.reset();
    } catch (error) {
      alert("Có lỗi kết nối, vui lòng thử lại sau.");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="rsvp bg-white">
      <div className="container" data-aos="fade-up">
        <h2>Xác nhận tham dự</h2>
        <p>Hãy cho chúng tôi biết bạn sẽ đến tham dự nhé!</p>
        <form
          className="rsvp-form card"
          data-aos="zoom-in"
          onSubmit={handleSubmit}
        >
          <input type="text" name="name" placeholder="Họ và tên" required />
          <select name="count" required>
            <option value="">Số người tham dự</option>
            <option value="1">1 người</option>
            <option value="2">2 người</option>
            <option value="3">3 người</option>
            <option value="4+">4+ người</option>
          </select>
          <textarea
            name="message"
            placeholder="Lời nhắn gửi..."
            rows="4"
          ></textarea>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}
          </button>
        </form>
      </div>
    </section>
  );
};

/**
 * ==========================================
 * COMPONENT: BankInfo
 * Direct banking information for gifting
 * ==========================================
 */
const BankInfo = () => {
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "groom") {
        setCopiedGroom(true);
        setTimeout(() => setCopiedGroom(false), 2000);
      } else {
        setCopiedBride(true);
        setTimeout(() => setCopiedBride(false), 2000);
      }
    });
  };

  return (
    <section className="bank-info-section">
      <div className="container">
        <h2 data-aos="fade-up">
          Gửi quà đến{" "}
          <span style={{ display: "inline-block" }}>Cô dâu & Chú rể</span>
        </h2>
        <div className="bank-grid">
          <div className="bank-card card" data-aos="flip-left">
            <h3>
              Mừng cưới{" "}
              <span style={{ display: "inline-block" }}>Chú rể</span>
            </h3>
            <p className="bank-name">{config.bankInfo.groom.bank}</p>
            <p className="bank-account">STK: {config.bankInfo.groom.accountNumber}</p>
            <p className="bank-owner">Tên: {config.bankInfo.groom.accountName}</p>
            <button
              className={`copy-btn ${copiedGroom ? "copied" : ""}`}
              onClick={() =>
                handleCopy(config.bankInfo.groom.accountNumber, "groom")
              }
            >
              <span className="copy-icon"></span>
              {copiedGroom ? "ĐÃ SAO CHÉP" : "SAO CHÉP SỐ TÀI KHOẢN"}
            </button>
          </div>
          <div className="bank-card card" data-aos="flip-right">
            <h3>
              Mừng cưới{" "}
              <span style={{ display: "inline-block" }}>cô dâu</span>
            </h3>
            <p className="bank-name">{config.bankInfo.bride.bank}</p>
            <p className="bank-account">STK: {config.bankInfo.bride.accountNumber}</p>
            <p className="bank-owner">Tên: {config.bankInfo.bride.accountName}</p>
            <button
              className={`copy-btn ${copiedBride ? "copied" : ""}`} onClick={() =>
                handleCopy(config.bankInfo.bride.accountNumber, "bride")
              }
            >
              <span className="copy-icon"></span>
              {copiedBride ? "ĐÃ SAO CHÉP" : "SAO CHÉP SỐ TÀI KHOẢN"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * ==========================================
 * MAIN APP CONTAINER (Root)
 * Connects all sections and manages global state 
 * ==========================================
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showRsvpIcon, setShowRsvpIcon] = useState(true);

  // Khởi tạo state từ cache trong localStorage để hiện ảnh ngay lập tức khi load trang
  const [remoteData, setRemoteData] = useState(() => {
    const cached = localStorage.getItem("wedding_config_cache");
    return cached
      ? JSON.parse(cached)
      : { config: {}, gallery: config.gallery || [] };
  });

  useEffect(() => {
    const preloadAllImages = async (data) => {
      const urls = [];
      const add = (url, width) => {
        if (url) {
          const directLink = getDirectLink(url, width);
          if (directLink) urls.push(directLink);
        }
      };

      // Add timeline icons
      const timelineIcons = [
        "/Vu Quy Invitation/public/gate-2.png",
        "/wedding-invitation/nhan-cuoi-2.png",
        "/wedding-invitation/ly-2.png",
        "/wedding-invitation/hoa-cam-tay-2.png",
      ];
      timelineIcons.forEach(icon => urls.push(`${import.meta.env.BASE_URL}${icon.startsWith('/') ? icon.slice(1) : icon}`));

      // Add main assets
      add(data.config?.mainbackground || config.mainBackground, 1600);
      add(data.config?.groomimage || config.groom.image, 800);
      add(data.config?.brideimage || config.bride.image, 800);
      add(data.config?.countdownbackground || config.countdownBackground, 1600);
      add(data.config?.footerbackground || config.footerBackground, 1600);

      // Events
      config.events.forEach((ev, idx) => {
        add(data.config?.[`event${idx + 1}image`] || ev.image, 800);
      });

      // Gallery
      if (data.gallery && data.gallery.length > 0) {
        data.gallery.forEach(img => add(img, 1200));
      }

      const uniqueUrls = [...new Set(urls)].filter(u => u && typeof u === 'string');
      const total = uniqueUrls.length;
      let loaded = 0;

      if (total === 0) {
        setLoadingProgress(100);
        setTimeout(() => setIsLoading(false), 800);
        return;
      }

      await Promise.all(uniqueUrls.map(url => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            loaded++;
            setLoadingProgress(Math.round((loaded / total) * 100));
            resolve();
          };
          img.onerror = () => {
            loaded++;
            setLoadingProgress(Math.round((loaded / total) * 100));
            resolve();
          };
        });
      }));

      // Small delay to show 100% before fading out
      setTimeout(() => setIsLoading(false), 800);
    };

    const fetchRemoteData = async () => {
      try {
        const response = await fetch(config.googleSheetUrl);
        const data = await response.json();
        if (data && typeof data === "object" && data.config) {
          const lowerConfig = {};
          Object.keys(data.config).forEach((key) => {
            lowerConfig[key.toLowerCase()] = data.config[key];
          });

          const newRemoteData = {
            config: lowerConfig,
            gallery:
              data.gallery && data.gallery.length > 0
                ? data.gallery
                : config.gallery,
          };

          setRemoteData(newRemoteData);
          localStorage.setItem(
            "wedding_config_cache",
            JSON.stringify(newRemoteData),
          );

          // Preload with the freshly fetched data
          await preloadAllImages(newRemoteData);
        } else {
          // If fetch fails or returned data is invalid, preload with current/cached data
          await preloadAllImages(remoteData);
        }
      } catch (error) {
        console.error("Error fetching remote config:", error);
        // Fallback to preload with cached data if fetch fails
        await preloadAllImages(remoteData);
      }
    };

    fetchRemoteData();


    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });

    const handleScroll = () => {
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 800;
      setShowRsvpIcon(!isNearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <LoadingScreen progress={loadingProgress} isFinished={!isLoading} />
      <MusicPlayer />
      <Hero remoteConfig={remoteData.config} />
      <Couple remoteConfig={remoteData.config} />
      <Gallery remoteGallery={remoteData.gallery} />
      <Countdown remoteConfig={remoteData.config} />
      <Timeline />
      <RSVP />
      <BankInfo />
      <footer
        className="footer"
        style={{
          backgroundImage: `url(${getDirectLink(remoteData.config?.footerbackground || config.footerBackground || remoteData.config?.mainbackground || config.mainBackground, 1600)})`,
        }}
      >
        <div className="footer-overlay"></div>
        <div className="footer-content">
          <p
            className="couple-title"
            data-aos="fade-up"
            style={{ color: "white" }}
          >
            Thank You!
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Sự hiện diện của bạn sẽ khiến hôn lễ của chúng tôi trở nên ý nghĩa
            hơn bao giờ hết!
          </p>
        </div>
      </footer>
      {showRsvpIcon && (
        <button
          className="floating-rsvp-btn"
          onClick={() =>
            document
              .querySelector(".rsvp")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Xác nhận tham dự
        </button>
      )}
    </div>
  );
}

export default App;
