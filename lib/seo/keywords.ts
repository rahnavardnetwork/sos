/**
 * SEO Keywords & Semantic Search Terms
 * کلمات کلیدی و عبارات جستجوی معنایی
 *
 * Organized by intent and persona for maximum search visibility
 */

export const SEO_KEYWORDS = {
  // PRIMARY KEYWORDS - کلمات کلیدی اصلی
  primary: {
    persian: [
      "کمک اضطراری ایران",
      "امداد فوری",
      "داوطلبان کمک رسان",
      "سازمان‌های امدادی",
      "کمک به امدادجوان",
      "شبکه داوطلبین",
      "رهنورد",
    ],
    english: [
      "Emergency Aid Iran",
      "Volunteer Networks Iran",
      "Verified Medical Help",
      "Citizen Support Network",
      "Crisis Assistance",
    ],
  },

  // AID SEEKER PERSONA - برای افراد امدادجو
  aidSeeker: {
    highUrgency: {
      persian: [
        "امداد فوری پزشکی",
        "کمک اورژانسی",
        "سرپناه اضطراری",
        "کمک فوری مالی",
        "دارو فوری",
        "کمک حقوقی اورژانسی",
        "مشاوره روانی فوری",
        "کمک غذایی فوری",
      ],
      english: [
        "Emergency Medical Help",
        "Urgent Shelter",
        "Crisis Financial Aid",
        "Immediate Legal Help",
        "Emergency Food Assistance",
      ],
    },
    locationBased: {
      persian: [
        "کمک اضطراری {city}",
        "امداد فوری {neighborhood}",
        "داوطلب در {city}",
        "سازمان کمک رسان {city}",
        "پزشک داوطلب {city}",
        "وکیل داوطلب {city}",
      ],
      english: [
        "Emergency Help {city}",
        "Volunteer Network {city}",
        "Crisis Aid {neighborhood}",
      ],
    },
    trust: {
      persian: [
        "کمک امن",
        "داوطلب معتبر",
        "سازمان تایید شده",
        "کمک قابل اعتماد",
        "احراز هویت داوطلب",
      ],
      english: [
        "Verified Volunteers",
        "Trusted Aid Organizations",
        "Safe Emergency Help",
      ],
    },
  },

  // VOLUNTEER PERSONA - برای داوطلبان
  volunteer: {
    motivation: {
      persian: [
        "داوطلب شدن",
        "کمک به امدادجوان",
        "شبکه کمک رسانی",
        "همیار اجتماعی",
        "فعالیت داوطلبانه",
        "خدمات رسانی اجتماعی",
        "کمک بشردوستانه",
      ],
      english: [
        "Volunteer Registration",
        "Join Aid Network",
        "Community Support",
        "Humanitarian Work",
      ],
    },
    verification: {
      persian: [
        "ثبت نام داوطلب معتبر",
        "احراز هویت امداد‌گر",
        "تایید سازمان",
        "گواهی داوطلبی",
      ],
      english: [
        "Verified Volunteer Registration",
        "Organization Verification",
        "Credible Aid Provider",
      ],
    },
    impact: {
      persian: ["تاثیر اجتماعی", "کمک به جامعه", "شبکه همیاری", "تحول اجتماعی"],
      english: ["Community Impact", "Social Change", "Civic Engagement"],
    },
  },

  // SERVICE CATEGORIES - دسته‌بندی خدمات
  services: {
    persian: [
      "کمک پزشکی",
      "مشاوره حقوقی",
      "حمایت روانی",
      "کمک غذایی",
      "کمک مالی",
      "آموزش",
      "سرپناه موقت",
      "حمل و نقل اضطراری",
    ],
    english: [
      "Medical Assistance",
      "Legal Counseling",
      "Mental Health Support",
      "Food Aid",
      "Financial Support",
      "Education",
      "Temporary Shelter",
      "Emergency Transportation",
    ],
  },

  // TRUST & SAFETY - اعتماد و امنیت
  trustSignals: {
    persian: [
      "امنیت دیجیتال",
      "حریم خصوصی",
      "احراز هویت دو مرحله‌ای",
      "کمک امن",
      "حفاظت از اطلاعات",
    ],
    english: [
      "Digital Security",
      "Privacy Protection",
      "Two-Factor Authentication",
      "Secure Help",
      "Data Protection",
    ],
  },

  // MAJOR IRANIAN CITIES - شهرهای اصلی ایران
  cities: [
    "تهران",
    "مشهد",
    "اصفهان",
    "شیراز",
    "تبریز",
    "کرج",
    "اهواز",
    "قم",
    "کرمانشاه",
    "ارومیه",
    "رشت",
    "زاهدان",
    "همدان",
    "کرمان",
    "یزد",
    "اردبیل",
    "بندرعباس",
    "سنندج",
    "قزوین",
    "ساری",
  ],
};

// LONG-TAIL KEYWORDS - عبارات بلند جستجو
export const LONG_TAIL_KEYWORDS = {
  aidSeeker: {
    persian: [
      "چگونه کمک اضطراری دریافت کنم",
      "نزدیکترین مرکز امداد",
      "نیاز به کمک فوری دارم",
      "سازمان کمک رسان معتبر",
      "امداد رایگان",
      "کمک بدون هزینه",
    ],
    english: [
      "how to get emergency help",
      "nearest emergency center",
      "need urgent assistance",
      "free emergency aid",
    ],
  },
  volunteer: {
    persian: [
      "چگونه داوطلب شوم",
      "ثبت نام سازمان کمک رسان",
      "فرآیند احراز هویت داوطلب",
      "شرایط داوطلب شدن",
    ],
    english: [
      "how to become verified volunteer",
      "volunteer registration process",
      "join aid organization",
    ],
  },
};

// CONTENT PILLAR KEYWORDS - کلمات کلیدی ستون‌های محتوایی
export const CONTENT_PILLAR_KEYWORDS = {
  safety: {
    persian: [
      "امنیت داوطلبان",
      "حفظ امنیت در کمک رسانی",
      "نکات ایمنی کمک گیرنده",
    ],
    english: [
      "volunteer safety",
      "safe volunteering",
      "aid recipient security",
    ],
  },
  digitalSecurity: {
    persian: [
      "امنیت دیجیتال داوطلبان",
      "حریم خصوصی آنلاین",
      "حفاظت از اطلاعات شخصی",
    ],
    english: [
      "digital security for volunteers",
      "online privacy",
      "data protection",
    ],
  },
  firstAid: {
    persian: ["کمک‌های اولیه", "مراقبت اورژانسی", "آموزش کمک‌های اولیه"],
    english: ["first aid basics", "emergency care", "basic life support"],
  },
};
