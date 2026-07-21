// Generic card wrapper — consistent rounded corners, shadow, and padding.
// Use this as a container for brand cards, location cards, or any boxed content.

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
