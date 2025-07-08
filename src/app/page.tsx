'use client';

import Scene3D from './components/Scene3D';
import { useScrollPosition } from './hooks/useScrollPosition';

export default function Home() {
  const scrollY = useScrollPosition();

  return (
    <main className="relative">
      {/* 3D Background Scene */}
      <Scene3D scrollY={scrollY} />
      
      {/* Content Sections */}
      <div className="relative z-10 space-y-32">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse">
              3D Scroll
            </h1>
            <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
              Experience immersive 3D animations that respond to your scroll
            </p>
            <div className="mt-8">
              <div className="inline-block animate-bounce">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Dynamic Backgrounds
            </h2>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              As you scroll, watch the background transform with changing colors, 
              floating particles, and evolving fog effects. The 3D environment 
              responds to your movement creating an immersive experience.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Animated Objects
            </h2>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              The main torus object rotates continuously while scaling and moving 
              based on your scroll position. Background spheres float and dance 
              in 3D space, creating depth and movement.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Camera Movement
            </h2>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              The camera perspective shifts as you scroll, creating a parallax 
              effect that adds depth to the scene. The viewpoint changes to 
              reveal new angles and perspectives of the 3D world.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Interactive Experience
            </h2>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              Every scroll action triggers new animations and transformations. 
              The scene evolves continuously, providing a unique and engaging 
              user experience that showcases the power of WebGL and Three.js.
            </p>
          </div>
        </section>

        {/* Final Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Built with Next.js
            </h2>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8">
              This interactive 3D experience is built using Next.js, Three.js, 
              and TypeScript, demonstrating modern web development techniques 
              for creating immersive digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <span className="text-green-400 font-semibold">Next.js 15</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <span className="text-blue-400 font-semibold">Three.js</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <span className="text-purple-400 font-semibold">TypeScript</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer spacer */}
        <div className="h-32"></div>
      </div>
    </main>
  );
}
