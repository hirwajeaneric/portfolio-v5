type DashboardPageHeaderProps = {
    title: string;
    button?: React.ReactNode;
    description?: string;
}

function DashboardPageHeader({ title, button, description }: DashboardPageHeaderProps) {
    return (
        <header className="flex flex-col items-start w-full gap-2">
            <div className="flex items-center w-full justify-between">
                <h1 className="text-2xl font-bold">{title}</h1>
                {button}
            </div>
            <p className="text-zinc-400">{description}</p>
        </header>
    )
}
export default DashboardPageHeader