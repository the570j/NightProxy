import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const features = [
  {
    icon: "shield-alt",
    iconColor: "text-space-accent",
    title: "Advanced Security",
    description:
      "Encrypted connections ensure your data remains private and secure as you explore the internet.",
  },
  {
    icon: "bolt",
    iconColor: "text-space-highlight",
    title: "Lightning Speed",
    description:
      "Our optimized servers provide minimal latency for a seamless browsing experience across the digital universe.",
  },
  {
    icon: "globe",
    iconColor: "text-space-accent",
    title: "Global Access",
    description:
      "Break through regional restrictions and access content from anywhere in the world.",
  },
  {
    icon: "user-secret",
    iconColor: "text-space-highlight",
    title: "Complete Anonymity",
    description:
      "Browse with confidence knowing your identity is protected by our advanced anonymizing technology.",
  },
  {
    icon: "code",
    iconColor: "text-space-accent",
    title: "Customizable Interface",
    description:
      "Adapt the proxy's settings to your specific needs with our intuitive and user-friendly controls.",
  },
  {
    icon: "headset",
    iconColor: "text-space-highlight",
    title: "24/7 Support",
    description:
      "Our support team is always available to assist you with any questions or issues you may encounter.",
  },
];

export const supportOptions = [
  {
    icon: "question-circle",
    iconColor: "text-space-accent",
    title: "FAQ",
    description: "Find answers to commonly asked questions about our service.",
    linkText: "Browse FAQ",
    linkUrl: "#",
  },
  {
    icon: "book",
    iconColor: "text-space-highlight",
    title: "Documentation",
    description: "Explore our comprehensive guides and documentation.",
    linkText: "Read Docs",
    linkUrl: "#",
  },
  {
    icon: "envelope",
    iconColor: "text-space-accent",
    title: "Contact Us",
    description: "Get in touch with our support team for personalized assistance.",
    linkText: "Send Message",
    linkUrl: "#",
  },
];
