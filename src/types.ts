// ─── Shared Types for C.HAUS Objekt Website ─────────────────────────────────

/** Navigation link item */
export interface NavLink {
  label: string;
  href: string;
}

/** Product card data */
export interface Product {
  id: number;
  label: string;
  subLabel: string;
  badge?: string;
  bgColor: string;
  textColor: string;
}

/** Value pillar card */
export interface Pillar {
  icon: React.ReactNode;
  title: string;
  text: string;
}

/** Discount gift box */
export interface GiftBox {
  id: number;
  code: string;
}

/** Contact form state */
export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}
