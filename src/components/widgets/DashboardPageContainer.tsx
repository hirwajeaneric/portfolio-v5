type DashboardPageContainerProps = {
    children: React.ReactNode;
}

export default function DashboardPageContainer({ children }: DashboardPageContainerProps) {
  return (
    <div className="container w-full flex flex-col items-start justify-start gap-4">
        {children}
    </div>
  )
}