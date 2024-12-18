import { create } from 'zustand';
import type { PageSettings, Product, DiscountCode, Template } from '../types';

interface PageStore {
  settings: PageSettings;
  setLogo: (logo: string) => void;
  setHeaderImage: (headerImage: string) => void;
  setHeaderTitle: (title: string) => void;
  setShowDiscountCodes: (show: boolean) => void;
  setBusinessName: (name: string) => void;
  setShowHolidayEdition: (show: boolean) => void;
  setContactInfo: (email?: string, phone?: string) => void;
  setTemplate: (template: Template) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  addDiscountCode: (code: DiscountCode) => void;
  removeDiscountCode: (code: string) => void;
  setCountdown: (date: Date) => void;
}

export const usePageStore = create<PageStore>((set) => ({
  settings: {
    pageId: Math.random().toString(36).substring(2, 15),
    businessName: '',
    template: {
      id: 'winter-wonderland',
      name: 'Winter Wonderland',
      thumbnail: 'https://images.unsplash.com/photo-1544273677-c433136021d4',
      theme: 'winter'
    },
    colorScheme: {
      primary: '#A5F2F3',
      secondary: '#D4F1F9',
      accent: '#C0C0C0'
    },
    products: [],
    discountCodes: [],
    headerImage: '',
    contactEmail: '',
    contactPhone: '',
    headerTitle: '',
    showDiscountCodes: false,
    showHolidayEdition: false
  },
  setLogo: (logo) => set((state) => ({ settings: { ...state.settings, logo } })),
  setHeaderImage: (headerImage) => set((state) => ({ settings: { ...state.settings, headerImage } })),
  setHeaderTitle: (headerTitle) => set((state) => ({ settings: { ...state.settings, headerTitle } })),
  setShowDiscountCodes: (show) => set((state) => ({ settings: { ...state.settings, showDiscountCodes: show } })),
  setBusinessName: (name) => set((state) => ({ settings: { ...state.settings, businessName: name } })),
  setShowHolidayEdition: (show) => set((state) => ({ settings: { ...state.settings, showHolidayEdition: show } })),
  setContactInfo: (email, phone) => set((state) => ({ 
    settings: { 
      ...state.settings, 
      contactEmail: email || state.settings.contactEmail,
      contactPhone: phone || state.settings.contactPhone
    } 
  })),
  setTemplate: (template) => set((state) => ({ 
    settings: { 
      ...state.settings, 
      template,
      colorScheme: template.theme === 'winter' 
        ? { primary: '#A5F2F3', secondary: '#D4F1F9', accent: '#C0C0C0' }
        : template.theme === 'christmas'
        ? { primary: '#146B3A', secondary: '#EA4630', accent: '#FFD700' }
        : { primary: '#F7E7CE', secondary: '#000000', accent: '#E8E8E8' }
    } 
  })),
  addProduct: (product) => set((state) => ({
    settings: {
      ...state.settings,
      products: [...state.settings.products, product]
    }
  })),
  removeProduct: (productId) => set((state) => ({
    settings: {
      ...state.settings,
      products: state.settings.products.filter(p => p.id !== productId)
    }
  })),
  addDiscountCode: (code) => set((state) => ({
    settings: {
      ...state.settings,
      discountCodes: [...state.settings.discountCodes, code]
    }
  })),
  removeDiscountCode: (code) => set((state) => ({
    settings: {
      ...state.settings,
      discountCodes: state.settings.discountCodes.filter(c => c.code !== code)
    }
  })),
  setCountdown: (date) => set((state) => ({
    settings: { ...state.settings, countdownEnd: date }
  }))
}));