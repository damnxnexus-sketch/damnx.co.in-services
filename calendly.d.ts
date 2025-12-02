interface Window {
  Calendly?: {
    initBadgeWidget: (options: {
      url: string;
      text: string;
      color: string;
      textColor: string;
      branding: boolean;
    }) => void;
    // Add other Calendly methods if you use them
    showPopupWidget?: (url: string) => void;
    closePopupWidget?: () => void;
  };
}