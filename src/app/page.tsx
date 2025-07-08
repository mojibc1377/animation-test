'use client';

import Scene3D from './components/Scene3D';
import SnapNavigation from './components/SnapNavigation';
import { useSnapScroll } from './hooks/useSnapScroll';

export default function Home() {
  const { currentSnap, scrollProgress, isScrolling, scrollToSnap, snapCount } = useSnapScroll(4);

  const snapContent = [
    {
      title: 'Rotating Torus',
      subtitle: 'Classic 3D Geometry',
      description: 'Experience the mesmerizing rotation of a perfect torus in 3D space. Watch as it spins smoothly on multiple axes, creating hypnotic patterns with advanced lighting and materials.',
      color: 'text-green-400'
    },
    {
      title: 'Pulsating Sphere',
      subtitle: 'Dynamic Scaling',
      description: 'Witness a sphere that breathes with life, pulsating and floating through space. The dynamic scaling creates an organic feel while maintaining perfect spherical geometry.',
      color: 'text-red-400'
    },
    {
      title: 'Dancing Cube',
      subtitle: 'Multi-Axis Motion',
      description: 'Watch a cube perform an intricate dance, rotating on all axes while moving through 3D space. Each movement is carefully choreographed for maximum visual impact.',
      color: 'text-blue-400'
    },
    {
      title: 'Spiraling Dodecahedron',
      subtitle: 'Complex Geometry',
      description: 'Marvel at the complex beauty of a dodecahedron as it spirals through space. This 12-faced polyhedron demonstrates advanced geometric animation techniques.',
      color: 'text-purple-400'
    }
  ];

  return (
    <main className="relative overflow-hidden">
      {/* 3D Background Scene */}
      <Scene3D 
        currentSnap={currentSnap} 
        scrollProgress={scrollProgress} 
        isScrolling={isScrolling} 
      />
      
      {/* Navigation */}
      <SnapNavigation 
        currentSnap={currentSnap}
        snapCount={snapCount}
        onSnapChange={scrollToSnap}
      />
      
      {/* Content Sections */}
      <div className="relative z-10">
        {snapContent.map((content, index) => (
          <section 
            key={index}
            className="h-screen flex items-center justify-center px-4"
          >
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="mb-4">
                <span className={`text-sm font-medium uppercase tracking-wider ${content.color} opacity-80`}>
                  {content.subtitle}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                {content.title}
              </h1>
              
              <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl mx-auto mb-8">
                {content.description}
              </p>

              {/* Feature highlights */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {index === 0 && (
                  <>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-green-400/30">
                      <span className="text-green-400 text-sm font-medium">Multi-axis Rotation</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-green-400/30">
                      <span className="text-green-400 text-sm font-medium">Phong Material</span>
                    </div>
                  </>
                )}
                {index === 1 && (
                  <>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-red-400/30">
                      <span className="text-red-400 text-sm font-medium">Dynamic Scaling</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-red-400/30">
                      <span className="text-red-400 text-sm font-medium">Floating Motion</span>
                    </div>
                  </>
                )}
                {index === 2 && (
                  <>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/30">
                      <span className="text-blue-400 text-sm font-medium">Position Dancing</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/30">
                      <span className="text-blue-400 text-sm font-medium">Triple Rotation</span>
                    </div>
                  </>
                )}
                {index === 3 && (
                  <>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-400/30">
                      <span className="text-purple-400 text-sm font-medium">Spiral Motion</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-400/30">
                      <span className="text-purple-400 text-sm font-medium">12-Faced Geometry</span>
                    </div>
                  </>
                )}
              </div>

              {/* Progress indicator for current section */}
              <div className="mt-12">
                <div className="w-24 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      index === 0 ? 'bg-green-400' :
                      index === 1 ? 'bg-red-400' :
                      index === 2 ? 'bg-blue-400' : 'bg-purple-400'
                    }`}
                    style={{ 
                      width: currentSnap === index ? '100%' : '0%',
                      transitionDelay: currentSnap === index ? '200ms' : '0ms'
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
