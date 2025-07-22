export default function HomePage() {
  return (
    <div className="relative overflow-hidden">  {/*Main container with relative positioning and overflow is hidden */}
      {/* Abstract background shapes */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> {/* background blured design */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 "> {/* Main content container with max width and padding */}

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] ">
          <div className="w-full max-w-2xl p-8 space-y-8 bg-brand-card/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 ">
            <div className="text-center ">
              <h1 className="text-4xl font-extrabold text-brand-text sm:text-5xl md:text-6xl font-serif">
                The Journal That Talks Back.
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Unlock Your Inner Wisdom Through Interactive Journaling.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/sign-up" className="w-full sm:w-auto bg-gradient-to-r from-brand-accent-start to-brand-accent-end text-white px-8 py-3 rounded-full text-base font-medium shadow-lg hover:opacity-90 transition-opacity"> {/* Button to start free trial need to add the href*/ }
                  Start Your Free Trial 
                </a>
                <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"> {/* Link to learn more about the product */}
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}