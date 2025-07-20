import DatePickerInit from "./DatePickerInit";
import LocationSearchMultiSelect from './LocationSearchMultiSelect'; // ✅

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
        Classified Jobs
      </h1>
      <p className="text-center text-gray-600 mb-8 italic">
        “Find the jobs you desire”
      </p>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="w-64 border-r pr-6 text-sm space-y-6">
          <div>
            <h2 className="font-semibold mb-2">Filters:</h2>
          </div>
          {/* ✅ Date Range Filter */}
          <div>
            <p className="font-medium mb-2">Date Posted:</p>
            <form method="GET" className="space-y-2 text-sm">
              <input
                type="text"
                id="date-range"
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="Select range"
                readOnly
              />
              <input type="hidden" name="start" id="start-date" />
              <input type="hidden" name="end" id="end-date" />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-xs rounded px-3 py-2 mt-2"
              >
                Apply Filter
              </button>
            </form>
          </div>
          <LocationSearchMultiSelect />


          <div>
            <p className="font-medium">Experience Required:</p>
            <ul className="space-y-1 underline text-blue-600">
              <li>
                <a href="#">Yes</a>
              </li>
              <li>
                <a href="#">No</a>
              </li>
              <li>
                <a href="#">Less than 1 year</a>
              </li>
            </ul>
          </div>

          <div className="border p-3 text-xs text-gray-700 rounded">
            <p>Want your job ad here?</p>
            <p className="mt-2">
              Contact:{" "}
              <a className="underline text-blue-700" href="tel:+923223379647">
                +92 322 3379647
              </a>
            </p>
            <p>
              Follow our <a className="underline">terms and conditions</a>.
            </p>
            <p className="mt-2">Note: Do not send us your resume.</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>

      {/* Include client-side Litepicker initialization */}
      <DatePickerInit />
    </div>
  );
}
