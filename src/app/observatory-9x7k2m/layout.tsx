import type { Metadata } from 'next';

// No index, no follow - keep this page hidden
export const metadata: Metadata = {
    title: 'Observatory',
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // In Next.js App Router, nested layouts should NOT have html/head/body
    // Those are only in the root layout. Just return a wrapper div.
    return (
        <div className="admin-layout" style={{
            minHeight: '100vh',
            background: '#050508',
        }}>
            {children}
        </div>
    );
}
