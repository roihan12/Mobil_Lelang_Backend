type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function Heading({ title, subtitle, center }: Props) {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 transition-all duration-300 mb-2 sm:mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 sm:mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
}
