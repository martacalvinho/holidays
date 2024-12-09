import type { Stripe } from '@stripe/stripe-js';

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  theme: 'christmas' | 'newyear' | 'winter' | 'generic';
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  discountPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DiscountCode {
  code: string;
  amount: number;
  type: 'percentage' | 'fixed';
  expiryDate: Date;
}

export interface PageSettings {
  logo?: string;
  businessName: string;
  template: Template;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  products: Product[];
  discountCodes: DiscountCode[];
  countdownEnd?: Date;
  stripeAccountId?: string;
}

export interface DeploymentConfig {
  url?: string;
  stripeConnected: boolean;
}