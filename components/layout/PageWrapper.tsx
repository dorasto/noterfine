interface Props {
    children: React.ReactNode;
}
export default function PageWrapper({ children }: Props) {
    return <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>;
}
