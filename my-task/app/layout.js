// app/layout.js
import Link from "next/link"; // استيراد Link لتوجيه المستخدم بين الصفحات

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Next.js App</title>
      </head>
      <body>
        {/* Header with links */}
        <header className="bg-blue-500 p-4 text-white">
          <h1 className="text-xl">My E-commerce App</h1>
          <nav>
            <Link href="/" className="mr-4">
              Home
            </Link>
            <Link href="/users" className="mr-4">
              Users
            </Link>
          </nav>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2025 My E-commerce App</p>
        </footer>
      </body>
    </html>
  );
}
