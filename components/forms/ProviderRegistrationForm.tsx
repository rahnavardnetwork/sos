"use client";

import { useCallback, useEffect, useState } from "react";

type FormStep =
  | "type"
  | "basic"
  | "categories"
  | "location"
  | "contact"
  | "verification"
  | "consent"
  | "success";

interface ProviderRegistrationFormProps {
  onStateChange: (state: {
    isSuccess: boolean;
    currentStep: number;
    totalSteps: number;
    canGoBack: boolean;
    isSubmitting: boolean;
  }) => void;
  onNavigationHandlersChange: (handlers: {
    onNext: () => void;
    onBack: () => void;
  }) => void;
}

export default function ProviderRegistrationForm({
  onStateChange,
  onNavigationHandlersChange,
}: ProviderRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("type");
  const [formData, setFormData] = useState({
    providerType: "individual",
    logo: null as File | null,
    logoPreview: "",
    name: "",
    descriptionPersian: "",
    descriptionEnglish: "",
    categories: [] as string[],
    customCategory: "",
    province: "",
    city: "",
    onlineServices: false,
    responseSpeed: "day",
    accessType: "scheduled",
    telegram: "",
    signal: "",
    whatsapp: "",
    phone: "",
    email: "",
    socialLink: "",
    consentDirectContact: false,
    consentTerms: false,
    provinces: [] as string[],
    cities: [] as string[],
    coverAllCountry: false,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "دارو و نسخه",
    "کمک پزشکی فوری",
    "سلامت روان و روان‌شناسی",
    "امنیت دیجیتال",
    "غذا و اقلام ضروری",
    "ارتباطات امن",
    "حمایت از خانواده‌های آسیب‌دیده",
    "حمایت از افراد آسیب‌پذیر",
    "رسانه / تلویزیون مردم",
    "ارسال کالا به ایران",
    "مشاوره پزشکی",
    "حمایت حقوقی",
    "پناهگاه و اسکان امن",
    "حمل‌ونقل و انتقال امن",
    "کمک مالی اضطراری",
    "جایجایی اضطراری",
    "اطلاعات و راستی‌آزمایی",
  ];

  const steps: { id: FormStep; title: string; subtitle: string }[] = [
    { id: "type", title: "نوع ارائه‌دهنده", subtitle: "انتخاب نوع فعالیت" },
    { id: "basic", title: "اطلاعات پایه", subtitle: "معرفی خود" },
    { id: "categories", title: "دسته‌بندی‌ها", subtitle: "خدمات شما" },
    { id: "location", title: "موقعیت و دسترسی", subtitle: "نحوه ارائه خدمات" },
    { id: "contact", title: "اطلاعات تماس", subtitle: "راه‌های ارتباطی" },
    { id: "verification", title: "راستی‌آزمایی", subtitle: "تایید هویت" },
    { id: "consent", title: "تایید نهایی", subtitle: "قوانین و شرایط" },
  ];

  const iranProvinces = [
    "تهران",
    "البرز",
    "گیلان",
    "مازندران",
    "اردبیل",
    "خراسان شمالی",
    "خراسان رضوی",
    "خراسان جنوبی",
    "سمنان",
    "گلستان",
    "قم",
    "مرکزی",
    "اصفهان",
    "یزد",
    "قزوین",
    "زنجان",
    "همدان",
    "کرمانشاه",
    "لرستان",
    "ایلام",
    "خوزستان",
    "فارس",
    "هرمزگان",
    "سیستان و بلوچستان",
    "کرمان",
    "هرمزگان",
    "چهارمحال و بختیاری",
    "کهگیلویه و بویراحمد",
    "بوشهر",
    "البرز",
    "آذربایجان شرقی",
    "آذربایجان غربی",
    "کردستان",
    "هرمزگان",
  ];

  const cityMap: { [key: string]: string[] } = {
    تهران: ["تهران", "فیروزکوه", "ورامین", "شمیران", "ری", "اسلام‌شهر"],
    البرز: ["کرج", "صفادشت", "نظرآباد", "ساوجبلاغ", "طالقان"],
    گیلان: ["رشت", "انزلی", "لاهیجان", "تالش", "رودبار"],
    مازندران: ["ساری", "بابل", "آمل", "بندرگز", "نور"],
    اردبیل: ["اردبیل", "پارس‌آباد", "مشکین‌شهر", "بیله‌سوار"],
    // ... سایر استان‌ها می‌توانند اضافه شوند
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: FormStep): boolean => {
    const validationErrors: string[] = [];

    switch (step) {
      case "basic":
        if (!formData.name.trim()) validationErrors.push("نام الزامی است");
        if (!formData.descriptionPersian.trim())
          validationErrors.push("معرفی به فارسی الزامی است");
        break;
      case "categories":
        if (formData.categories.length === 0)
          validationErrors.push("لطفا حداقل یک دسته‌بندی انتخاب کنید");
        break;
      case "contact":
        if (
          !formData.telegram &&
          !formData.signal &&
          !formData.whatsapp &&
          !formData.phone &&
          !formData.email
        ) {
          validationErrors.push("لطفا حداقل یک روش تماس وارد کنید");
        }
        break;
      case "verification":
        if (!formData.socialLink.trim())
          validationErrors.push("لینک پروفایل اجتماعی الزامی است");
        break;
      case "consent":
        if (!formData.consentDirectContact)
          validationErrors.push("تایید شرایط ارتباط مستقیم الزامی است");
        if (!formData.consentTerms)
          validationErrors.push("پذیرش قوانین و مقررات الزامی است");
        break;
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      const currentIndex = steps.findIndex((s) => s.id === currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1].id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [currentStep, formData]);

  const handleBack = useCallback(() => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
      setErrors([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    if (!validateStep("consent")) return;

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "logo" && value) {
        formDataToSend.append(key, value as File);
      } else if (key === "categories") {
        (value as string[]).forEach((cat) =>
          formDataToSend.append("categories", cat),
        );
      } else if (typeof value === "boolean") {
        formDataToSend.append(key, String(value));
      } else if (key !== "logoPreview" && value) {
        formDataToSend.append(key, String(value));
      }
    });

    try {
      const response = await fetch("/register/api/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setCurrentStep("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrors([result.error || "خطا در ارسال فرم"]);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setErrors(["خطا در ارسال فرم. لطفا دوباره تلاش کنید."]);
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, formData]);

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Update parent state whenever form state changes
  useEffect(() => {
    onStateChange({
      isSuccess: currentStep === "success",
      currentStep: currentStepIndex,
      totalSteps: steps.length,
      canGoBack: currentStepIndex > 0,
      isSubmitting: isSubmitting,
    });
  }, [
    currentStep,
    currentStepIndex,
    isSubmitting,
    onStateChange,
    steps.length,
  ]);

  // Update navigation handlers
  useEffect(() => {
    onNavigationHandlersChange({
      onNext: currentStepIndex < steps.length - 1 ? handleNext : handleSubmit,
      onBack: handleBack,
    });
  }, [
    currentStepIndex,
    onNavigationHandlersChange,
    steps.length,
    handleNext,
    handleBack,
    handleSubmit,
  ]);

  if (currentStep === "success") {
    return (
      <div
        className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4"
        dir="rtl"
      >
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              ثبت‌نام با موفقیت انجام شد
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              اطلاعات شما با موفقیت دریافت شد. تیم ما اطلاعات شما را بررسی کرده
              و در اسرع وقت با شما تماس خواهند گرفت.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-800 text-right">
                <strong>مراحل بعدی:</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1 text-right">
                <li>• بررسی اطلاعات توسط تیم ما (۱-۲ روز کاری)</li>
                <li>• راستی‌آزمایی هویت</li>
                <li>• فعال‌سازی پروفایل شما</li>
                <li>• اطلاع‌رسانی از طریق ایمیل</li>
              </ul>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 pt-16"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                ثبت‌نام ارائه‌دهنده
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {steps[currentStepIndex]?.subtitle}
              </p>
            </div>
            <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {currentStepIndex + 1} از {steps.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 right-0 h-full bg-linear-to-l from-blue-600 to-blue-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 animate-shake">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="text-red-900 font-semibold mb-1">
                    لطفا موارد زیر را بررسی کنید:
                  </h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {steps[currentStepIndex]?.title}
            </h2>

            {/* Step 1: Provider Type */}
            {currentStep === "type" && (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm mb-6">
                  نوع فعالیت خود را انتخاب کنید
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, providerType: "individual" })
                    }
                    className={`p-6 border-2 rounded-xl transition-all duration-200 ${
                      formData.providerType === "individual"
                        ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          formData.providerType === "individual"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <svg
                          className={`w-8 h-8 ${formData.providerType === "individual" ? "text-blue-600" : "text-gray-600"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">فرد</p>
                        <p className="text-xs text-gray-500 mt-1">
                          ارائه‌دهنده انفرادی
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, providerType: "organization" })
                    }
                    className={`p-6 border-2 rounded-xl transition-all duration-200 ${
                      formData.providerType === "organization"
                        ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          formData.providerType === "organization"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <svg
                          className={`w-8 h-8 ${formData.providerType === "organization" ? "text-blue-600" : "text-gray-600"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">سازمان</p>
                        <p className="text-xs text-gray-500 mt-1">
                          نهاد یا موسسه
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Basic Information */}
            {currentStep === "basic" && (
              <div className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    لوگو / تصویر
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.logoPreview ? (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200">
                        <img
                          src={formData.logoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              logo: null,
                              logoPreview: "",
                            })
                          }
                          className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="border-2 border-gray-300 border-dashed rounded-xl px-4 py-3 text-center hover:border-blue-400 transition-colors">
                        <p className="text-sm text-gray-600">انتخاب تصویر</p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG تا 5MB
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="نام یا نام سازمان"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                  />
                </div>

                {/* Persian Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    معرفی (فارسی) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="توضیح کوتاه درباره خدمات شما..."
                    value={formData.descriptionPersian}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionPersian: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-right">
                    {formData.descriptionPersian.length} / 500 کاراکتر
                  </p>
                </div>

                {/* English Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    معرفی (انگلیسی) - اختیاری
                  </label>
                  <textarea
                    placeholder="Brief description in English..."
                    value={formData.descriptionEnglish}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionEnglish: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left resize-none"
                    dir="ltr"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Categories */}
            {currentStep === "categories" && (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm mb-4">
                  خدماتی که ارائه می‌دهید را انتخاب کنید
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-4 py-3.5 border-2 rounded-xl text-sm transition-all duration-200 text-right flex items-center justify-between ${
                        formData.categories.includes(category)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <span>{category}</span>
                      {formData.categories.includes(category) && (
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                {formData.categories.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-4">
                    <p className="text-sm text-blue-800">
                      {formData.categories.length} دسته‌بندی انتخاب شده
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Location */}
            {currentStep === "location" && (
              <div className="space-y-6">
                {/* Cover All Country Option */}
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.coverAllCountry}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coverAllCountry: e.target.checked,
                          provinces: e.target.checked ? iranProvinces : [],
                          cities: [],
                        })
                      }
                      className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 accent-blue-600"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-900">
                        پوشش کل کشور
                      </p>
                      <p className="text-xs text-blue-700 mt-0.5">
                        اگر خدمات شما در کل کشور موجود است این گزینه را انتخاب
                        کنید
                      </p>
                    </div>
                  </label>
                </div>

                {!formData.coverAllCountry && (
                  <>
                    {/* Provinces Grid Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        استان‌ها <span className="text-red-500">*</span>
                      </label>

                      {/* Selected Provinces Tags */}
                      {formData.provinces.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                          {formData.provinces.map((province) => (
                            <div
                              key={province}
                              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            >
                              <span>{province}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    provinces: formData.provinces.filter(
                                      (p) => p !== province,
                                    ),
                                    cities: formData.cities.filter(
                                      (c) =>
                                        cityMap[province]?.includes(c) ===
                                        false,
                                    ),
                                  })
                                }
                                className="hover:text-blue-200 font-bold text-lg leading-none"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Provinces Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {iranProvinces.map((province) => {
                          const isSelected =
                            formData.provinces.includes(province);
                          return (
                            <button
                              key={province}
                              type="button"
                              onClick={() => {
                                if (!isSelected) {
                                  setFormData({
                                    ...formData,
                                    provinces: [
                                      ...formData.provinces,
                                      province,
                                    ],
                                  });
                                }
                              }}
                              disabled={isSelected}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center ${
                                isSelected
                                  ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-50"
                                  : "bg-gray-100 text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                              }`}
                            >
                              {province}
                            </button>
                          );
                        })}
                      </div>

                      <p className="text-xs text-gray-500 mt-3 text-right">
                        روی استان‌هایی که می‌خواهید کلیک کنید
                      </p>
                    </div>

                    {/* Cities Text Input */}
                    {formData.provinces.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          شهرها <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={formData.cities.join("\n")}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cities: e.target.value
                                .split("\n")
                                .map((city) => city.trim())
                                .filter((city) => city.length > 0),
                            })
                          }
                          placeholder="شهرهایی را که خدمات ارائه می‌دهید وارد کنید&#10;هر شهر را در یک خط بنویسید"
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right resize-none"
                        />
                        <p className="text-xs text-gray-500 mt-2 text-right">
                          مثال: تهران، کرج، شمیران، ری (هر شهر در یک خط)
                        </p>

                        {/* Cities Preview */}
                        {formData.cities.length > 0 && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                            <p className="text-xs text-green-800 font-semibold mb-2">
                              شهرهای وارد شده:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {formData.cities.map((city, index) => (
                                <div
                                  key={index}
                                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                                >
                                  <span>{city}</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        cities: formData.cities.filter(
                                          (_, i) => i !== index,
                                        ),
                                      })
                                    }
                                    className="hover:text-green-900 font-bold"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Coverage Summary */}
                {(formData.coverAllCountry ||
                  formData.provinces.length > 0) && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-600 mt-0.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="flex-1 text-right">
                        <p className="text-sm font-medium text-green-900">
                          {formData.coverAllCountry
                            ? "✓ کل کشور پوشش داده می‌شود"
                            : `✓ ${formData.provinces.length} استان انتخاب شده`}
                        </p>
                        {!formData.coverAllCountry &&
                          formData.cities.length > 0 && (
                            <p className="text-xs text-green-700 mt-1">
                              شامل {formData.cities.length} شهر
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Online Services & Access Type */}
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.onlineServices}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            onlineServices: e.target.checked,
                          })
                        }
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          خدمات آنلاین / از راه دور
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          امکان ارائه خدمات به صورت مجازی
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نحوه دسترسی
                      </label>
                      <select
                        value={formData.accessType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accessType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                      >
                        <option value="asap">با وقت قبلی</option>
                        <option value="scheduled">زمان‌بندی شده</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        سرعت پاسخ
                      </label>
                      <select
                        value={formData.responseSpeed}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            responseSpeed: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                      >
                        <option value="immediate">فوری (کمتر از 1 ساعت)</option>
                        <option value="hour">ظرف چند ساعت</option>
                        <option value="day">ظرف یک روز</option>
                        <option value="scheduled">طبق برنامه</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Contact */}
            {currentStep === "contact" && (
              <div className="space-y-5">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900 mb-1">
                        توصیه امنیتی
                      </p>
                      <p className="text-xs text-green-700">
                        تلگرام امن‌ترین روش ارتباطی است. در صورت امکان از آن
                        استفاده کنید.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Telegram */}
                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                      <span>تلگرام</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        پیشنهادی
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="@username"
                        value={formData.telegram}
                        onChange={(e) =>
                          setFormData({ ...formData, telegram: e.target.value })
                        }
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left"
                        dir="ltr"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                        </svg>
                      </div>
                    </div>

                    {/* Signal */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Signal 🔒
                      </label>
                      <input
                        type="text"
                        placeholder="+98..."
                        value={formData.signal}
                        onChange={(e) =>
                          setFormData({ ...formData, signal: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left"
                        dir="ltr"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp
                      </label>
                      <input
                        type="text"
                        placeholder="+98..."
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left"
                        dir="ltr"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تلفن
                      </label>
                      <input
                        type="tel"
                        placeholder="+98..."
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left"
                        dir="ltr"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ایمیل
                      </label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-800 text-right">
                      ⚠️ از اشتراک‌گذاری اطلاعات حساس غیرضروری خودداری کنید.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Verification */}
            {currentStep === "verification" && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        چرا لینک پروفایل اجتماعی؟
                      </p>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        این اطلاعات فقط برای راستی‌آزمایی هویت شما توسط تیم ما
                        استفاده می‌شود و در پروفایل عمومی نمایش داده نخواهد شد.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    لینک پروفایل اجتماعی <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/username یا https://linkedin.com/in/username"
                    value={formData.socialLink}
                    onChange={(e) =>
                      setFormData({ ...formData, socialLink: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left"
                    dir="ltr"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-right">
                    مثال: اینستاگرام، لینکدین، توییتر یا هر شبکه اجتماعی معتبر
                    دیگر
                  </p>
                </div>
              </div>
            )}

            {/* Step 7: Consent */}
            {currentStep === "consent" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentDirectContact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            consentDirectContact: e.target.checked,
                          })
                        }
                        className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1 text-sm text-gray-700 leading-relaxed text-right">
                        با ارسال این فرم، می‌پذیرم که ارتباط مستقیم بین من و
                        کاربران انجام می‌شود. متعهد می‌شوم که اطلاعات صحیح ارائه
                        دهم، از کاربران سوءاستفاده نکنم، محرمانگی را رعایت کنم،
                        و می‌دانم این پلتفرم می‌تواند در صورت گزارش یا رفتار
                        مشکوک، حساب من را محدود کند.
                      </div>
                    </label>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentTerms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            consentTerms: e.target.checked,
                          })
                        }
                        className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1 text-sm text-gray-700 text-right">
                        <a href="#" className="text-blue-600 hover:underline">
                          قوانین و مقررات
                        </a>{" "}
                        را مطالعه کرده و می‌پذیرم
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-blue-600 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-900 mb-2">
                        قبل از ثبت نهایی:
                      </p>
                      <ul className="text-sm text-blue-800 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>اطلاعات شما توسط تیم ما بررسی خواهد شد</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>فرآیند تایید ۱ تا ۲ روز کاری طول می‌کشد</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>از طریق ایمیل از نتیجه مطلع خواهید شد</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
