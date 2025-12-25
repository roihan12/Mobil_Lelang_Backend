type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function Heading({ title, subtitle, center }: Props) {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <h2 className="text-3xl font-bold tracking-tight transition-colors first:mt-0">
        {title}
      </h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
