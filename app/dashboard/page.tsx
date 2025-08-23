export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">ড্যাশবোর্ড হোম</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">মোট ব্যবহারকারী</h3>
          <p className="text-3xl font-bold text-blue-600">১,২৩৪</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">মাসিক বিক্রয়</h3>
          <p className="text-3xl font-bold text-green-600">৫৬,৭৮৯</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibent mb-2">নতুন অর্ডার</h3>
          <p className="text-3xl font-bold text-purple-600">৯৮</p>
        </div>
      </div>
    </div>
  );
}
