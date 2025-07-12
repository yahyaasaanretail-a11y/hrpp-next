import './globals.css';
import Header from '../components/Navbar'; // ⬅️ adjust path if needed
import Footer from '../components/Footer'; // ⬅️ adjust path if needed


export const metadata = {
  title: 'HRRP Website',
  description: 'Official website of HRRP',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
