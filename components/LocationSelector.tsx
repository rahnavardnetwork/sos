import React, { useMemo, useState } from "react";

interface LocationSelectorProps {
  onNext: (locationData: {
    province?: string;
    isOnline: boolean;
    isOutOfIran: boolean;
  }) => void;
  onBack: () => void;
}

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
  "چهارمحال و بختیاری",
  "کهگیلویه و بویراحمد",
  "بوشهر",
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "کردستان",
];

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onNext,
  onBack,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [isOnline, setIsOnline] = useState(false);
  const [isOutOfIran, setIsOutOfIran] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredProvinces = useMemo(() => {
    if (!searchTerm) return iranProvinces;
    return iranProvinces.filter((province) => province.includes(searchTerm));
  }, [searchTerm]);

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setSearchTerm(province);
    setIsDropdownOpen(false);
  };

  const handleOutOfIranToggle = () => {
    const newValue = !isOutOfIran;
    setIsOutOfIran(newValue);
    if (newValue) {
      setSelectedProvince("");
      setSearchTerm("");
    }
  };

  const handleNext = () => {
    // User can proceed if they selected:
    // 1. A province, OR
    // 2. Online services, OR
    // 3. Out of Iran services
    if (selectedProvince || isOnline || isOutOfIran) {
      onNext({
        province: isOutOfIran ? undefined : selectedProvince,
        isOnline,
        isOutOfIran,
      });
    }
  };

  const isNextEnabled = selectedProvince || isOutOfIran || isOnline;

  return (
    <div
      className="min-h-screen bg-linear-to-b from-blue-50 to-blue-100 p-6"
      dir="rtl"
    >
      <div className="max-w-md mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-6 text-blue-600 flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          بازگشت
        </button>

        {/* Province Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-3">
            انتخاب استان
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="جستجو استان..."
              disabled={isOutOfIran}
              className={`w-full px-4 py-3 rounded-xl border-2 text-right
                ${
                  isOutOfIran
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:outline-none"
                }`}
            />

            {isDropdownOpen && !isOutOfIran && filteredProvinces.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                {filteredProvinces.map((province) => (
                  <button
                    key={province}
                    onClick={() => handleProvinceSelect(province)}
                    className="w-full px-4 py-3 text-right hover:bg-blue-50 transition-colors"
                  >
                    {province}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Online Service Checkbox */}
        <div className="mb-4">
          <label className="flex items-center gap-3 bg-white p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-lg">خدمات آنلاین</span>
          </label>
        </div>

        {/* Out of Iran Checkbox */}
        <div className="mb-8">
          <label className="flex items-center gap-3 bg-white p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={isOutOfIran}
              onChange={handleOutOfIranToggle}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-lg">خارج از مرزهای ایران</span>
          </label>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!isNextEnabled}
          className={`w-full py-4 rounded-2xl text-lg font-medium transition-colors
            ${
              isNextEnabled
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};
