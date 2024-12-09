export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface DiscountCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  theme: 'winter' | 'christmas' | 'newyear';
}

export interface PageSettings {
  pageId: string;
  businessName: string;
  template: Template;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  products: Product[];
  discountCodes: DiscountCode[];
  headerImage: string;
  logo?: string;
  contactEmail?: string;
  contactPhone?: string;
  headerTitle: string;
  showDiscountCodes: boolean;
  showHolidayEdition: boolean;
  stripeAccountId?: string;
}
