// app/jobs/layout.tsx
export default function JobsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">Classified Jobs</h1>
        <p className="text-center text-gray-600 mb-8 italic">“Find the jobs you desire”</p>
  
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 border-r pr-6 text-sm space-y-6">
            <div>
              <h2 className="font-semibold mb-2">Filters:</h2>
              <p className="font-medium">Location:</p>
              <ul className="space-y-1 underline text-blue-600">
                <li><a href="#">Karachi</a></li>
                <li><a href="#">Lahore</a></li>
                <li><a href="#">Islamabad</a></li>
                <li><a href="#">Rawalpindi</a></li>
                <li><a href="#">Faisalabad</a></li>
                <li><a href="#" className="text-blue-800">More▼</a></li>
              </ul>
            </div>
  
            <div>
              <p className="font-medium">Experience Required:</p>
              <ul className="space-y-1 underline text-blue-600">
                <li><a href="#">Yes</a></li>
                <li><a href="#">No</a></li>
                <li><a href="#">Less than 1 year</a></li>
              </ul>
            </div>
  
            <div className="border p-3 text-xs text-gray-700 rounded">
              <p>Want your job ad here?</p>
              <p className="mt-2">
                Contact: <a className="underline text-blue-700" href="tel:+923223379647">+92 322 3379647</a>
              </p>
              <p>Follow our <a className="underline">terms and conditions</a>.</p>
              <p className="mt-2">Note: Do not send us your resume.</p>
            </div>
          </aside>
  
          {/* Main Content: child = job list */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    );
  }
  