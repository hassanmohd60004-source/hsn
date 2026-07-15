"use client";

import React, { useState } from "react";
import { Sliders, X, Save, RefreshCw, Copy, Check, Type, Palette, FileText } from "lucide-react";

interface LocalCustomizerProps {
  config: any;
  onChangeConfig: (newConfig: any) => void;
  styles: any;
  onChangeStyles: (newStyles: any) => void;
  onReset: () => void;
}

export default function LocalCustomizer({
  config,
  onChangeConfig,
  styles,
  onChangeStyles,
  onReset,
}: LocalCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "colors" | "typography">("content");
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    const exportedData = {
      config,
      styles,
    };
    navigator.clipboard.writeText(JSON.stringify(exportedData, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const updateConfigField = (field: string, value: any) => {
    onChangeConfig({
      ...config,
      [field]: value,
    });
  };

  const updateStyleField = (field: string, value: any) => {
    onChangeStyles({
      ...styles,
      [field]: value,
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-[#9E7D46] to-[#C8A46B] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer flex items-center justify-center gap-2 group"
      >
        <Sliders className="w-6 h-6 animate-spin-slow group-hover:rotate-45 transition-transform duration-500" />
        <span className="text-xs font-bold font-arabic max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500 whitespace-nowrap">
          لوحة التعديل المحلي
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-[420px] bg-white/95 backdrop-blur-2xl border border-[#C8A46B]/30 rounded-3xl shadow-luxury overflow-hidden flex flex-col max-h-[85vh] transition-all duration-500 animate-in fade-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#F7F5F2] to-white">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-[#C8A46B]" />
          <div>
            <h3 className="text-sm font-bold font-arabic text-gray-800">تعديل التصميم المباشر</h3>
            <p className="text-[10px] text-green-600 font-arabic font-semibold">مفعّل فقط على Localhost</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50/50">
        <button
          onClick={() => setActiveTab("content")}
          className={`py-3 text-xs font-bold font-arabic flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === "content"
              ? "border-[#C8A46B] text-[#9E7D46] bg-white"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>المحتوى</span>
        </button>
        <button
          onClick={() => setActiveTab("colors")}
          className={`py-3 text-xs font-bold font-arabic flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === "colors"
              ? "border-[#C8A46B] text-[#9E7D46] bg-white"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>الألوان</span>
        </button>
        <button
          onClick={() => setActiveTab("typography")}
          className={`py-3 text-xs font-bold font-arabic flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === "typography"
              ? "border-[#C8A46B] text-[#9E7D46] bg-white"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>الخطوط</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 max-h-[45vh]">
        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold font-arabic text-gray-500">اسم العريس</label>
                <input
                  type="text"
                  value={config.groomName}
                  onChange={(e) => updateConfigField("groomName", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold font-arabic text-gray-500">اسم العروسة</label>
                <input
                  type="text"
                  value={config.brideName}
                  onChange={(e) => updateConfigField("brideName", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold font-arabic text-gray-500">التاريخ الميلادي</label>
              <input
                type="text"
                value={config.gregorianDate}
                onChange={(e) => updateConfigField("gregorianDate", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold font-arabic text-gray-500">التاريخ الهجري</label>
              <input
                type="text"
                value={config.hijriDate}
                onChange={(e) => updateConfigField("hijriDate", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold font-arabic text-gray-500">اسم قاعة الحفل</label>
              <input
                type="text"
                value={config.hallName}
                onChange={(e) => updateConfigField("hallName", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold font-arabic text-gray-500">عنوان القاعة بالتفصيل</label>
              <input
                type="text"
                value={config.address}
                onChange={(e) => updateConfigField("address", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
              />
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {activeTab === "colors" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold font-arabic text-gray-500 block">لون خلفية الموقع الرئيسي</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={styles.background}
                  onChange={(e) => updateStyleField("background", e.target.value)}
                  className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer overflow-hidden"
                />
                <input
                  type="text"
                  value={styles.background}
                  onChange={(e) => updateStyleField("background", e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono outline-none focus:border-[#C8A46B]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold font-arabic text-gray-500 block">لون التذهيب الرئيسي (Gold Accent)</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={styles.gold}
                  onChange={(e) => updateStyleField("gold", e.target.value)}
                  className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer overflow-hidden"
                />
                <input
                  type="text"
                  value={styles.gold}
                  onChange={(e) => updateStyleField("gold", e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono outline-none focus:border-[#C8A46B]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold font-arabic text-gray-500 block">لون نصوص الكتابة العادية</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={styles.textColor}
                  onChange={(e) => updateStyleField("textColor", e.target.value)}
                  className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer overflow-hidden"
                />
                <input
                  type="text"
                  value={styles.textColor}
                  onChange={(e) => updateStyleField("textColor", e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono outline-none focus:border-[#C8A46B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === "typography" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold font-arabic text-gray-500">نوع خط أسماء العروسين</label>
              <select
                value={styles.namesFont}
                onChange={(e) => updateStyleField("namesFont", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B] cursor-pointer"
              >
                <option value="font-messiri">خط المسيري (El Messiri)</option>
                <option value="font-ruqaa">خط الرقعة (Aref Ruqaa)</option>
                <option value="font-calligraphy">خط أميري (Amiri)</option>
                <option value="font-arabic">خط الرقعة الرقمي (Cairo)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold font-arabic text-gray-500">حجم خط الأسماء</label>
              <select
                value={styles.namesSize}
                onChange={(e) => updateStyleField("namesSize", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B] cursor-pointer"
              >
                <option value="text-3xl md:text-5xl">صغير (3xl/5xl)</option>
                <option value="text-4xl md:text-6xl">متوسط (4xl/6xl)</option>
                <option value="text-4.5xl md:text-6.5xl">كبير (4.5xl/6.5xl)</option>
                <option value="text-5xl md:text-7.5xl">ضخم (5xl/7.5xl)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold font-arabic text-gray-500">حجم نص الدعوة العادي</label>
              <select
                value={styles.bodySize}
                onChange={(e) => updateStyleField("bodySize", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B] cursor-pointer"
              >
                <option value="text-lg md:text-xl">صغير (lg/xl)</option>
                <option value="text-xl md:text-2xl">متوسط (xl/2xl)</option>
                <option value="text-2xl md:text-3xl">كبير (2xl/3xl)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
        <button
          onClick={onReset}
          className="px-3.5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold font-arabic flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة ضبط</span>
        </button>

        <button
          onClick={handleCopyJson}
          className="px-4 py-2.5 bg-[#C8A46B] hover:bg-[#B08B53] text-white rounded-xl text-xs font-bold font-arabic flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer flex-1 justify-center"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>تم نسخ الإعدادات!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>نسخ ملف التعديلات (JSON)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
