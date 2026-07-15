"use client";

import React, { useState } from "react";
import {
  Sliders,
  X,
  RefreshCw,
  Copy,
  Check,
  Type,
  Palette,
  FileText,
  Undo2,
  Redo2,
  ChevronDown,
  Trash2,
  Plus,
  Sparkles,
  MapPin,
  Calendar
} from "lucide-react";

interface LocalCustomizerProps {
  config: any;
  onChangeConfig: (newConfig: any) => void;
  styles: any;
  onChangeStyles: (newStyles: any) => void;
  onReset: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export default function LocalCustomizer({
  config,
  onChangeConfig,
  styles,
  onChangeStyles,
  onReset,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: LocalCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "colors" | "typography" | "words">("content");
  const [copied, setCopied] = useState(false);

  // Word styler states
  const [selectedParaIdx, setSelectedParaIdx] = useState<number>(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);

  // Temporary selected word style state
  const [wordColor, setWordColor] = useState("#C8A46B");
  const [wordFont, setWordFont] = useState("font-messiri");
  const [wordSize, setWordSize] = useState("text-2xl");
  const [wordEffect, setWordEffect] = useState("");

  const paragraphs = config.invitationText.split("\n").filter((p: string) => p.trim() !== "");

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

  // Word Styler Functions
  const selectWord = (paraIdx: number, wordIdx: number) => {
    setSelectedParaIdx(paraIdx);
    setSelectedWordIdx(wordIdx);
    const wordKey = `${paraIdx}-${wordIdx}`;
    const existing = styles.wordStyles?.[wordKey] || {};

    setWordColor(existing.color || "#C8A46B");
    setWordFont(existing.font || "font-messiri");
    setWordSize(existing.size || "text-2xl");
    setWordEffect(existing.effect || "");
  };

  const applyWordStyle = () => {
    if (selectedWordIdx === null) return;
    const wordKey = `${selectedParaIdx}-${selectedWordIdx}`;
    const wordStyles = { ...(styles.wordStyles || {}) };

    wordStyles[wordKey] = {
      color: wordColor,
      font: wordFont,
      size: wordSize,
      effect: wordEffect,
    };

    updateStyleField("wordStyles", wordStyles);
  };

  const removeWordStyle = () => {
    if (selectedWordIdx === null) return;
    const wordKey = `${selectedParaIdx}-${selectedWordIdx}`;
    const wordStyles = { ...(styles.wordStyles || {}) };

    delete wordStyles[wordKey];
    updateStyleField("wordStyles", wordStyles);
    setSelectedWordIdx(null);
  };

  // Timeline Helpers
  const updateTimelineEvent = (index: number, field: string, value: any) => {
    const updatedTimeline = [...config.timeline];
    updatedTimeline[index] = {
      ...updatedTimeline[index],
      [field]: value,
    };
    updateConfigField("timeline", updatedTimeline);
  };

  const addTimelineEvent = () => {
    const updatedTimeline = [
      ...config.timeline,
      { time: "٠٠:٠٠ م", title: "حدث جديد" },
    ];
    updateConfigField("timeline", updatedTimeline);
  };

  const deleteTimelineEvent = (index: number) => {
    const updatedTimeline = config.timeline.filter((_: any, i: number) => i !== index);
    updateConfigField("timeline", updatedTimeline);
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
    <div className="fixed bottom-6 right-6 z-50 w-[94vw] max-w-[460px] bg-white/95 backdrop-blur-2xl border border-[#C8A46B]/30 rounded-3xl shadow-luxury overflow-hidden flex flex-col max-h-[85vh] transition-all duration-500 animate-in fade-in slide-in-from-bottom-5 text-right" dir="rtl">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#F7F5F2] to-white">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-[#C8A46B]" />
          <div>
            <h3 className="text-sm font-bold font-arabic text-gray-800">تعديل التصميم المباشر</h3>
            <p className="text-[10px] text-green-600 font-arabic font-semibold">مفعّل فقط على Localhost</p>
          </div>
        </div>

        {/* Undo / Redo Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="تراجع عن الخطوة السابقة"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              canUndo
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                : "bg-gray-50 text-gray-300 cursor-not-allowed opacity-50"
            }`}
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="إعادة تطبيق الخطوة"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              canRedo
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                : "bg-gray-50 text-gray-300 cursor-not-allowed opacity-50"
            }`}
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-gray-200 mx-1" />
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="grid grid-cols-4 border-b border-gray-100 bg-gray-50/50">
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
        <button
          onClick={() => setActiveTab("words")}
          className={`py-3 text-xs font-bold font-arabic flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === "words"
              ? "border-[#C8A46B] text-[#9E7D46] bg-white"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>الكلمات</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 max-h-[50vh]">
        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="space-y-5">
            {/* Groom & Bride names */}
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-3">
              <span className="text-[10px] font-bold text-[#9E7D46] block uppercase tracking-wider font-arabic">أسماء العروسين</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-arabic text-gray-400">اسم العريس</label>
                  <input
                    type="text"
                    value={config.groomName}
                    onChange={(e) => updateConfigField("groomName", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-arabic text-gray-400">اسم العروسة</label>
                  <input
                    type="text"
                    value={config.brideName}
                    onChange={(e) => updateConfigField("brideName", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
                  />
                </div>
              </div>
            </div>

            {/* Dates & Time */}
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-3">
              <span className="text-[10px] font-bold text-[#9E7D46] block uppercase tracking-wider font-arabic">مواعيد وتواريخ الحفل</span>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-arabic text-gray-400">التاريخ الميلادي</label>
                  <input
                    type="text"
                    value={config.gregorianDate}
                    onChange={(e) => updateConfigField("gregorianDate", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-arabic text-gray-400">التاريخ الهجري</label>
                  <input
                    type="text"
                    value={config.hijriDate}
                    onChange={(e) => updateConfigField("hijriDate", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-arabic text-gray-400">توقيت العداد (العد التنازلي)</label>
                  <input
                    type="text"
                    value={config.countdownDate}
                    onChange={(e) => updateConfigField("countdownDate", e.target.value)}
                    placeholder="YYYY-MM-DDTHH:MM:SS"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono outline-none focus:border-[#C8A46B]"
                  />
                </div>
              </div>
            </div>

            {/* Venue & Location details */}
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-3">
              <span className="text-[10px] font-bold text-[#9E7D46] block uppercase tracking-wider font-arabic">موقع القاعة والخرائط</span>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-arabic text-gray-400">اسم القاعة</label>
                  <input
                    type="text"
                    value={config.hallName}
                    onChange={(e) => updateConfigField("hallName", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-arabic text-gray-400">عنوان القاعة بالتفصيل</label>
                  <input
                    type="text"
                    value={config.address}
                    onChange={(e) => updateConfigField("address", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-arabic text-gray-400">رابط المشاركة لخرائط جوجل (Google Maps Link)</label>
                  <input
                    type="text"
                    value={config.googleMapsLink}
                    onChange={(e) => updateConfigField("googleMapsLink", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono outline-none focus:border-[#C8A46B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-arabic text-gray-400">رابط التضمين للخريطة (Embed URL)</label>
                  <textarea
                    rows={2}
                    value={config.googleMapsEmbedUrl}
                    onChange={(e) => updateConfigField("googleMapsEmbedUrl", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono outline-none focus:border-[#C8A46B] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Timeline customizer */}
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#9E7D46] block uppercase tracking-wider font-arabic">برنامج الحفل (الجدول الزمني)</span>
                <button
                  onClick={addTimelineEvent}
                  className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-[9px] font-bold text-[#C8A46B] flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>إضافة حدث</span>
                </button>
              </div>
              <div className="space-y-2">
                {config.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex gap-2 items-center bg-white p-2 rounded-xl border border-gray-100">
                    <input
                      type="text"
                      value={event.time}
                      onChange={(e) => updateTimelineEvent(index, "time", e.target.value)}
                      placeholder="التوقيت"
                      className="w-16 px-1.5 py-1 border border-gray-200 rounded-lg text-[10px] font-arabic text-center outline-none"
                    />
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) => updateTimelineEvent(index, "title", e.target.value)}
                      placeholder="عنوان الحدث"
                      className="flex-1 px-1.5 py-1 border border-gray-200 rounded-lg text-[10px] font-arabic outline-none"
                    />
                    <button
                      onClick={() => deleteTimelineEvent(index)}
                      className="text-red-400 hover:text-red-600 p-1 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Master invitation Text block */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold font-arabic text-gray-500">نص الدعوة الرئيسي بالكامل</label>
              <textarea
                rows={5}
                value={config.invitationText}
                onChange={(e) => updateConfigField("invitationText", e.target.value)}
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

        {/* Word Styler Tab */}
        {activeTab === "words" && (
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-gray-400 block font-arabic leading-relaxed">
              اختر الفقرة ثم اضغط على كلمة محددة لتعديل خطها، لونها، أو إضافة مؤثرات لمعان وتوهج مخصصة لها بشكل منفرد:
            </span>

            {/* Paragraph selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold font-arabic text-gray-500">اختر السطر المطلوب تعديله</label>
              <select
                value={selectedParaIdx}
                onChange={(e) => {
                  setSelectedParaIdx(parseInt(e.target.value));
                  setSelectedWordIdx(null);
                }}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-arabic outline-none focus:border-[#C8A46B] cursor-pointer"
              >
                {paragraphs.map((p: string, i: number) => (
                  <option key={i} value={i}>
                    سطر {i + 1}: {p.length > 35 ? p.substring(0, 35) + "..." : p}
                  </option>
                ))}
              </select>
            </div>

            {/* Word selector grid */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold font-arabic text-gray-500 block">اضغط على الكلمة المراد تلوينها أو تمييزها</label>
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-2xl max-h-[120px] overflow-y-auto" dir="rtl">
                {paragraphs[selectedParaIdx]?.split(" ").map((word: string, idx: number) => {
                  const isSelected = selectedWordIdx === idx;
                  const wordKey = `${selectedParaIdx}-${idx}`;
                  const hasCustom = styles.wordStyles?.[wordKey];
                  return (
                    <button
                      key={idx}
                      onClick={() => selectWord(selectedParaIdx, idx)}
                      className={`px-3 py-1.5 text-xs font-arabic rounded-xl transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-[#C8A46B] text-white shadow-md scale-105"
                          : hasCustom
                          ? "bg-amber-100/70 border border-[#C8A46B]/40 text-[#9E7D46] font-bold"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Word Styling Controls */}
            {selectedWordIdx !== null && (
              <div className="bg-gray-50/80 p-4 rounded-2xl border border-[#C8A46B]/20 space-y-3.5 animate-in fade-in slide-in-from-top-3 duration-300">
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
                  <span className="text-[10px] font-bold text-gray-800 font-arabic">
                    تنسيق الكلمة: <span className="text-[#9E7D46]">"{paragraphs[selectedParaIdx].split(" ")[selectedWordIdx]}"</span>
                  </span>
                  <button
                    onClick={removeWordStyle}
                    className="text-xs text-red-500 hover:text-red-700 font-bold font-arabic flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>إزالة التنسيق</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-arabic text-gray-500 block">لون الكلمة</label>
                    <div className="flex gap-1.5">
                      <input
                        type="color"
                        value={wordColor}
                        onChange={(e) => setWordColor(e.target.value)}
                        className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer overflow-hidden"
                      />
                      <input
                        type="text"
                        value={wordColor}
                        onChange={(e) => setWordColor(e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-arabic text-gray-500">نوع الخط</label>
                    <select
                      value={wordFont}
                      onChange={(e) => setWordFont(e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-arabic outline-none cursor-pointer"
                    >
                      <option value="font-messiri">المسيري (Messiri)</option>
                      <option value="font-ruqaa">الرقعة (Ruqaa)</option>
                      <option value="font-calligraphy">أميري (Amiri)</option>
                      <option value="font-arabic">كود الرقعة (Cairo)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-arabic text-gray-500">تأثير الإضاءة/اللمعان</label>
                    <select
                      value={wordEffect}
                      onChange={(e) => setWordEffect(e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-arabic outline-none cursor-pointer"
                    >
                      <option value="">بدون تأثير</option>
                      <option value="glow-text-gold">توهج ذهبي مريح</option>
                      <option value="glow-text-white">توهج أبيض ناصع</option>
                      <option value="sparkle-text">بريق ذهبي نابض</option>
                      <option value="gold-text-gradient">تموج ذهبي لامع (Shimmer)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-arabic text-gray-500">حجم الكلمة</label>
                    <select
                      value={wordSize}
                      onChange={(e) => setWordSize(e.target.value)}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-arabic outline-none cursor-pointer"
                    >
                      <option value="text-sm">صغير جداً (sm)</option>
                      <option value="text-base">صغير (base)</option>
                      <option value="text-lg">عادي (lg)</option>
                      <option value="text-xl">كبير (xl)</option>
                      <option value="text-2xl">كبير جداً (2xl)</option>
                      <option value="text-3xl">ضخم (3xl)</option>
                      <option value="text-4xl">عملاق (4xl)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={applyWordStyle}
                  className="w-full py-2 bg-gradient-to-r from-[#9E7D46] to-[#C8A46B] text-white rounded-xl text-xs font-bold font-arabic hover:shadow-md active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>تطبيق التنسيق للكلمة</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
        <button
          onClick={onReset}
          className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold font-arabic flex items-center gap-1.5 transition-colors cursor-pointer"
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
