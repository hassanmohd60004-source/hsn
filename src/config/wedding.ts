export interface TimelineEvent {
  time: string;
  title: string;
  icon?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  brideNameEn: string;
  groomNameEn: string;
  invitationText: string;
  countdownDate: string; // ISO format or valid date string (e.g. '2026-10-15T18:00:00')
  hijriDate: string;
  gregorianDate: string; // Textual date (e.g., 'الخميس، ١٥ أكتوبر ٢٠٢٦')
  hallName: string;
  address: string;
  googleMapsLink: string;
  googleMapsEmbedUrl?: string;
  dressCode: string;
  giftNote?: string;
  timeline: TimelineEvent[];
  gallery: GalleryImage[];
  musicUrl: string;
  shareMessage: string;
}

export const weddingConfig: WeddingConfig = {
  brideName: "نورا",
  groomName: "أحمد",
  brideNameEn: "Nora",
  groomNameEn: "Ahmed",
  invitationText: `بسم الله الرحمن الرحيم
  
"وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"

 نتشرف بدعوتكم لحضور حفل زفاف
 أحمد و نورا

 نجل الدكتور محمد حسن والدكتورة سلوى مصطفى
 و
 كريمة الأستاذ فاروق والسيدة سلمى

 ونسعد بمشاركتكم أجمل لحظات العمر.
 حضوركم شرف لنا ويزيد بهجتنا.`,
  countdownDate: "2026-08-12T19:00:00", 
  hijriDate: "٢٩ صفر ١٤٤٨ هـ",
  gregorianDate: "الأربعاء، ١٢ أغسطس ٢٠٢٦ م",
  hallName: "منتجع دايموند بلو (Diamond Blue Resort)",
  address: "شارع سعد زغلول، الزهور، بورسعيد، مصر",
  googleMapsLink: "https://maps.app.goo.gl/YE9rcRiGpAZqELbe9",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Diamond%20Blue%20Resort,%20Saad%20Zaghloul,%20Port%20Said&t=&z=15&ie=UTF8&iwloc=&output=embed",
  dressCode: "الملابس الرسمية الفاخرة والأنيقة للحضور الكريم.",
  giftNote: "حضوركم هو أجمل هدية لنا، ونعتذر بلطف عن قبول الهدايا العينية.",
  timeline: [
    {
      time: "٤:٠٠ م",
      title: "استقبال الضيوف الكرام",
    },
    {
      time: "٥:٠٠ م",
      title: "زفة العروسين ودخول القاعة",
    },
    {
      time: "٧:٠٠ م",
      title: "تناول الغداء",
    },
    {
      time: "١٠:٠٠ م",
      title: "ختام الحفل وتوديع الضيوف",
    },
  ],
  gallery: [
    {
      src: "/images/invitation.jpg",
      alt: "كارت الدعوة الفاخر",
      title: "دعوة الزفاف",
    },
    {
      src: "/images/rings.jpg",
      alt: "خواتم الزفاف الذهبية",
      title: "الميثاق الغليظ",
    },
    {
      src: "/images/decor.jpg",
      alt: "تفاصيل القاعة والديكور الراقية",
      title: "تجهيزات الحفل",
    },
    {
      src: "/images/flowers.jpg",
      alt: "باقة ورد العروس والزينة",
      title: "جمال التفاصيل",
    },
  ],
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  shareMessage: "يسعدنا ويشرفنا دعوتكم لحضور حفل زفاف (أحمد & نورا) في منتجع دايموند بلو. لتفاصيل الدعوة وتأكيد الحضور: ",
};
