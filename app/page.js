const InsightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16M4 12a8 8 0 018-8 8 8 0 018 8v0a8 8 0 01-8 8 8 8 0 01-8-8v0z" />
    <path d="M12 12v-1.5a.5.5 0 01.5-.5h0a.5.5 0 01.5.5v1.5m0 0v1.5a.5.5 0 01-.5.5h0a.5.5 0 01-.5-.5v-1.5" />
  </svg>
);

const ConversationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
    <path d="M8 10h.01M12 10h.01M16 10h.01" />
  </svg>
);

const PrivacyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4" />
  </svg>
);


export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-brand-background">
      {/* Abstract background shapes */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Hero Section - Corrected height */}
      <section className="relative z-10 flex items-center justify-center py-28 sm:py-32 ">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-brand-card/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-brand-text sm:text-5xl md:text-6xl font-serif">
              The Journal That Talks Back.
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Unlock Your Inner Wisdom Through Interactive Journaling.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/sign-up" className="w-full sm:w-auto bg-gradient-to-r from-brand-accent-start to-brand-accent-end text-white px-8 py-3 rounded-full text-base font-medium shadow-lg hover:opacity-90 transition-opacity">
                Start Your Free Trial
              </a>
              <a href="#features" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pb-24 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-brand-accent-start uppercase tracking-wider">
              Features
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-brand-text sm:text-4xl">
              A Smarter Way to Journal
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Go beyond simple note-taking. Kensho helps you discover the patterns in your own life.
            </p>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1: Instant Insights */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-brand-accent-start to-brand-accent-end text-white mx-auto">
                <InsightIcon />
              </div>
              <div className="mt-5">
                <h3 className="text-lg leading-6 font-medium text-brand-text">Instant Insights</h3>
                <p className="mt-2 text-base text-gray-500">
                  After every entry, get an instant analysis of your mood, key themes, and a concise summary.
                </p>
              </div>
            </div>

            {/* Feature 2: Ask Your Journal */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-brand-accent-start to-brand-accent-end text-white mx-auto">
                <ConversationIcon />
              </div>
              <div className="mt-5">
                <h3 className="text-lg leading-6 font-medium text-brand-text">Ask Your Journal</h3>
                <p className="mt-2 text-base text-gray-500">
                  Have a conversation with your past self. Ask questions and get intelligent answers based on your entries.
                </p>
              </div>
            </div>

            {/* Feature 3: Total Privacy */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-brand-accent-start to-brand-accent-end text-white mx-auto">
                <PrivacyIcon />
              </div>
              <div className="mt-5">
                <h3 className="text-lg leading-6 font-medium text-brand-text">Total Privacy</h3>
                <p className="mt-2 text-base text-gray-500">
                  Your thoughts are yours alone. Secured with industry-leading encryption. We will never read your entries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="bg-brand-background border-t border-gray-200">
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
             <p className="text-center text-base text-gray-400">&copy; 2025 Kensho Journal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
