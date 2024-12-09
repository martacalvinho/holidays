interface AnalyticsEvent {
  type: 'pageview' | 'product_click' | 'discount_used' | 'purchase';
  pageId: string;
  data: Record<string, any>;
  timestamp: number;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];
  private sessionStartTime: number;

  private constructor() {
    this.sessionStartTime = Date.now();
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public trackPageView(pageId: string) {
    this.trackEvent('pageview', pageId, {});
  }

  public trackProductClick(pageId: string, productId: string, productName: string) {
    this.trackEvent('product_click', pageId, {
      productId,
      productName
    });
  }

  public trackDiscountUsed(pageId: string, discountCode: string) {
    this.trackEvent('discount_used', pageId, {
      discountCode
    });
  }

  public trackPurchase(pageId: string, products: Array<{ id: string; price: number }>, totalAmount: number) {
    this.trackEvent('purchase', pageId, {
      products,
      totalAmount
    });
  }

  private trackEvent(type: AnalyticsEvent['type'], pageId: string, data: Record<string, any>) {
    const event: AnalyticsEvent = {
      type,
      pageId,
      data,
      timestamp: Date.now()
    };

    this.events.push(event);
    this.sendToServer(event);
  }

  private async sendToServer(event: AnalyticsEvent) {
    // TODO: Implement actual server communication
    // For now, we'll just log to console
    console.log('Analytics event:', event);
  }

  public getSessionDuration(): number {
    return Date.now() - this.sessionStartTime;
  }
}

export const analytics = AnalyticsService.getInstance();
