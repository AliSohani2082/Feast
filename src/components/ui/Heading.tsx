interface HeadingProps {
  title: string
  description: string
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl mb-2 font-bold tracking-tight font-sans">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
